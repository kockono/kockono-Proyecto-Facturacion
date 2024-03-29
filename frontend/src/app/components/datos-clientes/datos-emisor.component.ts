import { Component, OnInit } from '@angular/core';
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
