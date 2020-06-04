import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosFact } from '../../models/datos-fact';
import { Router } from '@angular/router';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css'],
  providers: [DatosEmpresaService2],
})
export class FactComponent implements OnInit {
/* El servicio de Facturas se guardo en una variable: datosEmpresaService */
  constructor(public datosEmpresaService: DatosEmpresaService2) { }
  monstrar = true;
  ver = true;
  
  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosFact[];
    });
  }
  onEdit(emp: DatosFact) {
    this.datosEmpresaService.selectEmpresa = emp;
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
      /* El servicio de Facturas se guardo en una variable: datosEmpresaService */
    this.datosEmpresaService.selectEmpresa = {
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
        this.monstrar=!this.monstrar;
      });
    }
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.datosEmpresaService.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
      });
    }
  }
  cambiarEstatus(emp: DatosFact){
    if (confirm('Estas seguro que deseas cancelarlo ?') == true) {
    this.datosEmpresaService.selectEmpresa = emp;
    this.datosEmpresaService.selectEmpresa.estatus = 'Cancelado';
    this.datosEmpresaService.putCancelado(emp).subscribe();
    }
  }
}