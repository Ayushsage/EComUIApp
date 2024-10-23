import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';
import { AuthguardService } from '../APIService/authguard.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(
    private APIAuth: AuthenticationService,
    private router: Router,
    private _userSarvice: AuthguardService
  ) {}
  email_pat = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  resetform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
       Validators.maxLength(30),
       Validators.pattern(this.email_pat),
    ]),
   
  });

  get f() {
    return this.resetform.controls;
  }

  get loginformcontrol() {
    return this.resetform.controls;
  }
  submited: boolean = false;
  loader: boolean = false;
  userData: any;
  onSubmit() {
    this.submited = true;
  
   
    

    if (this.resetform.invalid) {
      this.validateAllFields(this.resetform);
  
      return;
    } else { Swal.fire({
      title: 'Resetting Password...',
      html: 'Please wait...',
      allowEscapeKey: true,
      allowOutsideClick: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
      
      this.userData = {
        email: this.resetform.value.email,
        
      };
      this.APIAuth.reset(this.userData).subscribe((res) => {

      console.log( res);
      if (res.meassag == "emailnotfound") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found',
         
        })
        
      }
      if (res.meassag == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Password sent ',
          text: 'To registered Email',
         
        });  this.router.navigate(['/login']);
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
