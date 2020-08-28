import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DatosEmpresaService } from '../../../services/datos-empresa.service';
import { DatosEmisor } from '../../../models/datos-emisor';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reportes-clientes',
  templateUrl: './reportes-clientes.component.html',
  styleUrls: ['./reportes-clientes.component.css']
})
export class ReportesClientesComponent implements OnInit {

  constructor(private datosEmpresaService: DatosEmpresaService,private _snackBar: MatSnackBar) { }
  ELEMENT_DATA: DatosEmisor[];
  displayedColumns: string[] = ['nombreDeLaEmpresa', 'email', 'metodo', 'dias', 'estatus'];
  dataSource = new MatTableDataSource<DatosEmisor>(this.ELEMENT_DATA);
  

  monstrar = true;
  ver = true;
  fact = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllEmp();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  public getAllEmp(){
    let resp = this.datosEmpresaService.getDatosList();
    resp.subscribe(res =>this.dataSource.data = res as DatosEmisor[])
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisor[];
    });
  }
  
  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      nombreDeLaEmpresa: "",
      email: "",
      calle: "",
      colonia: "",
      estado: "",
      metodo:"",
      estatus:"",
      razon:"",
      dias:null,
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
  
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        this.openSnackBar('Se Guardo Correctamente', 'End');
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        this.monstrar = !this.monstrar;
        this.openSnackBar('Se Actualizo Correctamente', 'End');
      });
    }
  }
  onDelete(_id: string, form: NgForm) {

    if (confirm('¿Estás seguro que deseas eliminarlo ?') == true) {

      this.datosEmpresaService.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        this.openSnackBar('Eliminado Correctamente', 'End' );
        
      });
    }
  }
}
