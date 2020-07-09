import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DatosEmpresaService } from "../../services/datos-empresa.service"; //clientes
import { DatosEmisor } from '../../models/datos-emisor'; //clientes
import { DatosFact } from "../../models/datos-fact"; //factura
import { DatosEmpresaService2 } from "../../services/datos-fact.service"; //factura
import { DatosMiEmpresaService } from '../../services/datos-mi-empresa.service'; //Mi empresa
import { DatosMiEmpresa } from '../../models/datos-mi-empresa'; //Mi empresa
//Módulos necesarios para generación del PDF
import jsPDF from "jspdf";
import "jspdf-autotable";

import * as moment from 'moment'; // add this 1 of 4
// import { DatosEmpresaService } from '../../services/datos-prov.service';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
//Creación de constante de la función del pdf
let doc = new jsPDF();

@Component({
  selector: "app-fact",
  templateUrl: "./fact.component.html",
  styleUrls: ["./fact.component.css"],
  providers: [DatosEmpresaService2,DatosEmpresaService,DatosMiEmpresaService],
})
export class FactComponent implements OnInit {
  pageActual: number=1;
  
  now:any;


  /* El servicio de Facturas se guardó en una variable: datosEmpresaService */
  constructor( 
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
  timinus='';


  empNombre='';
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
        });
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
              { header: "Método", dataKey: "metodo" },
              { header: "Fecha", dataKey: "Fecha" },
              { header: "Ingreso faltante", dataKey: "codigo" },
              { header: "Monto", dataKey: "cantidad" },
              { header: "Ingreso restante", dataKey: "precio u." }
              
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

    var img = 'data:image/jpeg;base64,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'
    
    doc.addImage(img, 'JPEG', 138, 20, 60, 20); //Margen Izq., Margen Superior, Largo de imagen, Ancho de imagen
    doc.output("dataurlnewwindow");//abre  una previsualización del pdf en el navegador sin descargar 
    doc.save('Factura-'+this.datosEmpresaService.selectEmpresa.folio + this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa + '.pdf');
    doc = new jsPDF();
  }

  arrayAbono=[];
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
    if(this.datosEmpresaService.selectEmpresa.dineroRest>0){
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
  }
  

 /* onDelete(_id: string, form: NgForm) {
    if (confirm("¿Estas seguro que deseas eliminarlo?") == true) {
      this.datosEmpresaService.deleteDato(_id).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        window.alert({ html: "Eliminado Correctamente", classes: "rounded" });
      });
    }
  }*/
  cambiarEstatus(emp: DatosFact) {
    if (confirm("¿Estás seguro que deseas cancelarlo?") == true) {
      this.datosEmpresaService.selectEmpresa = emp;
      this.datosEmpresaService.selectEmpresa.estatus = "Cancelado";
      this.datosEmpresaService.putCancelado(emp).subscribe();
    }
  }
}
