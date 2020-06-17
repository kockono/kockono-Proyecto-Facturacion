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
// import { DatosEmpresaService } from '../../services/datos-prov.service';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
//Creación de constante de la función del pdf
const doc = new jsPDF();

@Component({
  selector: "app-fact",
  templateUrl: "./fact.component.html",
  styleUrls: ["./fact.component.css"],
  providers: [DatosEmpresaService2,DatosEmpresaService,DatosMiEmpresaService],
})
export class FactComponent implements OnInit {
  /* El servicio de Facturas se guardó en una variable: datosEmpresaService */
  constructor( 
    public datosEmpresaService: DatosEmpresaService2,
  //datosEmpresaService2 -  Factura
    public datosEmpresaService2: DatosEmpresaService,
  //datosEmpresaService - Clientes
    public datosMiEmpresaService: DatosMiEmpresaService,
  //datoMiEmpresaService - Mi Empresa
  ) {
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


  empNombre='';

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
    
    
    doc.autoTable({
      theme: ["plain"],
      startY: 0,
      margin: { left: 13, top: 7 },
      tableWidth: 100,
      tableLineWidth: 0,
      body: [
        { uno: this.datosMiEmpresaService.DatosEmpresa[0].calle+", "+this.datosMiEmpresaService.DatosEmpresa[0].numero},
        { uno: this.datosMiEmpresaService.DatosEmpresa[0].colonia},
        { uno: this.datosMiEmpresaService.DatosEmpresa[0].estado+ " , "+this.datosMiEmpresaService.DatosEmpresa[0].municipio+" CP: "+ this.datosMiEmpresaService.DatosEmpresa[0].codigoPostal},
        { uno: "RFC: "+this.datosMiEmpresaService.DatosEmpresa[0].rfc}, 
        ],
      headStyles: { halign: "left" },
      styles: {cellPadding: 1},
      columns: [{ header: this.datosMiEmpresaService.DatosEmpresa[0].nombreDeLaEmpresa, dataKey: "uno" }],
    });
    doc.autoTable({
      theme: ["plain"],
      startY: 0,
      margin: { left: 150, top: 0 },
      head: ["Factura"],
      styles: {
        fontStyle: "bold",
        halign: "rigth",
        cellWidth: "auto",
        fontSize: 20,
      },
      headStyles: { halign: "right" },
    });
    doc.autoTable({
      theme: ["grid"],
      margin: { left: 150 },
      columnStyles: { code: { halign: "center" } },
      body: [
        {
          date: this.datosEmpresaService.selectEmpresa.fecha,
          code: this.datosEmpresaService.selectEmpresa.folio,
        },
      ],
      columns: [
        { header: "Fecha y hora", dataKey: "date" },
        { header: "Folio", dataKey: "code" },
      ],
      styles: { halign: "rigth", cellWidth: "auto", fontSize: 10 },
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
      margin: { top: 10 },
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
        margin: { top: 10 },
        pageBreak: "avoid",
        rowPageBreak: "avoid",
        body: this.datosEmpresaService.selectEmpresa.artarr,//easy peasy
        columns: [
          { header: "Articulo", dataKey: "articulo" },
          { header: "Codigo", dataKey: "codigo" },
          { header: "Cantidad", dataKey: "cantidad" },
          { header: "Precio u.", dataKey: "precio u." },
          { header: "Desc.", dataKey: "descuento" },
          { header: "U.med", dataKey: "umed" },
          { header: "Suma", dataKey: "suma" },
        ],
      });
    doc.autoTable({
      theme: ["grid"],
      // startY: 180,
      tableLineWidth: 1,
      styles: {
        fontStyle: "normal",
        fontSize: 10,
        cellWidth: "auto",
        lineWidth: 0,
      },
      columnStyles: { 2: { halign: "right" } },
      headStyles: { fontSize: 12 },
      margin: { top: 10 },
      pageBreak: "avoid",
      rowPageBreak: "avoid",
      head: [["Datos SAT", "", ""]],
      body: [
        [, "Subtotal", "$" + this.datosEmpresaService.selectEmpresa.subtotal],
        [, "IVA", "$" + this.datosEmpresaService.selectEmpresa.iva],
        [, "Total", "$" + this.datosEmpresaService.selectEmpresa.total],
      ],
    });

    doc.output("dataurlnewwindow");//abre  una previsualización del pdf en el navegador sin descargar 
    doc.save('Factura-'+this.datosEmpresaService.selectEmpresa.folio + this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa + '.pdf')
  }
  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDatosDatosEmisor();
    this.refrescarListaEmp();
    console.log(this.datosEmpresaService.selectEmpresa);  
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
    };
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
      });
    } else {
      this.datosEmpresaService.putDatos(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
        this.monstrar = !this.monstrar;
      });
    }
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm("¿Estas seguro que deseas eliminarlo?") == true) {
      this.datosEmpresaService.deleteDato(_id).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        window.alert({ html: "Eliminado Correctamente", classes: "rounded" });
      });
    }
  }
  cambiarEstatus(emp: DatosFact) {
    if (confirm("¿Estas seguro que deseas cancelarlo?") == true) {
      this.datosEmpresaService.selectEmpresa = emp;
      this.datosEmpresaService.selectEmpresa.estatus = "Cancelado";
      this.datosEmpresaService.putCancelado(emp).subscribe();
    }
  }
}
