import { Component, OnInit } from '@angular/core';
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

}
