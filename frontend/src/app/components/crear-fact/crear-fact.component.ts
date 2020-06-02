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

  year:any;   month:any;  day:any;  hours:any;  minutes:any;  time:any;  seconds:any;

    constructor(private router: Router, public datosEmpresaService2: DatosEmpresaService2, public datosEmpresaService: DatosEmpresaService ) {
    this.day = new Date().getDate();
    this.month = new Date().getMonth()+1;
    this.year = new Date().getFullYear();
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.seconds = new Date().getSeconds();
   }
   filterpost = '';
   selected: string = "";

  ngOnInit() {
    this.resetForm2();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDeEmpresa2();
    this.folio = 0;
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
  /* MODELO DEL CLIENTE */
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
  /* MODELO DE LA FACTURA */
  resetForm2(form?: NgForm) {
    if(form)
      form.reset();
      this.datosEmpresaService2.selectEmpresa = {
      _id: '',
      nombreDeLaEmpresa: '',
      metodo:'',
      estatus:'',
      razon:'',
      fecha:'',
      monto:null,
      folio:null,
      /* Nuevos campos agregados en base a la factura ejemplo */
      ordenDeCompra: '',
      condiciones: '',	
      vendedor: '',
      viaDeEmbarque: '',
      unidades:null,
      articulo: '',	
      nombre: '',
      precio:null,
      descuento:null,
      uMed: '',
      importe:null,	
      subtotal:null,
      total:null,
      iva:null
    }
  }
  /* De momento no quitar funcion nada */
  nada(){
    
  }
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      if(this.folio==0){this.folio=1}
      form.value.folio = this.folio.toString();
      form.value.estatus = "Habilitado";
      form.value.fecha = this.day+"/"+this.month+"/"+this.year+"  "+this.hours+":"+this.minutes;
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
  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  onEdit2(emp: DatosFact) {
    this.datosEmpresaService2.selectEmpresa = emp;
  }

  selectEmpresa(name) {
    console.log(name);
    console.log(this.selected);
}
}