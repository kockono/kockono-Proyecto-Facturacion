import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosFact } from '../../models/datos-fact';

  

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatosEmpresaService2],
})



export class ReportesComponent implements OnInit {
  
  constructor(public datosEmpresaService2: DatosEmpresaService2) { }
  filterpost = '';
  monstrar = true;
  ver = true;


  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }



/* Funciones para traer datos */
  refrescarListaDeEmpresa() {
    this.datosEmpresaService2.getDatosList().subscribe((res) => {
        this.datosEmpresaService2.DatosEmpresa = res as DatosFact[];
        


    });
  }
  onEdit(emp: DatosFact) {
    this.datosEmpresaService2.selectEmpresa = emp;
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
      /* El servicio de Facturas se guardo en una variable: datosEmpresaService */
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
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService2.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService2.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService2.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
        this.monstrar=!this.monstrar;
      });
    }
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.datosEmpresaService2.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
      });
    }
  }
  cambiarEstatus(emp: DatosFact){
    if (confirm('Estas seguro que deseas cancelarlo ?') == true) {
    this.datosEmpresaService2.selectEmpresa = emp;
    this.datosEmpresaService2.selectEmpresa.estatus = 'Cancelado';
    this.datosEmpresaService2.putCancelado(emp).subscribe();
    }
  }
}



