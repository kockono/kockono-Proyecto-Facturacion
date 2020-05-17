import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionPasswordService } from '../../services/recuperacion-password.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  recovery = {
    password: '',
    password2: ''
  }
  constructor(private recuperacionPassword: RecuperacionPasswordService, private router: Router) { }

  recover(){
    
    this.recuperacionPassword.recoverPassword(this.recovery)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }


  ngOnInit(): void {
  }

}
