import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
import { AuthguardService } from '../APIService/authguard.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

 constructor(
    private APIAuth: AuthenticationService,
    private router: Router,
    private _userSarvice: AuthguardService
  ) {}
  logout(){
    this.router.navigateByUrl("login")
    localStorage.clear()
  }
  loginform = new FormGroup({
    newpass: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
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
      password: this.loginform.value.newpass,
      user_Id: localStorage.getItem("user_id"),
    };

    if (this.loginform.invalid) {
      this.validateAllFields(this.loginform);
  
      return;
    } else {this.APIAuth.newpass(this.userData).subscribe((res) => {

      console.log('res', res);
      if (res.message == 'Password Changed Successfully!') {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Password Changed Successfully!',
        })
        this.loader = false;
        this.router.navigate(["/products"])
      }

    });}

    
  }

 
  
  CheckPass() {
    if (this.loginform.value.newpass == this.loginform.value.password) {
      console.log("new ", this.loginform.value.newpass)
      console.log("new ", this.loginform.value.password)
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
}
