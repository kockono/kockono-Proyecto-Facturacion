import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionPasswordService } from '../../services/recuperacion-password.service';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  number = {
    pinUsuario: ''
  }

  constructor(private recuperacionPassword: RecuperacionPasswordService, private router: Router) { }
  recover(){
   
    this.recuperacionPassword.pin(this.number)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  ngOnInit(): void {
  }

}
