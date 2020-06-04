import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'
@Component({
  selector: 'app-crear-articulos-y-servicios',
  templateUrl: './crear-articulos-y-servicios.component.html',
  styleUrls: ['./crear-articulos-y-servicios.component.css']
})
export class CrearArticulosYServiciosComponent implements OnInit {

  constructor(private router: Router, public articuloServicioService: ArticuloServicioService ) { }

  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeArtServ();
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
        
        this.router.navigateByUrl('/articulos-y-servicios');
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
