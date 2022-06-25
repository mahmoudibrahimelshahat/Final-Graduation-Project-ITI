import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { passwordMatch } from '../shared/passwordMatch';
import { User } from 'src/app/models/user.type';
import { AuthService } from 'src/app/services/auth.service';

// import { ConfirmedValidator } from '../must-match/validate-password'


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent{

  error : string = "";
  data:User;

  registerForm = new FormGroup({
    'name':  new FormControl('', [Validators.required,]),

    'email': new FormControl('', [Validators.email, Validators.required]),

    'password' : new FormControl('',[Validators.required,]),

    
    'phone' : new FormControl('',[Validators.required,]),
      // Validators.pattern('[A-Z][a-z0-9]{3,8}$')
    // 'confirmPassword' : new FormControl(null,[Validators.required]),

  })
  // {validators: passwordMatch})


  constructor( private router : Router, private http : HttpClient, private auth:AuthService) { }

  //! Registration Form 

  submitRegistirationForm(registerForm:FormGroup)
  {
    const name=registerForm.value.name;
    const email=registerForm.value.email;
    // const mmm=registerForm.email.value;
    const phone=registerForm.value.phone;
    const password=registerForm.value.password;

    // const form = registerForm.get('name');
    console.log(registerForm.value);
    // console.log(name);
    // console.log('jdhbndbncdbcn');
    // console.log(form);


    

    this.auth.signUp(registerForm.value)
    .subscribe((response)=>{
     
        if (response != null) {
          (this.data as any) = response;

          const {name, email} = this.data as any;
          // localStorage.setItem('userToken', (this.data as any).token);

          localStorage.setItem(
            'dataUser',
            JSON.stringify({ name, email })
          );
       
        }
        this.router.navigate(['/login'])

    },
    
    err=>
    {
      this.error=err;
    })
  }

  // localStorage.setItem('userToken', response.token);
  

 



}


