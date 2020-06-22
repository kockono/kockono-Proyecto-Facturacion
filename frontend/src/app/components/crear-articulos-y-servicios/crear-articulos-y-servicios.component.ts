/*import { Component, OnInit } from '@angular/core';
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
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-articulos-y-servicios',
  templateUrl: './crear-articulos-y-servicios.component.html',
  styleUrls: ['./crear-articulos-y-servicios.component.css']
})
export class CrearArticulosYServiciosComponent implements OnInit {

  createFormGroup() {

    return new FormGroup({
      _id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, ]),
      precio: new FormControl('', [Validators.required]),
      articuloServicio: new FormControl('', [Validators.required,]),
      uMed: new FormControl(''),
      unidadTipo: new FormControl('', [Validators.required,]),
      unidadSubtipo:new FormControl('', [Validators.required,]),
      unidadCodigo:new FormControl(''),
      unidad:new FormControl('', [Validators.required,]),
      productoTipo:new FormControl('', [Validators.required,]),
      productoDivision:new FormControl('', [Validators.required,]),
      productoGrupo:new FormControl('', [Validators.required,]),
      productoClase:new FormControl('', [Validators.required,]),
     
      


    });
  }
  ArtServForm : FormGroup;
  constructor(private router: Router, public articuloServicioService: ArticuloServicioService ) {
    this.ArtServForm = this.createFormGroup();
   }

  ngOnInit() {
    this.resetForm();
    this.refrescarListaDeArtServ();
  }

  resetForm() {
    if(this.ArtServForm)
    this.ArtServForm.reset();
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

  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }

  onSubmit(){
      if(this.ArtServForm.valid){
      if(this._id.value == ""){
      this.articuloServicioService.postDatos(this.ArtServForm.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        window.alert("Se Guardo Correctamente");
        
        this.router.navigateByUrl('/articulos-y-servicios');
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(this.ArtServForm.value).subscribe((res)=>{
        this.resetForm();
        this.refrescarListaDeArtServ();
        window.alert("Se Actualizo Correctamente");
      });
    }
  }else{
    window.alert("Verifique que la informacion este correcta");
  }
  }

  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
  }

  get _id() {return this.ArtServForm.get('_id');}
  get articuloServicio() {return this.ArtServForm.get('articuloServicio');}
  get nombre() {return this.ArtServForm.get('nombre');}
  get precio() {return this.ArtServForm.get('precio');}
  get uMed() {return this.ArtServForm.get('uMed');}
  get unidadTipo() {return this.ArtServForm.get('unidadTipo');}
  get unidadSubtipo() {return this.ArtServForm.get('unidadSubtipo');}
  get unidadCodigo() {return this.ArtServForm.get('unidadCodigo');}
  get unidad() {return this.ArtServForm.get('unidad');}
  get productoTipo() {return this.ArtServForm.get('productoTipo');}
  get productoDivision() {return this.ArtServForm.get('productoDivision');}
  get productoGrupo() {return this.ArtServForm.get('productoGrupo');}
  get  productoClase() {return this.ArtServForm.get('productoClase');}
 
}