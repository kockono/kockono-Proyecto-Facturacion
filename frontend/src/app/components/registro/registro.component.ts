import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  createFormGroup() {

    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required,Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]),
      confirmpassword: new FormControl('', [Validators.required,Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")])
      
      


    });

  }
  
  registroForm: FormGroup;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar,private router: Router) {
    this.registroForm = this.createFormGroup();

  }

  ngOnInit() {

  }

  openSnackBar(message:string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

signUp() {
  
  if(this.registroForm.valid){
    if(this.password.value == this.confirmpassword.value){
          this.authService.signUp(this.registroForm.value)
            .subscribe(res => {
              localStorage.setItem('token', res.token);
              this.router.navigate(['/principal'])
            }, err => {
              console.log(err);
              this.openSnackBar("El correo ya existe, intenta iniciar sesión", 'End');
            })
          }else{
              this.openSnackBar("Las contraseñas no coinciden", 'End');           
            }

          }else{
            console.log('No válido');
            this.openSnackBar("Verifique que la información sea valida", 'End');
          }

}
get email() {return this.registroForm.get('email');}
get password() {return this.registroForm.get('password');}
get confirmpassword() {return this.registroForm.get('confirmpassword');}


}