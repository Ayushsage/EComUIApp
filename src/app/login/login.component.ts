import { APP_ID, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
import { AuthguardService } from '../APIService/authguard.service';
import { OtpAuthComponent } from '../otp-auth/otp-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private APIAuth: AuthenticationService,
    private router: Router,
    private _userSarvice: AuthguardService
  ) {}

  loginform = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
    ]),
  });

  get f() {
    return this.loginform.controls;
  }

  get loginformcontrol() {
    return this.loginform.controls;
  }
  submited: boolean = false;
  loader: boolean = false;
  userData: any;
  onSubmit() {
    this.submited = true;
    this.loader = true;
    this.userData = {
      user_Name: this.loginform.value.username,
      password: this.loginform.value.password,
    };
    console.log(this.userData);

    if (this.loginform.invalid) {
      this.validateAllFields(this.loginform);
  
      return;
    } else {this.APIAuth.login(this.userData).subscribe((res) => {

      console.log( res);
      if (res.message == 'Invalid Credentials! Please Enter Valid Details') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found',
         
        })
        
      }else if(res.message == "success"){
    
        localStorage.setItem('user_id',res.user_Id)
        localStorage.setItem('first_Name',res.first_Name)
        localStorage.setItem('Token',res.token)
        localStorage.setItem('user_Type',res.user_Type)
        this.router.navigate(["/Otpverfication"])
      }
     
    });}

    
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
}
