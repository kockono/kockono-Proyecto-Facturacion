/*import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }


  constructor(private authService: AuthService, private router: Router)
    { 


    }

  ngOnInit() {
  }

  onClickMe(){
    
  } 

  signIn(){
    this.authService.signIn(this.user)
    .subscribe( res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      this.router.navigate(['/principal']);
      
    }, err => {
      console.log(err);
      window.alert("Contraseña Incorrecta O Correo No Valido");
    })
  }

}*/


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  
  createFormGroup() {

    return new FormGroup({
      email: new FormControl('', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required,Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")])

    });

  }
  
  loginForm: FormGroup;



  constructor(private authService: AuthService, private router: Router)
    { 
      this.loginForm = this.createFormGroup();


    }

  ngOnInit() {
  }

  onClickMe(){
    
  } 

  signIn(){
    if(this.loginForm.valid){
    this.authService.signIn(this.loginForm.value)
    .subscribe( res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value))
      
      console.log(this.loginForm.get('email'));
      this.router.navigate(['/principal']);
      
    }, err => {
      console.log(err);
    })

  }else{
    window.alert("Contraseña incorrecta o correo no válido");
  }


  }
  get email() {return this.loginForm.get('email');}
  get password() {return this.loginForm.get('password');}

  

}