import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DatosEmpresaService } from "../../services/datos-empresa.service"; //clientes
import { DatosEmisor } from '../../models/datos-emisor'; //clientes
import { DatosFact } from "../../models/datos-fact"; //factura
import { DatosEmpresaService2 } from "../../services/datos-fact.service"; //factura
import { DatosMiEmpresaService } from '../../services/datos-mi-empresa.service'; //Mi empresa
import { DatosMiEmpresa } from '../../models/datos-mi-empresa'; //Mi empresa
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'
//Módulos necesarios para generación del PDF
import jsPDF from "jspdf";
import "jspdf-autotable";

import * as moment from 'moment'; // add this 1 of 4
// import { DatosEmpresaService } from '../../services/datos-prov.service';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
//Creación de constante de la función del pdf
let doc:any = new jsPDF();

@Component({
  selector: "app-fact",
  templateUrl: "./fact.component.html",
  styleUrls: ["./fact.component.css"],
  providers: [DatosEmpresaService2,DatosEmpresaService,DatosMiEmpresaService,ArticuloServicio, ArticuloServicioService],
})
export class FactComponent implements OnInit {
  pageActual: number=1;
  
  now:any;


  /* El servicio de Facturas se guardó en una variable: datosEmpresaService */
  constructor( 
    public articuloServicioService: ArticuloServicioService,
    public datosEmpresaService: DatosEmpresaService2,
  //datosEmpresaService2 -  Factura
    public datosEmpresaService2: DatosEmpresaService,
  //datosEmpresaService - Clientes
    public datosMiEmpresaService: DatosMiEmpresaService,
  //datoMiEmpresaService - Mi Empresa
  ) {
    
    this.now = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a'); // add this 2 of 4
    console.log(this.datosEmpresaService.selectEmpresa);  

  }
  monstrar = true;
  ver = true;
  calle='';
  numeroI='';
  pais=''
  colonia='';
  municipio='';
  Localidad='';
  codigoP='';
  RFC='';
  id='';
  timinus='';
folio=0;

