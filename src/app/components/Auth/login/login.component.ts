import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = ''
  user:any;
  responese:User;

  loginForm = new FormGroup({
    'email': new FormControl(null, [Validators.email, Validators.required]),
    'password' : new FormControl(null,[Validators.required]),
    
    })

  constructor(private auth: AuthService, private router : Router) { }

  ngOnInit(): void {

  }

  submitloginForm(loginForm: FormGroup){

    const Email=loginForm.value.email;
    const password=loginForm.value.password;

    this.auth.login(Email,password).subscribe((data)=>
    {
      // const {name , user}=data
      // this.user = { ...data };
      // console.log(this.user);
      // console.log
      localStorage.setItem('userToken', data.token);
      // localStorage.setItem('userName', JSON.stringify(data.name));
      // localStorage.setItem('user', JSON.stringify(data.email));
      localStorage.setItem('dataUser', JSON.stringify(data));

      // console.log(JSON.stringify(data));
      // console.log(obj);
      
      
      // localStorage.getItem('userName');
      // localStorage.getItem('user');



      // console.log(nameObj);
      // localStorage.getItem('email');
      // localStorage.setItem('name', data.name);
      // localStorage.setItem('phone', data.phone);
      

      // (this.responese  as any)=data;
      // const{name,email}=this.responese as any;
      // localStorage.setItem('userToken', (this.responese as any).token);

      // if (!localStorage.getItem('dataUser')) {
      // localStorage.setItem('dataUser', JSON.stringify({ name, email }));
      // }
      
        this.auth.saveCurrentUser();
        this.router.navigate(['']);
 
    },
    err=>{
      this.error=err;
    })
  }

  goToRegister()
  {
    this.router.navigate(['/register']);
  }

}
