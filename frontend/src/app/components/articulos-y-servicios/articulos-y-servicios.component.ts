import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'

@Component({
  selector: 'app-articulos-y-servicios',
  templateUrl: './articulos-y-servicios.component.html',
  styleUrls: ['./articulos-y-servicios.component.css'],
  providers: [ArticuloServicioService]
})
export class ArticulosYServiciosComponent implements OnInit {

  constructor( public articuloServicioService: ArticuloServicioService ) { }
  monstrar = true;
  ver = true;
  filterpost = '';
  
  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeArtServ();
  }
  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }
  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
                                
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
        this.monstrar=!this.monstrar;
      });
    }
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.articuloServicioService.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeArtServ();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }

}
