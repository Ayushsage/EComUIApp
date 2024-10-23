import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EHRM';

  show_flag='logout'
  constructor(private route : Router){}
  ngOnInit(){ 

    // this.route.events.subscribe((val:any)=>
    // {
      
    //   if(val.url)
    //   {
       
        
    //     if(localStorage.getItem("UserId") && val.url.includes('dashbord')){
    //       this.show_flag="login"
    //     }else{this.show_flag="logout"}
       
    //   }
     
    // })
  
  }



  profile(){
    
}

  logout(){
    localStorage.clear();
    
  }
}
