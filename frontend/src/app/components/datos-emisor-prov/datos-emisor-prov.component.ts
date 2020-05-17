
import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-prov.service';
import { DatosEmisorProv } from '../../models/datos-emisor-prov';
@Component({
  selector: 'app-datos-emisor-prov',
  templateUrl: './datos-emisor-prov.component.html',
  styleUrls: ['./datos-emisor-prov.component.css']
})
export class DatosEmisorProvComponent implements OnInit {

  
  constructor(public datosEmpresaService: DatosEmpresaService) { }

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
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisorProv[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
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

  onEdit(emp: DatosEmisorProv) {
    this.datosEmpresaService.selectEmpresa = emp;
  }



}