import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-shop';


  
  isLogin:boolean=false;

  constructor(public auth:AuthService){
    
    auth.currentUser.subscribe(()=>{
      if(auth.currentUser.getValue() !=null)
      {
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
    })
  }
}
