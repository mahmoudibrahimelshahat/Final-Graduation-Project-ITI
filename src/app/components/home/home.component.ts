import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user:any;
  userName:any;
  isLogin:boolean=false;
  dataUser:User | null;

  constructor(public auth:AuthService) { 

    // this.userName=localStorage.getItem('username');

    // this.dataUser = JSON.parse(localStorage.getItem('userData') ||'{}');
    
    
    
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
  
  
  
  ngOnInit(): void {
    this.user = localStorage.getItem('dataUser');
    // console.log(this.user);
    // console.log(this.userName);


  }

  getNameUser() {
    return this.dataUser?.name;
  }
  getEmail() {
    return this.dataUser?.email;
  }

  isLogout(){
    this.auth.logout();
    this.isLogin = false;
    }

  // logout() {
  //   localStorage.removeItem('name');
  //   localStorage.removeItem('email');
  //   localStorage.removeItem('phone');
  //   localStorage.removeItem('isAdmin');
  //   localStorage.removeItem('token');
  // }
}