  empNombre='';
  counter(int) {
    this.folio = int;
}
  GenerarPDF2() {
    
    // doc.autoTable({
        //   theme: ["plain"],
        //   startY: 0,
        //   margin: { left: 160, top: 0 },
        //   tableWidth: 30,
        //   headStyles: { halign: "right", cellPadding: { top: 4 } },
        //   columns: [{ header: "Aquí va el logo" }],
        //   styles: { halign: "center", valign: "middle", cellWidth: "auto" },
     // });
     
        doc.autoTable({
          theme: ["plain"],
          //startY: 0,
          margin: { left: 13, top: 15 },
          //tableWidth: 100,
          //tableLineWidth: 0,
          body: [
          { uno: this.datosMiEmpresaService.DatosEmpresa[0].calle+", "+this.datosMiEmpresaService.DatosEmpresa[0].numero},
          { uno: this.datosMiEmpresaService.DatosEmpresa[0].colonia},
          { uno: this.datosMiEmpresaService.DatosEmpresa[0].estado+ " , "+this.datosMiEmpresaService.DatosEmpresa[0].
          municipio+" CP: "+ this.datosMiEmpresaService.DatosEmpresa[0].codigoPostal},
            { uno: "RFC: "+this.datosMiEmpresaService.DatosEmpresa[0].rfc}, 
            ],
          headStyles: { halign: "left" },
          styles: {cellPadding: 1},
          columns: [{ header: this.datosMiEmpresaService.DatosEmpresa[0].nombreDeLaEmpresa, dataKey: "uno" }],
        }); //esto se queda as{i}
        //doc.autoTable({
        //  theme: ["plain"],
        //  startY: 0,
        //  margin: { left: 150, top: 0 },
        //  head: ["Factura"],
        //  styles: {
        //    fontStyle: "bold",
        //    halign: "rigth",
        //    cellWidth: "auto",
        //    fontSize: 20,
        //  },
        //  headStyles: { halign: "right" },
        //});
        doc.autoTable({
          theme: ["grid"],
          margin: { left: 145, rigt: 15 },
          columnStyles: { code: { halign: "center" } },
          body: [
            {
              date: this.datosEmpresaService.selectEmpresa.fecha,
              code: this.datosEmpresaService.selectEmpresa.folio,
              est: this.datosEmpresaService.selectEmpresa.estatus
            },
          ],
          columns: [
            { header: "Fecha y hora", dataKey: "date" },
            { header: "Folio", dataKey: "code" },
            { header: "Estatus", dataKey: "est" }
          ],
          //styles: { halign: "rigth", cellWidth: "auto", fontSize: 10 },
        });
        for(let emp2 of this.datosEmpresaService2.DatosEmpresa){
          if(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa.toString()==emp2.nombreDeLaEmpresa.toString()){
            this.calle=emp2.calle;
            this.numeroI=emp2.numExterior;
            this.colonia=emp2.colonia;
            this.municipio=emp2.municipio;
            this.Localidad=emp2.localidad;
            this.codigoP=emp2.cp;
            this.RFC=emp2.rfc;
            this.calle=emp2.calle;
            this.pais=emp2.pais;
          }
        }
        doc.autoTable({
          theme: ["grid"],
          styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto",cellPadding:1 },
          columnStyles: { halign: "center" },
          headStyles: { fontSize: 12, halign: "center" },
          margin: { right: 130 },
          pageBreak: "avoid",
    
          // calle='';
          // numeroI='';
          
          // colonia='';
          // municipio='';
          
          // Localidad='';
          // codigoP='';
          
          // RFC='';
          body: [
            { client: this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa },
            { client:this.calle+" "+this.numeroI},
            { client: this.colonia },
            { client: this.pais+" "+this.municipio+" CP:"+this.codigoP },
            { client: "RFC: "+this.RFC },  
            // this.datosEmpresaService.selectEmpresa
          ],
          columns: [{ header: "Cliente", dataKey: "client" }],
        });
        doc.autoTable({
          theme: ["grid"],
          styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto" },
          columnStyles: { halign: "left" },
          headStyles: { fontSize: 12 },
          margin: { right: 15 },
          pageBreak: "avoid",
    
          body: [
            {
              purchaseorder: this.datosEmpresaService.selectEmpresa.ordenDeCompra,
              condition: this.datosEmpresaService.selectEmpresa.condiciones,
              seller: this.datosEmpresaService.selectEmpresa.vendedor,
              wayofshipment: this.datosEmpresaService.selectEmpresa.viaDeEmbarque,
            },
    
          ],
          columns: [
            { header: "Orden de Compra", dataKey: "purchaseorder" },
            { header: "Condiciones", dataKey: "condition" },
            { header: "Vendedor", dataKey: "seller" },
            { header: "Vía de Embarque", dataKey: "wayofshipment" },
          ],
        }),
          doc.autoTable({
            theme: ["grid"],
            // startY: 200,
            styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto" },
            columnStyles: { halign: "center" },
            headStyles: { fontSize: 12 },
            margin: { right: 15 },
            pageBreak: "avoid",
            rowPageBreak: "avoid",
            body: this.datosEmpresaService.selectEmpresa.abono,//easy peasy
            columns: [
              { header: "Modo de pago", dataKey: "articulo" },
              { header: "Fecha", dataKey: "codigo" },
              { header: "Deuda inicial", dataKey: "cantidad" },
              { header: "Monto", dataKey: "precio u." },
              { header: "Deuda restante", dataKey: "precio u." }
            ],
          });
        doc.autoTable({
          theme: ["grid"],
          // startY: 180,
          tableLineWidth: 0.5,
          styles: {
            fontStyle: "normal",
            fontSize: 10,
            cellWidth: "auto",
            lineWidth: 0,
          },
          columnStyles: { 2: { halign: "right" } },
          headStyles: { fontSize: 12 },
          margin: { right: 15 },
          pageBreak: "avoid",
          rowPageBreak: "avoid",
          head: [["Datos SAT", "", ""]],
          body: [
            [, "Subtotal", "$" + this.datosEmpresaService.selectEmpresa.subtotal],
            [, "IVA", "%" + this.datosEmpresaService.selectEmpresa.iva],
            [, "Total", "$" + this.datosEmpresaService.selectEmpresa.total],
          ],
        });
    
        //doc.setDrawColor(255,0,0); Esto es para el color de línea del margen
        doc.setLineWidth(1);
        doc.rect(8, 10, 193, 278); // Margen Izq., Margen Superior, Ancho de hoja, Alto de hoja
        
        doc.addImage('/assets/img/logo.jpg', 'JPEG', 138, 20, 60, 20); //Margen Izq., Margen Superior, Largo de imagen, Ancho de imagen
        doc.output("dataurlnewwindow");//abre  una previsualización del pdf en el navegador sin descargar 
        doc.save('Factura-'+this.datosEmpresaService.selectEmpresa.folio + this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa + '.pdf');
        doc = new jsPDF();
      }
  GenerarPDF() {
    
// doc.autoTable({
    //   theme: ["plain"],
    //   startY: 0,
    //   margin: { left: 160, top: 0 },
    //   tableWidth: 30,
    //   headStyles: { halign: "right", cellPadding: { top: 4 } },
    //   columns: [{ header: "Aquí va el logo" }],
    //   styles: { halign: "center", valign: "middle", cellWidth: "auto" },
 // });
 if(this.datosEmpresaService.selectEmpresa.estatus=='Cancelado'){
            
  doc.setFontSize(100);
  doc.setTextColor(255,0,0);
  doc.text( 'Cancelado', 30, 70,-20);
}
    doc.autoTable({
      theme: ["plain"],
      //startY: 0,
      margin: { left: 13, top: 15 },
      //tableWidth: 100,
      //tableLineWidth: 0,
      body: [
      { uno: this.datosMiEmpresaService.DatosEmpresa[0].calle+", "+this.datosMiEmpresaService.DatosEmpresa[0].numero},
      { uno: this.datosMiEmpresaService.DatosEmpresa[0].colonia},
      { uno: this.datosMiEmpresaService.DatosEmpresa[0].estado+ " , "+this.datosMiEmpresaService.DatosEmpresa[0].
      municipio+" CP: "+ this.datosMiEmpresaService.DatosEmpresa[0].codigoPostal},
        { uno: "RFC: "+this.datosMiEmpresaService.DatosEmpresa[0].rfc}, 
        ],
      headStyles: { halign: "left" },
      styles: {cellPadding: 1},
      columns: [{ header: this.datosMiEmpresaService.DatosEmpresa[0].nombreDeLaEmpresa, dataKey: "uno" }],
    }); //esto se queda as{i}
    //doc.autoTable({
    //  theme: ["plain"],
    //  startY: 0,
    //  margin: { left: 150, top: 0 },
    //  head: ["Factura"],
    //  styles: {
    //    fontStyle: "bold",
    //    halign: "rigth",
    //    cellWidth: "auto",
    //    fontSize: 20,
    //  },
    //  headStyles: { halign: "right" },
    //});
    doc.autoTable({
      theme: ["grid"],
      margin: { left: 145, rigt: 15 },
      columnStyles: { code: { halign: "center" } },
      body: [
        {
          date: this.datosEmpresaService.selectEmpresa.fecha,
          code: this.datosEmpresaService.selectEmpresa.folio,
          est: this.datosEmpresaService.selectEmpresa.estatus
        },
      ],
      columns: [
        { header: "Fecha y hora", dataKey: "date" },
        { header: "Folio", dataKey: "code" },
        { header: "Estatus", dataKey: "est" }
      ],
      //styles: { halign: "rigth", cellWidth: "auto", fontSize: 10 },
    });
    for(let emp2 of this.datosEmpresaService2.DatosEmpresa){
      if(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa.toString()==emp2.nombreDeLaEmpresa.toString()){
        this.calle=emp2.calle;
        this.numeroI=emp2.numExterior;
        this.colonia=emp2.colonia;
        this.municipio=emp2.municipio;
        this.Localidad=emp2.localidad;
        this.codigoP=emp2.cp;
        this.RFC=emp2.rfc;
        this.calle=emp2.calle;
        this.pais=emp2.pais;
      }
    }
    doc.autoTable({
      theme: ["grid"],
      styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto",cellPadding:1 },
      columnStyles: { halign: "center" },
      headStyles: { fontSize: 12, halign: "center" },
      margin: { right: 130 },
      pageBreak: "avoid",

      // calle='';
      // numeroI='';
      
      // colonia='';
      // municipio='';
      
      // Localidad='';
      // codigoP='';
      
      // RFC='';
      body: [
        { client: this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa },
        { client:this.calle+" "+this.numeroI},
        { client: this.colonia },
        { client: this.pais+" "+this.municipio+" CP:"+this.codigoP },
        { client: "RFC: "+this.RFC },  
        // this.datosEmpresaService.selectEmpresa
      ],
      columns: [{ header: "Cliente", dataKey: "client" }],
    });
    doc.autoTable({
      theme: ["grid"],
      styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto" },
      columnStyles: { halign: "left" },
      headStyles: { fontSize: 12 },
      margin: { right: 15 },
      pageBreak: "avoid",

      body: [
        {
          purchaseorder: this.datosEmpresaService.selectEmpresa.ordenDeCompra,
          condition: this.datosEmpresaService.selectEmpresa.condiciones,
          seller: this.datosEmpresaService.selectEmpresa.vendedor,
          wayofshipment: this.datosEmpresaService.selectEmpresa.viaDeEmbarque,
        },

      ],
      columns: [
        { header: "Orden de Compra", dataKey: "purchaseorder" },
        { header: "Condiciones", dataKey: "condition" },
        { header: "Vendedor", dataKey: "seller" },
        { header: "Vía de Embarque", dataKey: "wayofshipment" },
      ],
    }),
      doc.autoTable({
        theme: ["grid"],
        // startY: 200,
        styles: { fontStyle: "normal", fontSize: 10, cellWidth: "auto" },
        columnStyles: { halign: "center" },
        headStyles: { fontSize: 12 },
        margin: { right: 15 },
        pageBreak: "avoid",
        rowPageBreak: "avoid",
        body: this.datosEmpresaService.selectEmpresa.artarr,//easy peasy
        columns: [
          { header: "Artículo", dataKey: "articulo" },
          { header: "Código", dataKey: "codigo" },
          { header: "Cantidad", dataKey: "cantidad" },
          { header: "Precio Uni.", dataKey: "precio u." },
          { header: "Desc.", dataKey: "descuento" },
          { header: "Ud.Med.", dataKey: "umed" },
          { header: "Suma", dataKey: "suma" },
        ],
      });
    doc.autoTable({
      theme: ["grid"],
      // startY: 180,
      tableLineWidth: 0.5,
      styles: {
        fontStyle: "normal",
        fontSize: 10,
        cellWidth: "auto",
        lineWidth: 0,
      },
      columnStyles: { 2: { halign: "right" } },
      headStyles: { fontSize: 12 },
      margin: { right: 15 },
      pageBreak: "avoid",
      rowPageBreak: "avoid",
      head: [["Datos SAT", "", ""]],
      body: [
        [, "Subtotal", "$" + this.datosEmpresaService.selectEmpresa.subtotal],
        [, "IVA", "%" + this.datosEmpresaService.selectEmpresa.iva],
        [, "Total", "$" + this.datosEmpresaService.selectEmpresa.total],
      ],
    });

    //doc.setDrawColor(255,0,0); Esto es para el color de línea del margen
    doc.setLineWidth(1);
    doc.rect(8, 10, 193, 278); // Margen Izq., Margen Superior, Ancho de hoja, Alto de hoja
    
    doc.addImage('/assets/img/logo.jpg', 'JPEG', 138, 20, 60, 20); //Margen Izq., Margen Superior, Largo de imagen, Ancho de imagen
    doc.output("dataurlnewwindow");//abre  una previsualización del pdf en el navegador sin descargar 
    doc.save('Factura-'+this.datosEmpresaService.selectEmpresa.folio + this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa + '.pdf');
    doc = new jsPDF();
  }
  filterpost = '';
  selectedCliente: string = "";
  selectedMetodo: string = "";
  selectedForma: string = "";
  selectedCFDi: string = "";
  selectedid: string = "";
  selectedValue: string;
  selectedCar: string;    
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
  raz:string;
  nada2(form: NgForm){
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
    resetForm3(form?: NgForm) {
      if(form)
        form.reset();
        this.datosEmpresaService.selectEmpresa = {
        _id: '',
        nombreDeLaEmpresa: form.value.nombreDeLaEmpresa,
        metodo: form.value.metodo,
        forma: form.value.forma,
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
  eso(name, form) {
    console.log(name.toString);
    for(let emp of this.datosEmpresaService2.DatosEmpresa){
      if(emp.nombreDeLaEmpresa==name){
        this.id=emp._id;
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
  arrayAbono=[];
  montoAbono=null;
  abonoMetodo="";
  nada(form: NgForm){
    if(this.datosEmpresaService.selectEmpresa.dineroRest>0){
    this.now=moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
    this.datosEmpresaService.selectEmpresa.abono.push([
      form.value.abonoMetodo,
      this.now,
      this.datosEmpresaService.selectEmpresa.dineroRest,
      form.value.montoAbono,
      (Math.round(100*(this.datosEmpresaService.selectEmpresa.dineroRest-form.value.montoAbono.toString())))/100,
      
    ]);
    this.arrayAbono=this.datosEmpresaService.selectEmpresa.abono;

    this.datosEmpresaService.selectEmpresa.dineroRest=(Math.round(100*(this.datosEmpresaService.selectEmpresa.dineroRest-form.value.montoAbono.toString())))/100
  }
  
  if(this.datosEmpresaService.selectEmpresa.dineroRest==0){
    this.datosEmpresaService.selectEmpresa.estatus="Pagado"
  }



}
  ngOnInit() {
    
    this.resetForm();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDatosDatosEmisor();
    this.refrescarListaEmp();
  
  }
 refrescarListaEmp() {
    this.datosMiEmpresaService.getDatosList().subscribe((res) => {
      this.datosMiEmpresaService.DatosEmpresa = res as DatosMiEmpresa[]; 
    });
  }
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
      this.datosEmpresaService.DatosEmpresa = res as DatosFact[]; 
    });
  }
  refrescarListaDatosMiEmpresa(){
    this.datosMiEmpresaService.getDatosList().subscribe((res) => {
      this.datosMiEmpresaService.DatosEmpresa = res as DatosMiEmpresa[];
    });
  }
  refrescarListaDatosDatosEmisor(){
    this.datosEmpresaService2.getDatosList().subscribe((res) => {
      this.datosEmpresaService2.DatosEmpresa = res as DatosEmisor[];
    });
  }
  onEdit(emp: DatosFact) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  resetForm(form?: NgForm) {
    if (form) form.reset();
    /* El servicio de Facturas se guardo en una variable: datosEmpresaService */
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      nombreDeLaEmpresa: "",
      metodo: "",
      forma:'',
      cfdi:'',
      estatus: "",
      razon: "",
      fecha: "",
      monto: null,
      folio: null,
      ordenDeCompra: "",
      condiciones: "",
      vendedor: "",
      viaDeEmbarque: "",
      unidades: null,
      articulo: "",
      nombre: "",
      precio: null,
      descuento: null,
      uMed: "",
      importe: null,
      subtotal: null,
      total: null,
      iva: null,
      artarr: [null],
      fechaExpir:'',
      idCliente: '',
      dineroRest:null,
      abono:null
    };
  }
  onSubmit(form: NgForm) {
    this.nada(form);
    if (form.value._id == "") {
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardó Correctamente");
      });
    } else {
      form.value.abono=this.arrayAbono;
      form.value.metodo=this.datosEmpresaService.selectEmpresa.metodo;
      form.value.forma=this.datosEmpresaService.selectEmpresa.forma;
      form.value.cfdi=this.datosEmpresaService.selectEmpresa.cfdi;
      form.value.artarr=this.datosEmpresaService.selectEmpresa.artarr;
      form.value.dineroRest=this.datosEmpresaService.selectEmpresa.dineroRest;
      form.value.fechaExpir=this.datosEmpresaService.selectEmpresa.fechaExpir;
      form.value.estatus=this.datosEmpresaService.selectEmpresa.estatus;
      this.datosEmpresaService.putDatos(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizó Correctamente");
        this.monstrar = !this.monstrar;
      });
    }
  }
  onSubmit2(form: NgForm) {
    
      
      form.value.abono=this.arrayAbono;
      form.value.metodo=this.datosEmpresaService.selectEmpresa.metodo;
      form.value.forma=this.datosEmpresaService.selectEmpresa.forma;
      form.value.cfdi=this.datosEmpresaService.selectEmpresa.cfdi;
      form.value.artarr=this.datosEmpresaService.selectEmpresa.artarr;
      form.value.dineroRest=this.datosEmpresaService.selectEmpresa.dineroRest;
      form.value.fechaExpir=this.datosEmpresaService.selectEmpresa.fechaExpir;
      form.value.estatus=this.datosEmpresaService.selectEmpresa.estatus;
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardó Correctamente");
      });
    
  }
  
  cambiarEstatus(emp: DatosFact) {
    if (confirm("¿Estás seguro que deseas cancelarlo?") == true) {
      this.datosEmpresaService.selectEmpresa = emp;
      this.datosEmpresaService.selectEmpresa.estatus = "Cancelado";
      this.datosEmpresaService.putCancelado(emp).subscribe();
    }
  }
}
