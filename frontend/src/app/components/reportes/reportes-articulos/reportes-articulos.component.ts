import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ArticuloServicio } from '../../../models/articulos-y-servicios';
import { ArticuloServicioService } from '../../../services/articulos-y-servicios.service';

@Component({
  selector: 'app-reportes-articulos',
  templateUrl: './reportes-articulos.component.html',
  styleUrls: ['./reportes-articulos.component.css'],
  providers: [ArticuloServicioService]
})
export class ReportesArticulosComponent implements OnInit {

  ELEMENT_DATA: ArticuloServicio[];
  displayedColumns: string[] = ['nombre', 'articuloServicio', 'precio', 'uMed'];
  dataSource = new MatTableDataSource<ArticuloServicio>(this.ELEMENT_DATA);

  constructor(public articuloServicioService: ArticuloServicioService) { }
  
  monstrar = true;
  ver = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllArt();
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.articuloServicioService.selectArtServ = {
      _id: "",
      articuloServicio: "",
      nombre: "",
      precio: null,
      uMed: ""
    }
  }
  public getAllArt(){
    let resp = this.articuloServicioService.getDatosList();
    resp.subscribe(res =>this.dataSource.data = res as ArticuloServicio[])
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
        window.alert("Se Guardo Correctamente");
        
        
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeArtServ();
        window.alert("Se Actualizo Correctamente");
      });
    }
  }

  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
  }

}


