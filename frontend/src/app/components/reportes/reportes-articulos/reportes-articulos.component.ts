import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ArticuloServicio } from '../../../models/articulos-y-servicios';
import { ArticuloServicioService } from '../../../services/articulos-y-servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reportes-articulos',
  templateUrl: './reportes-articulos.component.html',
  styleUrls: ['./reportes-articulos.component.css'],
  providers: [ArticuloServicioService]
})
export class ReportesArticulosComponent implements OnInit {

  ELEMENT_DATA: ArticuloServicio[];
  displayedColumns: string[] = ['nombre', 'articuloServicio', 'precio', 'productoTipo', 'productoGrupo'];
  dataSource = new MatTableDataSource<ArticuloServicio>(this.ELEMENT_DATA);

  constructor(public articuloServicioService: ArticuloServicioService, private _snackBar: MatSnackBar) { }
  
  monstrar = true;
  ver = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllArt();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  resetForm(form?: NgForm) {
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
      productoClase:"",
    }
  }
  public getAllArt(){
    let resp = this.articuloServicioService.getDatosList();
    resp.subscribe(res =>this.dataSource.data = res as ArticuloServicio[])
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.articuloServicioService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        this.openSnackBar('Se Guardo Correctamente', 'End');
        
        
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeArtServ();
        this.openSnackBar('Se Actualizo Correctamente', 'End');
      });
    }
  }

  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
  }

}


