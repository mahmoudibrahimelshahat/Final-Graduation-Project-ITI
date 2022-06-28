import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router : Router) {
    if(localStorage.getItem('userToken') !== null)
    {
      this.saveCurrentUser();
    }
  
  }

  currentUser=new BehaviorSubject(null);


saveCurrentUser()
{
  let token:any= localStorage.getItem('userToken');
  //decoding
  this.currentUser.next(jwtDecode(token));
  console.log(this.currentUser);
}

  signUp(formData:{name:string,email:string, password:string, phone:string}):Observable<any>
  {
    return this.httpClient.post<any>("http://localhost:3000/api/v1/users/register", formData
      // name:name,
      // email:email,
      // password:password,
      // phone:phone
    );
  }

  login(email:string, password:string): Observable<any>
  {
    return this.httpClient.post<any>("http://localhost:3000/api/v1/users/login",{
      email:email,
      password:password
    })
    
  }

  // getToken() {
  //   let token = localStorage.getItem('userToken') || "";
  //   return token 
  // }

  // loggedIn() {

  //   return localStorage.getItem('userToken')    
  // }

  logout(){
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
    // localStorage.removeItem('userData');
    localStorage.removeItem('dataUser');
    this.router.navigate(['/login'])

  }
}