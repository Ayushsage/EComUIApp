import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../APIService/authentication.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(
   
    private router: Router,private Api:AuthenticationService){this.getUsers()}
    details:any
    getUsers() {
      
      this.Api.User().subscribe(res => {
        this.details = res
       
        console.log(res)
      })
    }

    imageToUpload: any  
imageName: string = ''
    uploadProfile(event: any) {
      this.imageToUpload = event.target.files[0]
      this.imageName = event.target.files[0].name
    }

  logout(){
    this.router.navigateByUrl("login")
    localStorage.clear()
  }
  submited:boolean=false
  SOAP=new FormGroup({
    subjective:new FormControl("",[Validators.required]),
    Objective:new FormControl("",[Validators.required]),
    Assessment:new FormControl("",[Validators.required,]),
    Plan:new FormControl("",[Validators.required]),
  })
  get SOAPControl() {
    return this.SOAP.controls;
  }
}
