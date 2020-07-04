import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosFact } from '../../models/datos-fact';
import { Router } from '@angular/router';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'
import { format } from 'url';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-crear-fact',
  templateUrl: './crear-fact.component.html',
  styleUrls: ['./crear-fact.component.css']
})
export class CrearFactComponent implements OnInit {
  matrix = [['a', 'b', 'c'],['d', 'e', 'f'],['g', 'h', 'i']];
  listaMetodo=["Contado (PUE)","Credito (PPD)"];
  listaForma=["Efectivo","Tarjeta","Vale/Otros","Transferencia electronica", "99 por definir"];
  listaCFDi=[
    "G01 Adquisiscion de mercancia",
    "G02 Devoluciones, Descuentos o Bonificaciones",
    "G03 Gastos en General",
    "I01 Construcciones",
    "I02 Mobiliario y Equipo de Oficina por Inversiones",
    "I03 Equipo de Transporte",
    "I04 Equipo de Cómputo y Accesorios",
    "I05 Dados, Troqueles, Moldes, Matrices y Herramental",
    "I06 Comunicaciones Telefónicas",
    "I07 Comunicaciones Satelitales",
    "I08 Otra Maquinaria y Equipo",
    "D01 Honorarios Médicos, Dentales y Gastos Hospitalarios",
    "D02 Gastos Médicos por Incapacidad o Discapacidad",
    "D03 Gastos Funerales",
    "D04 Donativos",
    "D05 Intereses Reales Efectivamente Pagados por Créditos Hipotecarios (Casa Habitación)",
    "D06 Aportaciones Voluntarias al SAR",
    "D07 Primas por Seguros de Gastos Médicos",
    "D08 Gastos de Transportación Escolar Obligatoria",
    "D09 Depósitos en Cuentas para el Ahorro, Primas que tengan como Base Planes de Pensiones",
    "D010 Pagos por Servicios Educativos (Colegiaturas)",
    "P01 Por Definir"
  ];
  selectedValue: string;
  selectedCar: string;                      
  folio: number;
  sumado:number;
  i: number;
  precio:number;
  articulo: string  ;
  unidades:  number ;
  descuento: number  ;
  Umed:  string  ;
  cambio:number;
  te=[];
  ta=[];
  tots:number;
  iva:number;
  fech:any;
  met:string;
  din:number;
  di:number;
  dias:number;
  idCliente: string;
  now:any;
  raz:string;
  

  year:any;   month:any;  day:any;  hours:any;  minutes:any;  time:any;  seconds:any;

    constructor(public articuloServicioService: ArticuloServicioService, private router: Router, public datosEmpresaService2: DatosEmpresaService2, public datosEmpresaService: DatosEmpresaService ) {
    this.day = new Date().getDate();
    this.now = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a'); // add this 2 of 4
    this.month = new Date().getMonth()+1;
    this.year = new Date().getFullYear();
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.seconds = new Date().getSeconds();
    this.sumado=0;
    this.iva=16;
    this.tots=0;
    
     

   }
   filterpost = '';
   selectedCliente: string = "";
   selectedMetodo: string = "";
   selectedForma: string = "";
   selectedCFDi: string = "";
   selectedid: string = "";

   nada(form: NgForm){
    (form.value.nombre);
    (form.value.articulo);
    (form.value.unidades);
    (form.value.precio);
    (form.value.descuento);
    (form.value.uMed);
          form.value.precio=this.precio;
          form.value.articulo=this.articulo;
          form.value.uMed=this.Umed;
          form.value.descuento=this.descuento;
    this.te.push([
      form.value.nombre,
      form.value.articulo,
      form.value.unidades, 
      form.value.precio,
      form.value.descuento,
      form.value.uMed,
      form.value.unidades*form.value.precio  
      ]);
    this.sumado = +  ( form.value.precio*form.value.unidades)+this.sumado;
    this.tots=+(Math.round(100*(this.sumado*((this.iva/100)+1))))/100;
    (this.tots);
    this.precio=null;
    this.articulo=null ;
    this.unidades=null ;
    this.descuento=null ;
    
    this.resetForm3();
    (this.te);
    }
    ora(ll: string, form: NgForm){
      for(let emp of this.articuloServicioService.DatosArtServ){ 
        if(emp.nombre==ll){
          this.precio=emp.precio;
          form.value.precio=this.precio;
          this.articulo=emp.articuloServicio;
          form.value.articulo=this.articulo;
          this.unidades=1;
          
          form.value.unidades=this.unidades;
          this.Umed=emp.unidad;
          form.value.uMed=this.Umed;
          this.descuento=0;
          form.value.descuento=this.descuento;
          (form.value.nombre);
          (form.value.articulo);
          (form.value.unidades);
          (form.value.precio);
          (form.value.descuento);
          (form.value.uMed);
          break;
        }
      }
      
    }
    ora2(ll: number, form: NgForm){
      this.iva= ll;
      this.tots=(Math.round(100*(this.sumado*((this.iva/100)+1))))/100;
      (this.tots, this.cambio);
    }
    

