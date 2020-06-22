import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionPasswordService } from '../../services/recuperacion-password.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-olvido-pass',
  templateUrl: './olvido-pass.component.html',
  styleUrls: ['./olvido-pass.component.css'],
})
export class OlvidoPassComponent implements OnInit {
  createFormGroup() {

    return new FormGroup({
      correo: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      
      
     
      


    });
  }
 
  

  empresaForm : FormGroup;
  constructor(private recuperacionPassword: RecuperacionPasswordService, private router: Router) {
    this.empresaForm = this.createFormGroup();
   }

  recover(){
    if(this.empresaForm.valid){
    this.recuperacionPassword.correo( this.correo.value)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }else{
    window.alert("Verifique que su correo este correcto");
}
}

  ngOnInit() {
  }
  get correo() {return this.empresaForm.get('correo');}

}
