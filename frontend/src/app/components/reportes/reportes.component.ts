import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosFact } from '../../models/datos-fact';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ArticuloServicio } from '../../models/articulos-y-servicios';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [DatosEmpresaService2],
})



export class ReportesComponent implements OnInit {
  ELEMENT_DATA: DatosFact[];
  displayedColumns: string[] = ['folio', 'nombreDeLaEmpresa', 'metodo','forma', 'total', 'fecha', 'estatus'];
  dataSource = new MatTableDataSource<DatosFact>(this.ELEMENT_DATA);

  constructor(public datosEmpresaService2: DatosEmpresaService2) { }
  
  monstrar = true;
  ver = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllFact();
  }

public getAllFact(){
  let resp = this.datosEmpresaService2.getDatosList();
  resp.subscribe(res =>this.dataSource.data = res as DatosFact[])
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
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
      forma:'',
      cfdi:'',
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
      artarr:[],
      fechaExpir:'',
      dineroRest:null


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