  ngOnInit() {
    
    this.resetForm2();
    this.resetFormArt();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDeEmpresa2();
    this.refrescarListaDeArtServ();
    this.folio = 0;
    

  }
  resetFormArt(form?: NgForm) {
    if(form)
      form.reset();
    this.articuloServicioService.selectArtServ = {
      _id: "",
      articuloServicio: "",
      nombre: "",
      precio: null,
      uMed: "",
      unidadTipo: "",
      unidadSubtipo:"",
      unidadCodigo:"",
      unidad:"",
      productoTipo: "",
      productoDivision:"",
      productoGrupo:"",
      productoClase:""
    }
  }
 
  
  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }
  counter(int) {
      this.folio = int;
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
      forma: '',
      cfdi: '',
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
      iva:null,
      artarr:[null],
      fechaExpir:'',
      idCliente: '',
      dineroRest:null,
      abono:null,
    }
  }
  resetForm3(form?: NgForm) {
    if(form)
      form.reset();
      this.datosEmpresaService2.selectEmpresa = {
      _id: '',
      nombreDeLaEmpresa: form.value.nombreDeLaEmpresa,
      metodo: form.value.metodo,
      forma:form.value.forma,
      cfdi:form.value.cfdi,
      estatus:form.value.estatus,
      razon:form.value.razon,
      fecha:form.value.fecha,
      monto:null,
      folio:null,
      /* Nuevos campos agregados en base a la factura ejemplo */
      ordenDeCompra: form.value.ordenDeCompra,
      condiciones: form.value.condiciones,	
      vendedor: form.value.vendedor,
      viaDeEmbarque: form.value.viaDeEmbarque,
      unidades:null,
      articulo: '',	
      nombre: null,
      precio:null,
      descuento:null,
      uMed: '',
      importe:form.value.import,	
      subtotal:form.value.subtotal,
      total:form.value.total,
      iva:form.value.iva,
      artarr:[null],
      fechaExpir:form.value.fechaExpir,
      idCliente: form.value.idCliente,
      dineroRest:null,
      abono:null
    }
  }
  /* De momento no quitar funcion nada */
  
  onSubmit(form: NgForm){
    console.log(this.idCliente);
    if(form.value._id == ""){
      if(this.folio==0){this.folio=1}
      form.value.folio = this.folio.toString();
           
      this.now=moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
        form.value.fecha=this.now;
      if(this.met=="Contado (PUE)"){
        this.now = moment().locale('es');
        this.now.add(this.di, 'days');
        form.value.fechaExpir=this.now.format('MMM Do YY');
        this.fech=this.now.format('MMMM  Do YYYY');
        this.now = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
        form.value.estatus = "Pagado de contado";
        form.value.dineroRest=this.tots.toString();
      }else{if(this.met=="Credito (PPD)"){
        
        this.now = moment().locale('es');
        this.now.add(this.di, 'days');
        form.value.fechaExpir=this.now.format('MMM Do YY');
        this.fech=this.now.format('MMMM  Do YYYY');
        this.now = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
        form.value.estatus = "Habilitado";
        form.value.dineroRest=this.tots.toString();} 
      }
        
        
      // this.datosEmpresaService2.selectEmpresa.nombreDeLaEmpresa=this.folio.toString();
      form.value.artarr=this.te;
      form.value.metodo=this.met;
      form.value.subtotal=this.sumado.toString();
      form.value.total=this.tots.toString();
      form.value.iva=this.iva;
      form.value.idCliente= this.idCliente;
      this.datosEmpresaService2.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        window.alert("Se Guardó Correctamente");
        this.router.navigateByUrl('/fact');
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService2.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizó Correctamente");
      });
    }
  }
  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  onEdit2(emp: DatosFact) {
    this.datosEmpresaService2.selectEmpresa = emp;
  }
  onEdit3(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
  }

  eso(name, form) {
    console.log(name.toString);
    for(let emp of this.datosEmpresaService.DatosEmpresa){
      if(emp.nombreDeLaEmpresa==name){
        form.value.metodo=emp.metodo;
        this.met=emp.metodo;
        form.value.dias=emp.dias;
        this.di=emp.dias;
        this.raz=emp.razon;
        form.value._id=emp._id;
        this.idCliente=emp._id;
        form.value.razon=this.raz;
        
          this.now = moment().locale('es');
          this.now.add(this.di, 'days');
          form.value.fechaExpir=this.now.format('MMM Do YY');
          this.fech=this.now.format('MMMM  Do YYYY');
          this.now = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
        
      }
    }
}
selectMetodo(name) {
  this.selectedMetodo=name;
}
selectForma(name) {
  this.selectedForma=name;
}
selectCFDi(name) {
  this.selectedCFDi=name;
}

selectArt(name) {
}
}