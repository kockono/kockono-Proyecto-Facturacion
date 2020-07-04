/*import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';

import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-emisor',
  templateUrl: './datos-emisor.component.html',
  styleUrls: ['./datos-emisor.component.css'],
  providers: [DatosEmpresaService]
})
export class DatosEmisorComponent implements OnInit {

  constructor(private router: Router,public datosEmpresaService: DatosEmpresaService) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      nombreDeLaEmpresa: "",
      metodo:"",
      razon:"",
      estatus:"",
      dias:null,
      email: "",
      calle: "",
      colonia: "",
      estado: "",
      numExterior: "",
      numInterior: "",
      cp: "",
      rfc: "",
      municipio: "",
      pais: "",
      localidad: "",
      telefono: null,
      backup: true
    }
  }

  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisor[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
        this.router.navigateByUrl('/clientes');
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
      });
    }
  }

  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }



}
*/

import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-emisor',
  templateUrl: './datos-emisor.component.html',
  styleUrls: ['./datos-emisor.component.css'],
  providers: [DatosEmpresaService]
})
export class DatosEmisorComponent implements OnInit {

  createFormGroup() {

    return new FormGroup({
      _id: new FormControl(''),
      nombreDeLaEmpresa: new FormControl('', [Validators.required, ]),
      metodo: new FormControl('', [Validators.required]),
      razon: new FormControl('', [Validators.required,]),
      estatus: new FormControl('', [Validators.required,]),
      dias: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      calle: new FormControl('', [Validators.required,]),
      colonia: new FormControl('', [Validators.required,]),
      estado: new FormControl('', [Validators.required,]),
      numExterior: new FormControl('', [Validators.required]),
      numInterior: new FormControl('', []),
      cp: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required,]),
      municipio: new FormControl('', [Validators.required,]),
      pais: new FormControl('', [Validators.required,]),
      localidad: new FormControl('', [Validators.required,]),
      telefono: new FormControl('', [Validators.required]),
      


    });
  }

  empresaForm : FormGroup;
  constructor(private router: Router,public datosEmpresaService: DatosEmpresaService) {
    this.empresaForm = this.createFormGroup();
   }

  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }

  resetForm() {
    if(this.empresaForm)
      this.empresaForm.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      nombreDeLaEmpresa: "",
      metodo:"",
      razon:"",
      estatus:"",
      dias:null,
      email: "",
      calle: "",
      colonia: "",
      estado: "",
      numExterior: "",
      numInterior: "",
      cp: "",
      rfc: "",
      municipio: "",
      pais: "",
      localidad: "",
      telefono: null,
      backup: true
    }
  }

  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisor[];
    });
  }

  onSubmit(){
    if(this.empresaForm.valid){
      if(this._id.value == ""){
      this.datosEmpresaService.postDatos(this.empresaForm.value).subscribe(res => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardó Correctamente");
        this.router.navigateByUrl('/clientes');
        // window.location.reload();
      }
      ,err => {
        console.log(err);
        window.alert("El nombre de la empresa ya existe, elija uno nuevo");
      });
    }else{
      this.datosEmpresaService.putDatos(this.empresaForm.value).subscribe(res=>{
        this.resetForm();
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizó Correctamente");
      }, err => {
        console.log(err);
        window.alert("El nombre de la empresa ya existe, elija uno nuevo");
      });
    }
  }else{
    window.alert("Verifique que la información esté correcta");

  }
  }
  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }

get _id() {return this.empresaForm.get('_id');}
get nombreDeLaEmpresa() {return this.empresaForm.get('nombreDeLaEmpresa');}
get metodo() {return this.empresaForm.get('metodo');}
get razon() {return this.empresaForm.get('razon');}
get estatus() {return this.empresaForm.get('estatus');}
get dias() {return this.empresaForm.get('dias');}
get email() {return this.empresaForm.get('email');}
get calle() {return this.empresaForm.get('calle');}
get colonia() {return this.empresaForm.get('colonia');}
get estado() {return this.empresaForm.get('estado');}
get numExterior() {return this.empresaForm.get('numExterior');}
get numInterior() {return this.empresaForm.get('numInterior');}
get cp() {return this.empresaForm.get('cp');}
get rfc() {return this.empresaForm.get('rfc');}
get municipio() {return this.empresaForm.get('municipio');}
get pais() {return this.empresaForm.get('pais');}
get localidad() {return this.empresaForm.get('localidad');}
get telefono() {return this.empresaForm.get('telefono');}
get backup() {return this.empresaForm.get('backup');}



}