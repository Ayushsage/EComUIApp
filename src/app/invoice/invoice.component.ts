import { Component } from '@angular/core';
import { AuthenticationService } from '../APIService/authentication.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  constructor(private ApiService : AuthenticationService){
    this.getInvoiceData();
  }
  InvoiceData:any
  getInvoiceData(){
  this.ApiService.GetInvoice().subscribe(res=>{
    console.log("Invoice Data",res);
    this.InvoiceData=res
  
  })
  }
  printScreen(){
    window.print()
  }
}
