import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../APIService/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-dashbord',
  templateUrl: './patient-dashbord.component.html',
  styleUrls: ['./patient-dashbord.component.css'],
})
export class PatientDashbordComponent {
 

  constructor(
    private route: Router,
    private ApiService: AuthenticationService,
    private datepipe: DatePipe
  ) {this.allProducts(),
  this.UpdateProfile()}
  TheaterId: number = 0;
  username: any;
  password: any;
  data: any;
  products: any;
  customer:any
  allProducts() {
    this.ApiService.getallProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
      // this.getUsers()
    });

  }
  
  ngOnInit() {
    let first_Name= localStorage.getItem("first_Name");
      this.customer=first_Name
  }

  
  CartdataToAdd: any
  
  addToCart(ProductId: any, i: any) {
    this.CartdataToAdd =
    {
      productId: ProductId,
      user_Id: localStorage.getItem("user_id")
      
    }
    console.log(this.CartdataToAdd)
    this.ApiService.addCart(this.CartdataToAdd).subscribe(res => {
      console.log(res)
      if (res.message == "outofstock") {
        Swal.fire("Out Of Stock")
        return
      }
      this.GetCartCount();
      Swal.fire("Product Added to Cart")
    })
  }

  CartList: any[] = []
  CartListQantity: any
  count_cart:any
  GetCartCount() {
    this.ApiService.GetCartCount().subscribe(res => {
      console.log("GetCartcount", res)
      console.log("length", this.CartList.length )
      this.CartList = res
      this.CartListQantity = res
      this.count_cart = this.CartList.length

    })

  }
  AppointmentsList: any;
  show = 'show';

  gotoDashboard() {}
  Profile() {}
  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  close() {
    var str2 = 'data-bs-dismiss=""';
    if (this.Registration.valid) {
      var str = 'data-bs-dismiss="modal"';

      return str;
    }
    return str2;
  }

  dashbord() {
    this.route.navigateByUrl('dashboard');
  }
  back() {
    this.route.navigateByUrl('dashboard');
  }
  del(id: any) {
 

    console.log(id);

  }

 
  submited: boolean = false;
  number = '[+][0-9]{12}';
  email_pat = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  
Registration = new FormGroup({
  First_Name: new FormControl('', [Validators.required]),
  Last_Name: new FormControl('', [Validators.required]),
  // Email: new FormControl('', [Validators.required, Validators.pattern(this.email_pat)]),
  DateOfBirth: new FormControl('', [Validators.required]),
  Mobile_Number: new FormControl('', [Validators.required, Validators.pattern(this.number)]),
  Address: new FormControl('', [Validators.required]),
  Zipcode: new FormControl('', [Validators.required]),
  state: new FormControl('', [Validators.required]),
  Country: new FormControl('', [Validators.required]),

})
get f() {
  return this.Registration.controls;
}

  Add() {
    this.allProducts();
   
    this.form_flag = 'add';
    this.submited = false;
    // this.Registration.reset();
  }
  AppointmentsData: any = [];

  form_data: any;
  form_flag: string = '';
  Edit1(id: any) {}

  Edit2() {}
  upFlag: boolean = true;
  updateflag() {
    this.upFlag = false;
  }

  loader: boolean = false;
  UserData: any;
  OnSubmit() {
    this.submited = true;
    if (this.Registration.invalid) {
      this.validateAllFields(this.Registration)
    }
    else {
      this.loader = true;
      Swal.fire({
        title: 'update User...',
        html: 'Please wait...',
        allowEscapeKey: true,
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.loader = false;
      this.UserData = {
        first_Name: this.Registration.value.First_Name,
        last_Name: this.Registration.value.Last_Name,
        address: this.Registration.value.Address,
        mobile_Number: this.Registration.value.Mobile_Number,
        zipcode: this.Registration.value.Zipcode,
        dateOfBirth: this.Registration.value.DateOfBirth,
        country: this.Registration.value.Country,
        state: this.Registration.value.state,
      };
      console.log(this.UserData);
      this.ApiService.UpdateUserProfile(this.UserData).subscribe((res) => {
        console.log(res);
          if (res.message == "sucess") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Details Updated ',
              showConfirmButton: false,
              timer: 500
 
            })
            this.ngOnInit()
          }
      })
    }
  
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }


  country: any
GetCountry() {
  this.ApiService.country().subscribe(res => {
    this.country = res
    console.log(this.country);
  })
}
 
states: any
Getstate(id: any) {
  this.ApiService.state(id.value).subscribe(res => {
    this.states = res;
    console.log(this.states);
  })
}
details:any
  UserDatails: any
  UpdateProfile() {
this.GetCountry()
    this.ApiService.getUserDetails().subscribe(res => {
      console.log("hdfdhfdsjfhdsujhdufhdzs", res)
      this.details = res
this.Getstate(res.countries)
      // this.UserDatails = res;
      this.f['First_Name'].setValue(res[0].First_Name)
      this.f['Last_Name'].setValue(res[0].Last_Name)
      this.f['DateOfBirth'].setValue(res[0].DateOfBirth.substring(0, 10))
      this.f['Address'].setValue(res[0].Address)
      this.f['Country'].setValue(res[0].country)
      this.f['state'].setValue(res[0].state)
      this.f['Zipcode'].setValue(res[0].zipcode)
      this.f['Mobile_Number'].setValue(res[0].Mobile_Number)
  
    })
  }

 }
