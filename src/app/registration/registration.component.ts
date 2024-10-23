import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
// import { setOptions, getJson  } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// });

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent { /*{

    myData: any;

 

    ngOnInit(): void {
        this.http.get('https://trial.mobiscroll.com/content/countries.json').subscribe((resp: any) => {
            const countries = [];
            for (let i = 0; i < resp.length; ++i) {
                const country = resp[i];
                countries.push({ text: country.text, value: country.value });
            }
            this.myData = countries;
        });
    }
  constructor(private APIAuth: AuthenticationService, private router: Router,private http: HttpClient) {}

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
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.email_pat),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern("[123456789][0-9]{9}"),
    ]),
    DOB: new FormControl('', [Validators.required]),
   zip_code: new FormControl('', [Validators.required,
    Validators.maxLength(6),
    Validators.pattern("[123456789][0-9]{5}")]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
   
  });

  
  get f() {
    return this.loginform.controls;
  }





  submited: boolean = false;
  userData: any;
  loader: boolean = false;
  onSubmit() {
    this.submited = true;

    if (this.loginform.invalid) {
      this.validateAllFields(this.loginform);
  
      return;
    } else {
            Swal.fire({
        title: 'Registering User...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      
      this.loader = true;
      this.userData = {
        firstName: this.loginform.value.f_name,
        lastName: this.loginform.value.l_name,
        email: this.loginform.value.email,
        phone: this.loginform.value.mobile,
        dob: this.loginform.value.DOB,
        address: this.loginform.value.address,
        state: this.loginform.value.state,
        country: this.loginform.value.state,
        zip_code: this.loginform.value.zip_code,
        user_type: this.loginform.value.role,
      };
      console.log(this.userData);
      this.APIAuth.register( this.userData).subscribe(res => {
      console.log(res);
      
    
    })

      this.APIAuth.register(this.userData).subscribe((res) => {
        console.log(res);
        this.loader = false;
        if (res.message == 'emailfound') {
          Swal.fire({
            icon:'error',
            title:'Email already Exists',
            
        })
        }
        if (res == true) {
          Swal.fire({
           
            icon: 'success',
            title: 'Verification mail sent to<br>'+this.loginform.value.email,
            showConfirmButton: false,
           
          })
          this.router.navigateByUrl('login');
        }
      });
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
}*/


/*

imageName: string = ''


selectedFile: any;
  fileUrl: any;
  constructor(private router: Router,private Api:AuthenticationService) {
    this.GetCountry()
   }
   number = '[+][0-9]{12}';
  email_pat = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  Registration = new FormGroup({
    First_Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Last_Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Email: new FormControl('', [Validators.required, Validators.pattern(this.email_pat)]),
    User_Type: new FormControl('', [Validators.required]),
    DateOfbirth: new FormControl('', [Validators.required]),
    Mobile_Number: new FormControl('', [Validators.required, Validators.pattern(this.number)]),
    Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Zipcode: new FormControl('', [Validators.required,
      Validators.maxLength(6),
      Validators.pattern("[123456789][0-9]{5}")]),
    state: new FormControl('', [Validators.required]),
    Country: new FormControl('', [Validators.required]),
    profile_Path: new FormControl('',[Validators.required] )

  })
  get f() {
    return this.Registration.controls;
  }
  submited: boolean = false;
  loader: boolean = false;
  UserData:any;
  OnSubmit() {
    this.submited=true;
    if (this.Registration.invalid) {
      this.validateAllFields(this.Registration)
    }
    else{
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
      this.UserData={
        first_Name:this.Registration.value.First_Name,
        last_Name:this.Registration.value.Last_Name,
        email:this.Registration.value.Email,
        address:this.Registration.value.Address,
        mobile_Number:this.Registration.value.Mobile_Number,
        zipcode:this.Registration.value.Zipcode,
        dateOfBirth:this.Registration.value.DateOfbirth,
        user_Type:this.Registration.value.User_Type,
        country:this.Registration.value.Country,
        state:this.Registration.value.state,
        profile_Path:this.Registration.value.profile_Path,

      };
      console.log(this.UserData);
      this.Api.register(this.UserData).subscribe((res)=>{
        console.log(res);
        
        if (res.message == 'emailfound') {
          Swal.fire(
            'error',
            'Email Already Exists',
            'error'
          )
        }
        this.loader = false;
        if(res.message == "Sucess"  ){ 
          this.onUpload(res.user_Id)
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login details sent to  Email '+this.Registration.value.Email,
          showConfirmButton: false,
          timer: 1500

         

        }) 
        this.router.navigateByUrl('login');
        
         
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
  country:any
  GetCountry(){
    this.Api.country().subscribe(res=>{
      this.country = res
      console.log(this.country);
    })
  }
  
  states:any
  Getstate(id:any){
    this.Api.state(id.value).subscribe(res=>{
      this.states=res;
      console.log(this.states);
    })
  }
 
  onselectedFile(event: any) {
    this.selectedFile = event.target.files[0];
    
    this.imageName = event.target.files[0].name
  }
    
  
  uploadProfile(event: any) {
    this.imageToUpload = event.target.files[0]
    this.imageName = event.target.files[0].name
  }
  onUpload() {
    const file = new FormData();
    file.append('imageFile', this.selectedFile);
    file.append('imageName',imageName);
    file.append('email',this.Registration.value.Email);
    console.log(file);

    this.Api.Upload(file).subscribe(Res => {
      console.log(Res);
     
    })
  }

}*/


selectedFile: any;
fileUrl: any;
email: any
imageToUpload: any  
imageName: string = ''
constructor(private router: Router, private Api: AuthenticationService) {
  this.GetCountry()
}
get f() {
  return this.Registration.controls;
}

uploadProfile(event: any) {
  this.imageToUpload = event.target.files[0]
  this.imageName = event.target.files[0].name
}
number = '[+][0-9]{12}';
email_pat = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
Registration = new FormGroup({
  First_Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  Last_Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  Email: new FormControl('', [Validators.required, Validators.pattern(this.email_pat)]),
  User_Type: new FormControl('', [Validators.required]),
  DateOfbirth: new FormControl('', [Validators.required]),
  Mobile_Number: new FormControl('', [Validators.required, Validators.pattern(this.number)]),
  Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  Zipcode: new FormControl('', [Validators.required, Validators.maxLength(6)]),
  state: new FormControl('', [Validators.required]),
  Country: new FormControl('', [Validators.required]),
  profile_Path: new FormControl('', [Validators.required])
})
// get Registrationformcontrol() {
//   return this.Registration.controls;
// }
submited: boolean = false;
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
      title: 'Registering User...',
      html: 'Please wait...',
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.loader = false;
    this.email=this.Registration.value.Email
    this.UserData = {
      First_Name: this.Registration.value.First_Name,
      Last_Name: this.Registration.value.Last_Name,
      Email: this.Registration.value.Email,
      Address: this.Registration.value.Address,
      Mobile_Number: this.Registration.value.Mobile_Number,
      Zipcode: this.Registration.value.Zipcode,
      DateOfbirth: this.Registration.value.DateOfbirth,
      User_Type: this.Registration.value.User_Type,
      Country: this.Registration.value.Country,
      State: this.Registration.value.state,
      profile_Path:this.Registration.value.profile_Path
    };
    console.log(this.UserData);
    this.Api.register(this.UserData).subscribe((res) => {
      console.log(res);

      if (res.message == 'emailfound') {
        Swal.fire(
          'Email',
          'Already Exists',
          'question'
        )
      } else

        if (res.message == "Sucess") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'UserName and Password has been Sent to your Email Please Check Your Mail ',
            showConfirmButton: false,
            timer: 1500

          })
          const formData = new FormData();
          formData.append('email', this.email);
          formData.append('imageFile', this.imageToUpload  );
          formData.append('imageName', this.imageName);

          this.Api.Upload(formData).subscribe(Res => {
            console.log(Res);
            console.log("hjkdfj")
          })

          this.router.navigateByUrl('');
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
Signup() {
  this.router.navigate(['']);
}
// onselectedFile(event: any) {
//   this.selectedFile = event.target.files[0];
//   console.log(this.selectedFile);
//   console.log("sucess")
// }
onUpload() {
  const file = new FormData();
  file.append('file', this.selectedFile);
  console.log(file);


}



}
