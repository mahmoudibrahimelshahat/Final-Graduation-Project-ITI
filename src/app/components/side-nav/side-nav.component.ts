import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  userName:string | null;
  dataUser:User;
  Email:string | null;
  isLogin:boolean;


  constructor(private auth:AuthService) { 
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
    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
    this.userName=this.dataUser?.userName;
    this.Email=this.dataUser?.user;
  }


  isLogout(){
    this.auth.logout();
    this.isLogin = false;
    }


}
