import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpAuthComponent } from './otp-auth/otp-auth.component';
import { PatientDashbordComponent } from './patient-dashbord/patient-dashbord.component';
import { ProviderDashbordComponent } from './provider-dashbord/provider-dashbord.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guard/auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CartComponent } from './cart/cart.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: Routes = [{path:"register",component:RegistrationComponent},
                        {path:"login",component:LoginComponent},
                        {path:"forget-password",component:ForgetPasswordComponent},
                        {path:"cart",component:CartComponent},
                        // {path:"dashbord/patient",component:PatientDashbordComponent,canActivate:[AuthGuard]},
                        // {path:"dashbord/provider",component:ProviderDashbordComponent,canActivate:[AuthGuard]},
                        {path:"products",component:PatientDashbordComponent},
                        {path:"dashboard/admin",component:ProviderDashbordComponent},
                        {path:"Otpverfication",component:OtpAuthComponent},
                        {path:"",component:LoginComponent},
                        {path:"UpdateProfile",component:UpdateProfileComponent},
                        {path:"UpdatePassword",component:UpdatePasswordComponent},
                        {path:"**",component:LoginComponent},
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
