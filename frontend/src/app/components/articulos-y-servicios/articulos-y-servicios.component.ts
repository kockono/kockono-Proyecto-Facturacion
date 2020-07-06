import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosEmisor } from 'src/app/models/datos-emisor';

@Component({
  selector: 'app-articulos-y-servicios',
  templateUrl: './articulos-y-servicios.component.html',
  styleUrls: ['./articulos-y-servicios.component.css'],
  providers: [ArticuloServicioService]
})
export class ArticulosYServiciosComponent implements OnInit {
  pageActual: number=1;

  createFormGroup() {

    return new FormGroup({
      _id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, ]),
      precio: new FormControl('', [Validators.required]),
      articuloServicio: new FormControl('', [Validators.required,]),
      uMed: new FormControl(''),
      unidadTipo: new FormControl('', [Validators.required,]),
      unidadSubtipo:new FormControl('', [Validators.required,]),
      unidadCodigo:new FormControl('',),
      unidad:new FormControl('', [Validators.required,]),
      productoTipo:new FormControl('', [Validators.required,]),
      productoDivision:new FormControl('', [Validators.required,]),
      productoGrupo:new FormControl('', [Validators.required,]),
      productoClase:new FormControl('', [Validators.required,]),
      
     
      


    });
  }
  ArtServForm : FormGroup;

  constructor( public articuloServicioService: ArticuloServicioService ) {

    this.ArtServForm = this.createFormGroup();
   }
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
      productoClase:""
    }
  }
  
  onSubmit(form: NgForm){
    if(this.ArtServForm.valid){
      if(this._id.value == ""){
      this.articuloServicioService.postDatos(this.ArtServForm.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        window.alert("Se Guardó Correctamente");
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(this.ArtServForm.value).subscribe((res)=>{
        this.resetForm();
        this.refrescarListaDeArtServ();
        window.alert("Se Actualizó Correctamente");
        this.monstrar=!this.monstrar;
      });
    }

  }else{
  window.alert("Verifique que la informacion esté correcta");
}
}
  onDelete(emp:DatosEmisor) {
    if (confirm('¿Estás Seguro que deseas eliminarlo?') == true) {
      this.articuloServicioService.deleteDato(emp._id).subscribe((res) =>{
        this.refrescarListaDeArtServ();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
    
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
  get productoClase() {return this.ArtServForm.get('productoClase');}

}

