import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../APIService/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-dashbord',
  templateUrl: './provider-dashbord.component.html',
  styleUrls: ['./provider-dashbord.component.css'],
})
export class ProviderDashbordComponent /*{
  constructor(
    private router: Router,
    private ApiService: AuthenticationService
  ) {
    this.getAppointmentsList();
  }
  submited: boolean = false;
  loader: boolean = false;
  showFlag: string = '';
  gotoDashboard() {
    this.showFlag = '';
    this.table = '';
    this.modal = '';

    console.log(this.showFlag);
  }
  logout() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }
  Profile() {
    this.modal = '';
    this.table = 'false';
    this.showFlag = 'show';
    this.getSpeciality();
    this.getProvider();
  }
  email_pat = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  loginform = new FormGroup({
    f_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    l_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    Position: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.email_pat),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
    ]),
    DOB: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    Experience: new FormControl('', [Validators.required]),
    speciality: new FormControl('', [Validators.required]),
  });

  get loginformcontrol() {
    return this.loginform.controls;
  }

  providerData: any;
  onSubmit() {
    this.submited = true;

    if (this.loginform.invalid) {
      return;
    } else {
      this.loader = true;
      this.providerData = {
        first_name: this.loginform.value.f_name,
        last_name: this.loginform.value.l_name,
        experience: this.loginform.value.Experience,
        speciality: this.loginform.value.speciality,
        position: this.loginform.value.Position,
        mobile: this.loginform.value.mobile,
        address: this.loginform.value.address,
      };

      this.ApiService.updateProvider(
        localStorage.getItem('providerId'),
        this.providerData
      ).subscribe((res) => {
        console.log(res);
        this.getProvider();
      });

      this.loader = false;
      Swal.fire('Details Updated');
    }
  }
  Speciality: any;
  getSpeciality() {
    this.ApiService.getSpeciality().subscribe((res) => {
      this.Speciality = res;
    });
  }
  ProviderData: any;
  getProvider() {
    this.ApiService.getProvider(localStorage.getItem('providerId')).subscribe(
      (res) => {
        this.ProviderData = res;
        console.log(res);

        this.loginform.controls['f_name'].setValue(res.first_name);
        this.loginform.controls['l_name'].setValue(res.last_name);
        this.loginform.controls['Position'].setValue(res.position);
        this.loginform.controls['email'].setValue(res.email);
        this.loginform.controls['mobile'].setValue(res.mobile);
        this.loginform.controls['DOB'].setValue(res.dob.substring(0, 10));
        this.loginform.controls['address'].setValue(res.address);
        this.loginform.controls['Experience'].setValue(res.experience);
        this.loginform.controls['speciality'].setValue(res.speciality);
      }
    );
  }
  updateFlag: string = '';
  updateButtonFlag() {
    this.updateFlag = 'update';
  }

  AppointmentsList: any[] = [];
add()
{this.flag='openadd'

}  getAppointmentsList() {
    this.ApiService.getAppointments().subscribe((res) => {
      this.AppointmentsList = res;
      console.log(res);
    });
  }

  SOAP = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productCode: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productBrand: new FormControl('', [Validators.required]),
    productSellingPrice: new FormControl('', [Validators.required]),
    productPurchasePrice: new FormControl('', [Validators.required]),
    productStock: new FormControl('', [Validators.required]),
    productImage: new FormControl(''),
  });
  get SOAPControl() {
    return this.SOAP.controls;
  }
  table = '';
  modal = '';
  SOAPData: any;

  Submit() {
    this.submited = true;
    if (this.SOAP.invalid) {
      return;
    } else {
      this.SOAPData = {
        productName: this.SOAP.value.productName,
        productCode: this.SOAP.value.productCode,

        productCategory: this.SOAP.value.productCategory,
        productBrand: this.SOAP.value.productBrand,
        productSellingPrice: this.SOAP.value.productSellingPrice,
        productPurchasePrice: this.SOAP.value.productPurchasePrice,
        productImage: this.SOAP.value.productImage, 
        productStock: this.SOAP.value.productStock,
      };

      console.log(this.SOAPData);

      this.ApiService.AddSoap(this.SOAPData).subscribe((res) => {
        console.log(res);
        Swal.fire('Product Added', 'Successfully!', 'success');
        this.getAppointmentsList();
        document.getElementById('close')?.click();
      });
    }
  }
  appId = 0;
  view(appointmentId: any) {
    this.appId = appointmentId;
    this.table = 'false';
    this.modal = 'SOAPmodal';
  }
  cancal(ProductId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApiService.cancal(ProductId).subscribe((res) => {});
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        this.getAppointmentsList();
      }
    });
  } ImageToupload: any
  flag:string=''
  selectedFile: any
  uploadImage(event: any) {
    this.ImageToupload = event.target.files[0]
    console.log(this.uploadImage)
  }
  uploadProductImage(code: any) {
    const formdata = new FormData();
    formdata.append('productCode', code);
    formdata.append('productImage', this.ImageToupload);

    this.ApiService.AddProductImage(formdata).subscribe(res => {
      console.log(res)
    })
  }
update(){this.flag='openupdate';

}
upSubmit(){

}
  closeView() {
    this.SOAP.reset();
    this.table = '';
    this.modal = '';
  }

  isEmpty() {
    if (this.AppointmentsList.length == 0) {
      return false;
    }
    return true;
  }
}*/
{
  ImageToupload: any
  product: any;

 fallbackurl:string="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
  constructor(private router: Router, private Api: AuthenticationService) {
    this.getAppointmentsList();
     this.getUsers();
    
  }
  submited: boolean = false
  loader: boolean = false
  showFlag: string = ''
  gotoDashboard() {
    this.showFlag = ''
    this.table = ''
    this.modal = ''

    console.log(this.showFlag)
  }
  logout() {
    this.router.navigateByUrl("Login")
    localStorage.clear()
  }
  Profile() {
    this.modal = ''
    this.table = 'false'
    this.showFlag = 'show'

    this.getProvider();
  }
  
  updatepassform = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    conpassword: new FormControl("", [Validators.required, Validators.maxLength(20)]),
  })


  get loginformcontrol() {
    return this.loginform.controls;
  }
  get f() {
    return this.updatepassform.controls;
  }
  
  UserData:any
  newpassword: any
  updatepass() {
    this.submited = true;
    if (this.updatepassform.invalid) {
      this.validateAllFields(this.updatepassform)
    }
    else {
      this.loader = true;
      Swal.fire({
        title: 'Registering User...',
        html: 'Please wait...',
        allowEscapeKey: true,
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.loader = false;
    
      this.UserData = {
        password: this.updatepassform.value.password,
        conpassword: this.updatepassform.value.conpassword,
        
       
      };
      console.log(this.UserData);
      this.Api.newpass(this.UserData).subscribe((res) => {
        console.log(res);
  
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

  ProviderData: any
  getProvider() {
    this.Api.ProductAd(this.SOAPData).subscribe(res => {
      this.ProviderData = res
      console.log(res)

      this.SOAP.controls['productName'].setValue(res.productName)
      this.SOAP.controls['productCode'].setValue(res.productCode)
      this.SOAP.controls['productCategory'].setValue(res.productCategory)
      this.SOAP.controls['productBrand'].setValue(res.productBrand)
      this.SOAP.controls['productSellingPrice'].setValue(res.productSellingPrice)
      this.SOAP.controls['productPurchasePrice'].setValue(res.productPurchasePrice)
      this.SOAP.controls['productStock'].setValue(res.productStock)
      this.SOAP.controls['productImage'].setValue(res.productImage)
      

    })
  }
  updateFlag: string = ''
  // updateButtonFlag() {
  //   this.updateFlag = 'update'
  // }

  AppointmentsList: any[] = []
Admin:any
  getAppointmentsList() {
    
    this.Api.ProductList().subscribe(res => {
      
      this.product=res
      console.log(res)
      let data=localStorage.getItem("first_Name");
      this.Admin=data
    })
  }
  details:any
  getUsers() {
    
    this.Api.User().subscribe(res => {
      this.details = res
     
      console.log(res)
    })
  }

  SOAP = new FormGroup({
    productName: new FormControl("", [Validators.required]),
    productCode: new FormControl("", [Validators.required]),
    productCategory: new FormControl("", [Validators.required,]),
    productBrand: new FormControl("", [Validators.required]),
    productSellingPrice: new FormControl("", [Validators.required,]),
    productPurchasePrice: new FormControl("", [Validators.required,]),
    productStock: new FormControl("", [Validators.required,]),
    productImage: new FormControl("", [Validators.required])
  })
  upSOAP = new FormGroup({
    ProductName: new FormControl("", [Validators.required]),
    ProductCode: new FormControl("", [Validators.required]),
    ProductCategory: new FormControl("", [Validators.required,]),
    ProductBrand: new FormControl("", [Validators.required]),
    ProductSellingPrice: new FormControl("", [Validators.required,]),
    ProductPurchasePrice: new FormControl("", [Validators.required,]),
    ProductStock: new FormControl("", [Validators.required,]),
    ProductImage: new FormControl("", [Validators.required])
  })




  get SOAPControl() {
    return this.SOAP.controls;
  }
  table = ''
  modal = ''
  SOAPData: any
  Submit() {
    this.submited = true
    if (this.SOAP.invalid) {
      return
    } else {
      this.loader = true
      this.SOAPData = {

        productName: this.SOAP.value.productName,
        productCode: this.SOAP.value.productCode,
        productCategory: this.SOAP.value.productCategory,
        productBrand: this.SOAP.value.productBrand,
        productSellingPrice: this.SOAP.value.productSellingPrice,
        productPurchasePrice: this.SOAP.value.productPurchasePrice,
        productStock: this.SOAP.value.productStock,
        productImage: this.SOAP.value.productImage
      }
      console.log(this.SOAPData)

      this.Api.ProductAd(this.SOAPData).subscribe(res => {
        console.log(res)
       
       
        if (!res.status) {
          this.loader = false
          Swal.fire(res.message)
        }
        else {
          if (res.status == "Success") {
            
           
            this.uploadProductImage(this.SOAP.value.productCode);
            
            Swal.fire('Product', 'Added Successfully.', 'success')
            
          } 
        }
        if (res.status == "Failed") {
          Swal.fire('Product Code', 'Already Exits', 'error')
        }
       
        

      })
      document.getElementById("close")?.click()



    }

    this.loader = false
  }
  
 updata:any
  UpdateProduct(){
     
      this.SOAPData = {
        productName: this.SOAP.value.productName,
        productCode: this.SOAP.value.productCode,
        productCategory: this.SOAP.value.productCategory,
        productBrand: this.SOAP.value.productBrand,
        productSellingPrice: this.SOAP.value.productSellingPrice,
        productPurchasePrice: this.SOAP.value.productPurchasePrice,
        productStock: this.SOAP.value.productStock,   
      }
     
    this.Api.updateproduct(this.SOAPData).subscribe(res => {
      this.updata=res
         this.getAppointmentsList(); localStorage.removeItem("productid");})
          document.getElementById("close")?.click()
  }

  
flag :string=''

  openaddform(){
     this.flag='openadd'
     this.SOAP.controls['productName'].setValue('')
      this.SOAP.controls['productCode'].setValue('')
      this.SOAP.controls['productCategory'].setValue('')
      this.SOAP.controls['productBrand'].setValue('')
      this.SOAP.controls['productSellingPrice'].setValue('')
      this.SOAP.controls['productPurchasePrice'].setValue('')
      this.SOAP.controls['productStock'].setValue('')

  }
  appId = 0
  view(appointmentId: any) {
    this.appId = appointmentId
    this.table = 'false'
    this.modal = 'SOAPmodal'
  }

  selectedFile: any
  uploadImage(event: any) {
    this.selectedFile = event.target.files[0]
   
  }
  uploadProductImage(code: any) {
    const formdata = new FormData();
    formdata.append('productCode', code);
    formdata.append('productImage', this.selectedFile);

    this.Api.AddProductImage(formdata).subscribe(res => {
      console.log(res)
      this.getAppointmentsList();
    })
  }


  Delete(id: any) {

    Swal.fire({
      title: 'Are you sure you want to delete this',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
      denyButtonText: `Don't cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        this.SOAPData
        this.Api.cancal(id).subscribe(res => {
          this.getAppointmentsList();
        })
        Swal.fire(
          'Deleted',
          'Product Deleted Successfully',
          'success'
        )
      }
    })


  }dtaa:any
  update(ProductId: any) {
    this.flag='openupdate'
    this.SOAPData
  this.Api.GetUpdateById(ProductId).subscribe(res => {
      console.log(res)
      this.dtaa=res
      localStorage.setItem('productid',res[0].ProductId)
      this.SOAP.controls['productName'].setValue(res[0].ProductName)
      this.SOAP.controls['productCode'].setValue(res[0].ProductCode)
      this.SOAP.controls['productCategory'].setValue(res[0].ProductCategory)
      this.SOAP.controls['productBrand'].setValue(res[0].ProductBrand)
      this.SOAP.controls['productSellingPrice'].setValue(res[0].ProductSellingPrice)
      this.SOAP.controls['productPurchasePrice'].setValue(res[0].ProductPurchasingPrice        )
      this.SOAP.controls['productStock'].setValue(res[0].ProductStock)

    
    })

    // this.Api.updateproduct(ProductId).subscribe(res => {
    //   this.getAppointmentsList();
     
    // })

   
  }



  closeView() {
    this.SOAP.reset()
    this.table = ''
    this.modal = ''
  }

  isEmpty() {
    if (this.AppointmentsList.length == 0) {
      return false
    }
    return true
  }
  number = '[+][0-9]{12}';
  email_pat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  loginform = new FormGroup({
  First_Name: new FormControl('', [Validators.required]),
  Last_Name: new FormControl('', [Validators.required]),
  Email: new FormControl('', [Validators.required, Validators.pattern(this.email_pat)]),
  DateOfBirth: new FormControl('', [Validators.required]),
  Mobile_Number: new FormControl('', [Validators.required, Validators.pattern(this.number)]),
  Address: new FormControl('', [Validators.required]),
  Zipcode: new FormControl('', [Validators.required]),
  state: new FormControl('', [Validators.required]),
  Country: new FormControl('', [Validators.required]),

  })
  updateButtonFlag:boolean=false
  updateButtondisable(){
    this.updateButtonFlag=true
  }
  upateButtonFlagEnable(){
    this.updateButtonFlag=false
  }



  country: any
  GetCountry() {
    this.Api.country().subscribe(res => {
      this.country = res
      console.log(this.country);
    })
  }
   
  states: any
  Getstate(id: any) {
    this.Api.state(id.value).subscribe(res => {
      this.states = res;
      console.log(this.states);
    })
  }

    UserDatails: any
    UpdateProfile() {
  this.GetCountry()
      this.Api.getUserDetails().subscribe(res => {
        console.log("hdfdhfdsjfhdsujhdufhdzs", res)
        this.details = res
  this.Getstate(res.countries)
  console.log(res.countries)
        // this.UserDatails = res;
        this.loginformcontrol['First_Name'].setValue(res[0].First_Name)
        this.loginformcontrol['Last_Name'].setValue(res[0].Last_Name)
        this.loginformcontrol['DateOfBirth'].setValue(res[0].DateOfBirth.substring(0, 10))
        this.loginformcontrol['Address'].setValue(res[0].Address)
        this.loginformcontrol['Country'].setValue(res[0].country)
        this.loginformcontrol['state'].setValue(res[0].state)
        this.loginformcontrol['Zipcode'].setValue(res[0].zipcode)
        this.loginformcontrol['Mobile_Number'].setValue(res[0].Mobile_Number)
    
      })
    }
  registerData:any
  onSubmitProfileForm() {
    console.log("formsubmit")
    this.submited=true
    if(this.loginform.invalid)
    {return}else{
      console.log("sadasssasadsa")
      this.loader=true

      
      this.registerData={
        first_Name: this.loginform.value.First_Name,
        last_Name: this.loginform.value.Last_Name,
        address: this.loginform.value.Address,
        mobile_Number: this.loginform.value.Mobile_Number,
        zipcode: this.loginform.value.Zipcode,
        dateOfBirth: this.loginform.value.DateOfBirth,
        country: this.loginform.value.Country,
        state: this.loginform.value.state,
      }
      console.log(this.registerData)
      this.Api.UpdateUserProfile(this.registerData).subscribe(res=>{
        console.log(res)
        if(res.message=="success"){
          Swal.fire("Details Updated")
          document.getElementById("closeFormProfileModal")?.click();
        }          
    }) 
    } 
    }

}

