import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosFact } from '../../models/datos-fact';
import { Router } from '@angular/router';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';


@Component({
  selector: 'app-crear-fact',
  templateUrl: './crear-fact.component.html',
  styleUrls: ['./crear-fact.component.css']
})
export class CrearFactComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;                      
  folio: number;
  i: number;
  mid:string;
  constructor(private router: Router, public datosEmpresaService2: DatosEmpresaService2, public datosEmpresaService: DatosEmpresaService) { }

  ngOnInit() {
    this.resetForm();
    this.resetForm2();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDeEmpresa2();
    this.folio = 0;
    this.mid="";
  }
  
  counter(int) {
      this.folio = int;
      console.log(this.folio);
 }
  
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisor[];
    });
  }
  refrescarListaDeEmpresa2() {
    this.datosEmpresaService2.getDatosList().subscribe((res) => {
        this.datosEmpresaService2.DatosEmpresa = res as DatosFact[];
    });
  }
  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: '' ,
      nombreDeLaEmpresa: '',
      metodo: '',
      razon: '',
      estatus: '',
      dias: null,
      email: '',
      calle: '',
      colonia: '',
      estado: '',
      numExterior: '',
      numInterior: '',
      cp: '',
      rfc: '',
      municipio: '',
      pais: '',
      localidad: '',
      telefono: null,
      backup: true
    }
  }
  resetForm2(form?: NgForm) {
    if(form)
      form.reset();
    this.datosEmpresaService2.selectEmpresa = {
      _id: '',
      nombreDeLaEmpresa: '',
      metodo: '',
      razon: '',
      estatus: '',
      dias: null,
      email: '',
      calle: '',
      colonia: '',
      estado: '',
      numExterior: '',
      numInterior: '',
      cp: '',
      rfc: '',
      municipio: '',
      pais: '',
      localidad: '',
      telefono: null,
      backup: true
    }
  }
  pepes(string){
    this.mid==string;
    console.log("oeoeoeoeo");
  }
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      if(this.folio==0){this.folio=1}
      form.value.nombreDeLaEmpresa = this.folio.toString();
      for(let emp of this.datosEmpresaService.DatosEmpresa){
        if(emp.nombreDeLaEmpresa==this.folio.toString()){
          form.value.nombreDeLaEmpresa = emp._id;
        }
      }
      // this.datosEmpresaService2.selectEmpresa.nombreDeLaEmpresa=this.folio.toString();
      this.datosEmpresaService2.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService2.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
        this.router.navigateByUrl('/fact');
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService2.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
      });
    }
  }
  onEdit(emp: DatosFact) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  onEdit2(emp: DatosEmisor) {
    this.datosEmpresaService2.selectEmpresa = emp;
  }
}