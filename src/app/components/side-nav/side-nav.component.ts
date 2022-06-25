import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  userName:string | null;
  dataUser:User;
  Email:string | null;


  constructor() { }

  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
    this.userName=this.dataUser?.userName;
    this.Email=this.dataUser?.user;
  }

}
