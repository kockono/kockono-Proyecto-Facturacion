/*import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosMiEmpresaService } from '../../services/datos-mi-empresa.service';
import { DatosMiEmpresa } from '../../models/datos-mi-empresa';

@Component({
  selector: 'app-datos-mi-empresa',
  templateUrl: './datos-mi-empresa.component.html',
  styleUrls: ['./datos-mi-empresa.component.css'],
  providers: [DatosMiEmpresaService]
})
export class DatosMiEmpresaComponent implements OnInit {

  constructor(public datosMiEmpresaService: DatosMiEmpresaService) { }
  editar=true;


  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }
  refrescarListaDeEmpresa() { 
    this.datosMiEmpresaService.getDatosList().subscribe((res) => {
        this.datosMiEmpresaService.DatosEmpresa = res as DatosMiEmpresa[];
    });
  }
  onEdit(emp: DatosMiEmpresa) {
    this.datosMiEmpresaService.selectEmpresa = emp;                             
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosMiEmpresaService.selectEmpresa = {
      _id: "", 
      nombreDeLaEmpresa: "",
      ver:true,
      email: "",
      calle: "",
      numero: null,
      colonia: "",
      pais: "",
      estado: "",
      municipio: "",
      codigoPostal: null,
      rfc: ""
    }
  }



onSubmit(form: NgForm){
  if(form.value._id == ""){
    this.datosMiEmpresaService.postDatos(form.value).subscribe((res) => {
      this.refrescarListaDeEmpresa();
      console.log(this.datosMiEmpresaService.selectEmpresa.nombreDeLaEmpresa);
      window.alert("Se Guardo Correctamente");
    });
  }else{
    this.datosMiEmpresaService.putDatos(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refrescarListaDeEmpresa();
      // this.editar= !this.editar;
      window.alert("Se Actualizo Correctamente");
    });
  }
}


}
*/
 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosMiEmpresaService } from '../../services/datos-mi-empresa.service';
import { DatosMiEmpresa } from '../../models/datos-mi-empresa';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-mi-empresa',
  templateUrl: './datos-mi-empresa.component.html',
  styleUrls: ['./datos-mi-empresa.component.css'],
  providers: [DatosMiEmpresaService]
})
export class DatosMiEmpresaComponent implements OnInit {

  createFormGroup() {

    return new FormGroup({
      _id: new FormControl(''),
      nombreDeLaEmpresa: new FormControl('', [Validators.required, ]),   
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      calle: new FormControl('', [Validators.required,]),
      colonia: new FormControl('', [Validators.required,]),
      estado: new FormControl('', [Validators.required,]),
      numero: new FormControl('', [Validators.required]),
      codigoPostal: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required,]),
      municipio: new FormControl('', [Validators.required,]),
      pais: new FormControl('', [Validators.required,]),
     
     
      


    });
  }



  empresaForm : FormGroup;
  constructor(public datosMiEmpresaService: DatosMiEmpresaService) { 
    this.empresaForm = this.createFormGroup();
  }
  editar=true;


  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }
  refrescarListaDeEmpresa() { 
    this.datosMiEmpresaService.getDatosList().subscribe((res) => {
        this.datosMiEmpresaService.DatosEmpresa = res as DatosMiEmpresa[];
    });
  }
  onEdit(emp: DatosMiEmpresa) {
    this.datosMiEmpresaService.selectEmpresa = emp;                             
  }

  resetForm() {
    if(this.empresaForm)
      this.empresaForm.reset();
    this.datosMiEmpresaService.selectEmpresa = {
      _id: "", 
      nombreDeLaEmpresa: "",
      ver:true,
      email: "",
      calle: "",
      numero: null,
      colonia: "",
      pais: "",
      estado: "",
      municipio: "",
      codigoPostal: null,
      rfc: ""
    }
  }



onSubmit(){
  if(this.empresaForm.valid){
    if(this._id.value == ""){
    this.datosMiEmpresaService.postDatos(this.empresaForm.value).subscribe((res) => {
      this.refrescarListaDeEmpresa();
      console.log(this.datosMiEmpresaService.selectEmpresa.nombreDeLaEmpresa);
      window.alert("Se Guardo Correctamente");
    });
  }else{
    this.datosMiEmpresaService.putDatos(this.empresaForm.value).subscribe((res)=>{
      this.resetForm();
      this.refrescarListaDeEmpresa();
      // this.editar= !this.editar;
      window.alert("Se Actualizo Correctamente");
    });
  }
}else{
  window.alert("Verifique que la informacion este correcta");
  
}
}
get _id() {return this.empresaForm.get('_id');}
get nombreDeLaEmpresa() {return this.empresaForm.get('nombreDeLaEmpresa');}
get email() {return this.empresaForm.get('email');}
get calle() {return this.empresaForm.get('calle');}
get colonia() {return this.empresaForm.get('colonia');}
get estado() {return this.empresaForm.get('estado');}
get numero() {return this.empresaForm.get('numero');}
get codigoPostal() {return this.empresaForm.get('codigoPostal');}
get rfc() {return this.empresaForm.get('rfc');}
get municipio() {return this.empresaForm.get('municipio');}
get pais() {return this.empresaForm.get('pais');}


}


