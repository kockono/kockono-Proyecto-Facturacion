import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionPasswordService } from '../../services/recuperacion-password.service';

@Component({
  selector: 'app-olvido-pass',
  templateUrl: './olvido-pass.component.html',
  styleUrls: ['./olvido-pass.component.css'],
})
export class OlvidoPassComponent implements OnInit {

  recovery = {
    correo: '',
  }

  constructor(private recuperacionPassword: RecuperacionPasswordService, private router: Router) { }

  recover(){
    
    this.recuperacionPassword.correo(this.recovery)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
