// import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientDashbordComponent } from './patient-dashbord/patient-dashbord.component';
import { ProviderDashbordComponent } from './provider-dashbord/provider-dashbord.component';
import { OtpAuthComponent } from './otp-auth/otp-auth.component';
import { DatePipe } from '@angular/common';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './APIService/authentication.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { InvoiceComponent } from './invoice/invoice.component';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PatientDashbordComponent,
    ProviderDashbordComponent,
    OtpAuthComponent,
    ForgetPasswordComponent,
    CartComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent,
    InvoiceComponent,
   
    
  ],
  imports: [  
    // MbscModule, 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule, 
  ],
  providers: [AuthenticationService,DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true,
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
