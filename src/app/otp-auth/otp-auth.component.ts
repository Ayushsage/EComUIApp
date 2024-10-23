import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../APIService/authentication.service';


@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.component.html',
  styleUrls: ['./otp-auth.component.css']
})
export class OtpAuthComponent {
  id: any;
  constructor(
   private fb:FormBuilder,
    private _service: AuthenticationService,
    private route: Router,
    private _active: ActivatedRoute
  ) {
    this._active.queryParams.subscribe(queryprams => {
      this.id = queryprams["id"];
      
    })
  }
  get myFormControl() {
    return this.Otpvalidation.controls;
  }
  submitted: any;
  Authdetails: any = {};
  pat = '[0-9]*';
  Otpvalidation = this.fb.group({
    // Subjective: ['',Validators.required],
    digit1: ['', Validators.required],
    digit2: ['', Validators.required],
    digit3: ['', Validators.required],
    digit4: ['', Validators.required],
    digit5: ['', Validators.required],
    digit6: ['', Validators.required],
  });

  digit1: any;
  digit2: any;
  digit3: any;
  digit4: any;
  digit5: any;
  digit6: any;

  onSubmit() {
    //JSON object representation
    if (this.Otpvalidation.valid) {
      (this.digit1 = this.Otpvalidation.value.digit1),
        (this.digit2 = this.Otpvalidation.value.digit2),
        (this.digit3 = this.Otpvalidation.value.digit3),
        (this.digit4 = this.Otpvalidation.value.digit4),
        (this.digit5 = this.Otpvalidation.value.digit5),
        (this.digit6 = this.Otpvalidation.value.digit6),
        (this.Authdetails = {
          user_Id:localStorage.getItem('user_id'),
          otp: this.digit1 + this.digit2 + this.digit3 + this.digit4+this.digit5+this.digit6,
        });
             console.log(this.Authdetails)
        this._service.otpAuth(this.Authdetails).subscribe(x => {
          console.log(x)
          if(x.message==true){
            Swal.fire(
              'Account verified!',
              'SucessFully',
              'success'
            )
            if(localStorage.getItem('user_Type')=="1"){
              this.route.navigate(['/dashboard/admin']);

            }
            else if(localStorage.getItem('user_Type')=="2"){
              this.route.navigate(['/products']);

            }
           
          }else{
            Swal.fire("OTP is Invalid")
          }
          
    
        })
 
      
    } else {
      this.validateAllFields(this.Otpvalidation);
    }
  }

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
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
