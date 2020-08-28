import { NgForm } from '@angular/forms';
import { Catalogo } from '../../models/catalogo'
import { CatalogoService } from '../../services/catalogo.service';
import { Component, OnInit, ViewChild } from '@angular/core';

//Material
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  ELEMENT_DATA: Catalogo[];
  displayedColumns: string[] = [
    'tipo', 
    'division', 
    'grupo', 
    'clase',
    'clave',
    'editar',
    'eliminar'
  ];
  dataSource = new MatTableDataSource<Catalogo>(this.ELEMENT_DATA);

  constructor(public catalogoService:CatalogoService, private _snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getAllCatalogo();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.resetCatalogoForm();
  }


  getAllCatalogo(){
    let resp = this.catalogoService.getDatosList();
    resp.subscribe(res =>this.dataSource.data = res as Catalogo[])
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetCatalogoForm(form?: NgForm) {
    if(form)
      form.reset();
    this.catalogoService.selectCatalogo = {
      _id: "",
      tipo:"", 
      division:"", 
      grupo:"", 
      clase:"", 
      clave:null
    }
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.catalogoService.postDatos(form.value).subscribe((res) => {
        this.openSnackBar('Se Guardo Correctamente', 'End');
        this.getAllCatalogo();
        // window.location.reload();
        this.resetCatalogoForm();
      });
    } else {
      this.catalogoService.putDatos(form.value).subscribe((res) => {
        this.openSnackBar('Se Actualizo Correctamente', 'End');
        this.getAllCatalogo();
        this.resetCatalogoForm();
      });
    }
  }

  onEdit(cat: Catalogo) {
    this.catalogoService.selectCatalogo = cat;
  }

  onDelete(cat:Catalogo) {
    if (confirm('¿Estás Seguro que deseas eliminarlo?') == true) {
      this.catalogoService.deleteDato(cat._id).subscribe((res) =>{
        this.getAllCatalogo();
        // this.resetForm(form);
        this.openSnackBar('Eliminado Correctamente', 'End' );
        
      });
    }
   
  } 

}
