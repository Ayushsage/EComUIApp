import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
declare var Square: any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  paymentflag = ''
  constructor(private Apiservice: AuthenticationService, private route: Router) {
    this.GetCartItems();
    Apiservice.paymentflag = 'show'
    this.paymentflag = Apiservice.paymentflag
    this.payment()

  }

  ContineShoping(){
    this.route.navigateByUrl("products")
    
  }

  async payment() {
    // this.loader=true
    const payments = Square.payments('sandbox-sq0idb-n8J-3Mm9Nt2UerKGqgw5XQ', 'EAAAED0GhH7KJEEIzuxLKF2_8RqMLauPYC3snb4m3mcVq19C522vHKASmZb52CEi');
    const card = await payments.card();
    await card.attach('#card-container');

    const cardButton: any = document.getElementById('card-button');
    cardButton.addEventListener('click', async () => {
      this.loader = true
      const statusContainer = document.getElementById('payment-status-container');

      try {
        const result = await card.tokenize();
        if (result.status === 'OK') {

          this.Gettoken(result.token);
          console.log(`Payment token is ${result.token}`);
          // statusContainer.innerHTML = "Payment Successful";



        } else {
          let errorMessage = `Tokenization failed with status: ${result.status}`;
          if (result.errors) {
            errorMessage += ` and errors: ${JSON.stringify(
              result.errors
            )}`;
          }
          this.loader = false

          throw new Error(errorMessage);
        }
      } catch (e) {
        console.error(e);
        // statusContainer.innerHTML = "Payment Failed";
        // document.getElementById("GetToken").value=result.token
        //   document.getElementById("GetToken").click();
      }

    });
    this.loader = false
  }



  AddressFormSubmited: boolean = false
  PaymentFormSubmited: boolean = false
  cartItems: any[] = []
  lengthOfCart: number = 0
  GetCartItems() {
    this.Apiservice.GetCart(localStorage.getItem("user_id")).subscribe(res => {
      console.log(res)
      this.cartItems = res
      this.lengthOfCart = this.cartItems.length
      console.log("hiiii", this.cartItems)
      console.log(this.lengthOfCart)
      this.calculateTolatPrice();
    })
  }
  value = 0
  minus(productId: any, i: any) {
    if (parseInt(this.cartItems[i].Quantity) != 1) {
      this.Apiservice.MinusProductQuantity(productId).subscribe(res => {
        this.GetCartItems();
        document.getElementById("GetCartCount")?.click()

      })
    } else {
      return
    }


  }
  add(productId: any, i: any) {

    if (parseInt(this.cartItems[i].Stock) > parseInt(this.cartItems[i].Quantity)) {
      this.Apiservice.AddProductQuantity(productId).subscribe(res => {
        this.GetCartItems();
      })
    } else {
      Swal.fire("Stock Out Of Limit")
    }
  }

  RemoveCart(ProductId: any) {
    this.Apiservice.RemoveCart(ProductId).subscribe(res => {
      document.getElementById("GetCartCount")?.click();
      this.GetCartItems();
    })

  }
  productPrise: number | undefined
  calculateTolatPrice() {
    this.productPrise = 0
    for (let i = 0; this.cartItems.length > i; i++) {
      this.productPrise = this.productPrise + this.cartItems[i].Quantity * this.cartItems[i].SellingPrice;
    }
  }
  BuyNow() {
    this.PaymentForm.reset();
    this.Apiservice.checkAddress().subscribe(res => {
      console.log(res)
      if (res.message == "addressnotfill") {
        console.log("addressnotfill")
        this.GetCountry();

        document.getElementById("openAddressModal")?.click()
      }
      if (res.message == "addressfill") {

        // console.log("addrsdsadsadessfill")
        document.getElementById("openPayment")?.click();

        return
      }
    })
  }

  AddressForm = new FormGroup({
    Country: new FormControl("", [Validators.required]),
    State: new FormControl("", [Validators.required]),
    AddressLine1: new FormControl("", [Validators.required]),
    ZipCode: new FormControl("", [Validators.required]),
  })
  get AddressFormControl() {
    return this.AddressForm.controls
  }

  PaymentForm = new FormGroup({
    CardNumber: new FormControl("", [Validators.required]),
    ExpiryYear: new FormControl("", [Validators.required]),
    ExpiryMonth: new FormControl("", [Validators.required]),
    CVV: new FormControl("", [Validators.required]),
  })
  get PaymentFormControl() {
    return this.PaymentForm.controls
  }
  cardData: any
  salesData: any
  loader: boolean = false
  PaymentSubmit() {
    console.log("dsfdfdfdsf")
    this.PaymentFormSubmited = true
    if (this.PaymentForm.invalid) { return }
    this.loader = true
    this.cardData = {
      cardNo: this.PaymentForm.value.CardNumber,
      expiry: this.PaymentForm.value.ExpiryMonth + "/" + this.PaymentForm.value.ExpiryYear,
      cvv: this.PaymentForm.value.CVV
    }
    console.log(this.cardData)
    this.Apiservice.MakePayment(this.cardData).subscribe(res => {
      console.log(res)
      if (res.message == "success") {

        this.salesData = {
          usreId: localStorage.getItem("user_id"),
          subTotal: this.productPrise
        }
        this.Apiservice.AddSales(this.salesData).subscribe(res => {
          console.log("addSales done", res)
          document.getElementById("ShowInvoice")?.click();
          document.getElementById("closePayment")?.click();
          document.getElementById("GetCartCount")?.click();
          this.GetCartItems();
          document.getElementById("getProduct")?.click();
          Swal.fire("Payment Done")
          // this.getInvoiceData();
          this.loader = false
        })
      }
      if (res.message == "failed") {
        Swal.fire("Card Is Invalid")
        this.loader = false
      }
    })

  }
  //  InvoiceData:any
  //  getInvoiceData(){
  //   this.Apiservice.GetInvoice().subscribe(res=>{
  //     console.log("Invoice Data",res);
  //     this.InvoiceData=res

  //   })
  // }



  AddressData: any
  AddressSubmit() {
    this.AddressFormSubmited = true
    if (this.AddressForm.invalid) { return }
    this.loader = true
    this.AddressData = {
      addressLine1: this.AddressForm.value.AddressLine1,
      zipcode: this.AddressForm.value.ZipCode,
      country: this.AddressForm.value.Country,
      state: this.AddressForm.value.State
    }
    this.Apiservice.UpdateAdderss(this.AddressData).subscribe(res => {
      if (res.message == "success") {
        Swal.fire("Address Update")
        document.getElementById("closeAddressModal")?.click()
        document.getElementById("openPayment")?.click()
        this.loader = false
      }
    })

  }



  country: any
  GetCountry() {
    this.Apiservice.country().subscribe(res => {
      this.country = res
      console.log(this.country);
    })
  }
  states: any
  Getstate(id: any) {
    this.Apiservice.state(id.value).subscribe(res => {
      this.states = res;
      console.log(this.states);
    })
  }
  paymentData: any

  Gettoken(token: any) {
    this.loader = true
    this.paymentData = {
      sourceId: token,
      amount: this.productPrise
    }
    this.Apiservice.MakePaymentByCard(this.paymentData).subscribe(res => {
      console.log(res)
      if (res.message == 'success') {
        this.salesData = {
          usreId: localStorage.getItem("UserId"),
          subTotal: this.productPrise
        }
        this.Apiservice.AddSales(this.salesData).subscribe(res => {
          console.log("addSales done", res)
          document.getElementById("ShowInvoice")?.click();
          document.getElementById("closePayment")?.click();
          document.getElementById("GetCartCount")?.click();
          this.GetCartItems();
          document.getElementById("getProduct")?.click();
          Swal.fire("Payment Done")
          // this.getInvoiceData();
          this.loader = false
        })
      }
      if (res.message == "failed") {
        Swal.fire("Card Is Invalid")
        this.loader = false
      }
      this.loader = false
    })


  }
  logout(){
    this.route.navigateByUrl("/login")
    localStorage.clear()
  }
}
