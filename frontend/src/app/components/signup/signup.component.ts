import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';

// let regexp: RegExp = /ab+c/;
// let regexpNumber: RegExp = /^[+ 0-9]{5}$/;


declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: '',
    password2: ''
  }

  countPassword: number = 6;

  constructor(private authService: AuthService,
    private router: Router
  ) {
    this.countPassword = this.countPassword;
    // let regexp = new RegExp('ab+c');
    // let regexpNumber = new RegExp('^[+ 0-9]{5}$');
    // console.log(regexpNumber.test('12345'));
    // // expected output: true
    // console.log(regexpNumber.test('1234f'));
    // // expected output: false
    // console.log(regexpNumber.test('123456'));

  }

  ngOnInit() {

  }

  signUp() {
    if (this.user.password === this.user.password2) {
      if (this.user.password.length < 8) {
        if (this.user.password.length >= 6) {
          this.authService.signUp(this.user)
            .subscribe(res => {
              console.log(res);
              localStorage.setItem('token', res.token);
              this.router.navigate(['/playlist'])
            }, err => {
              console.log(err);
              M.toast({ html: 'Correo Existente O No valido', classes: 'rounded' });
            })
        }else{
          if (this.user.password.length == 5) {
            M.toast({ html: `La contraseña es demasiado corta, falta ${this.countPassword - this.user.password.length} caracter`, classes: 'rounded' });
            return
          }
          M.toast({ html: `La contraseña es demasiado corta, faltan ${this.countPassword - this.user.password.length} caracteres`, classes: 'rounded' });
        }
      } else {
        M.toast({ html: `La contraseña no puede superar los 8 caracteres` });
      }
      
    } else {
      M.toast({ html: 'La contraseña no coincide', classes: 'rounded' });
    }
  }

}
