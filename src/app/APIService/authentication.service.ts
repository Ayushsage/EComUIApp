import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

 


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  paymentflag='hide'

  country(): Observable<any> {
    let url = 'https://localhost:7032/api/stateandcountry/GetCountry'
    return this.http.get(url)
  }
  state(id:any): Observable<any> {
    let url = 'https://localhost:7032/api/stateandcountry/GetStateByCountry/{id}?id='+id;
    return this.http.get(url)
  }
  Upload(file:any):Observable<any>{
    let url ='https://localhost:7032/api/Fileupload/uploadProfile'
    return this.http.post(url,file)
  }
  UploadProfile(data: any, email: any): Observable<any> {
    let url = this.register + "UploadFile/" + email
    return this.http.post(url, data)
  }
  UploadProfileByUserId(data:any,id:any):Observable<any>
  {
    let url = this.register+"UploadFileByUserId/"+id
    return this.http.post(url,data)
  }
  reset(userData: any): Observable<any> {
    let url = 'https://localhost:7032/api/User/SendForgetPass'
    return this.http.post(url, userData)
  }


  AddProductImage(formdata:any):Observable<any>{
    return this.http.post("https://localhost:7032/api/Product/UploadProfile",formdata)

  }


  constructor(private http: HttpClient) { }
  auth_url = 'https://localhost:7015/api/Authentication/';


  register(UserData: any): Observable<any> {
    let url = "https://localhost:7032/api/User"

    return this.http.post(url, UserData)
  }

  login(userData: any): Observable<any> {
    let url = "https://localhost:7032/api/User/login"
    return this.http.post(url, userData)
  }
  
  

  otpAuth(Authdetails: any): Observable<any> {
    let url = "https://localhost:7032/api/User/ValidateUser"
    return this.http.post(url, Authdetails)
  }

  //-----getSpeciality ----
  getallProducts(): Observable<any> {
    let url = 'https://localhost:7032/api/Product/GetProducts'
    return this.http.get(url)
  }

  // getProviderBySpeciality(id: any): Observable<any> {
  //   let url = 'https://localhost:7015/api/Providers/' + id;
  //   return this.http.get(url);
  // }
  GetUpdateById(ProductId: any): Observable<any> {
    let url = 'https://localhost:7032/api/Product/GetProducts/ {Id}?id=' + ProductId;
    return this.http.get(url);
  }

  //-----https://localhost:7015/api/Appointments---
  // base_url = 'https://localhost:7015/api/Appointments/'
  // addAppointments(data: any): Observable<any> {

  //   return this.http.post(this.base_url, data)
  // }
  ProductList(): Observable<any> {
    let url = "https://localhost:7032/api/Product/GetProducts"
    return this.http.get(url)
  }
  updateproduct(SOAPData:any): Observable<any>{
    let url = "https://localhost:7032/api/Product?id="+localStorage.getItem('productid')
  return this.http.put(url,SOAPData)

  }
  

  //---https://localhost:7015/api/Providers/getByProviderId/--
  // getProviderName(id: any): Observable<any> {
  //   let url = 'https://localhost:7015/api/Providers/getByProviderId/' + id
  //   return this.http.get(url)

  // }
  User(): Observable<any> {
    let url = 'https://localhost:7032/api/User/GetUserDetails/' + localStorage.getItem('user_id')
    return this.http.get(url)

  }
  newpass(data:any): Observable<any> {
    let url = 'https://localhost:7032/api/User/changepass' 
    return this.http.put(url,data)

  }
  //---https://localhost:7015/api/Providers/update/
  // base_url_provider='https://localhost:7015/api/Providers/'
  // getProvider(id: any): Observable<any> {
  //   let url = this.base_url_provider+"getProvider/" + id
  //   return this.http.get(url)
  // }

  // updateProvider(id:any,data:any):Observable<any>
  // {
  //   let url = this.base_url_provider+"update/"+id
  //   return this.http.put(url,data)

  // }

  //------SOAP---

  ProductAd(SOAPData:any):Observable<any>{
  
  return this.http.post('https://localhost:7032/api/Product/AddProduct',SOAPData)
  }

  //--https://localhost:7015/api/SOAPs/cancelAppointment/---
  cancal(ProductId:any):Observable<any>{
    let url ='https://localhost:7032/api/Product/DeleteProducts/'+ProductId
    return this.http.delete(url)
  }

  // getSOAP(id:any):Observable<any>{
  //   let  url='https://localhost:7015/api/SOAPs/SOAPByAppointmentId/'+id
  //   return this.http.get(url)
  // }

  CartUrl = 'https://localhost:7032/api/Cart/'
  addCart(data: any): Observable<any> {
    let url = this.CartUrl+"AddToCart"
    return this.http.post(url, data)
  }
  GetCartCount(): Observable<any> {
    let UserId = localStorage.getItem("user_id")
    let url = this.CartUrl + "GetCount/" + UserId
    return this.http.get(url)
  }
  GetCart(id: any): Observable<any> {
    let url = this.CartUrl + "GetCountDetails/" + id
    return this.http.get(url)
  }

  AddProductQuantity(id: any): Observable<any> {
    let url = this.CartUrl + "IncreaseProductQuantity/" + id
    return this.http.get(url)
  }
  MinusProductQuantity(id: any): Observable<any> {
    let url = this.CartUrl + "DecreaseProductQuantity/" + id
    return this.http.get(url)
  }
  RemoveCart(id: any): Observable<any> {
    let url = this.CartUrl + "RemoveCartProducts/" + id
    return this.http.get(url)
  }

  cardUrl="https://localhost:7269/api/Card/"

  checkAddress():Observable<any>{
    let url = this.cardUrl+"CheckAdd/"+localStorage.getItem("user_id")
    return this.http.get(url)
  }
  MakePayment(data:any):Observable<any>{
    let url = this.cardUrl+"CheckCard"
    return this.http.post(url,data)
  }

  MakePaymentByCard(data:any):Observable<any>{
    let url = this.cardUrl+"makePayment"
    return this.http.post(url,data)
  }

 salesUrl="https://localhost:7032/api/Sales/"
 AddSales(data:any):Observable<any>{
  let url = this.salesUrl + "PurchaseProduct" 
  return this.http.post(url,data)
 } 

 GetInvoice():Observable<any>{
  let url ="https://localhost:7032/api/Sales/User/"+localStorage.getItem("user_id")
  return this.http.get(url)
 }


userUrl='https://localhost:7032/api/User/'
getUserDetails():Observable<any>{
  let url = this.userUrl+'GetUserDetails/'+localStorage.getItem("user_id");
  return this.http.get(url)
}
UpdateUserProfile(data:any):Observable<any>
{
  let url = "https://localhost:7032/api/User/"+localStorage.getItem("user_id");
  return this.http.put(url,data)
}
UpdateAdderss(data:any):Observable<any>
{
  let url = this.register+"UpdateAddress/"+localStorage.getItem("user_id")
  return this.http.post(url,data)
}



}
