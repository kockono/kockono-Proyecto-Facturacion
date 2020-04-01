import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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

  }

  ngOnInit() {

  }

  signUp() {
    if (this.user.password === this.user.password2) {
          this.authService.signUp(this.user)
            .subscribe(res => {
              localStorage.setItem('token', res.token);
              this.router.navigate(['/formulario'])
            }, err => {
            })
        
  }else{
    
  }

}
}