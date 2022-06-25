import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:string | null;
  Email:string | null;
  dataUser:User;
  displayBasic: boolean;

  constructor() {
  }
  
  
  
  
  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
    // console.log( this.dataUser);
    // console.log( this.dataUser.user);
    // this.userName=localStorage.getItem('userName');
    // this.Email=localStorage.getItem('user');
    // console.log(this.userName,this.Email);
    this.userName=this.dataUser?.userName;
    this.Email=this.dataUser?.user;
    
  }

  getNameUser() {
    return this.dataUser?.userName;
  }
  getEmail() {

    return this.dataUser?.user;
  }


}


