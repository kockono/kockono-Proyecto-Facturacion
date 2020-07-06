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
  

parents="";
parents2="";
parents3="";

sparents="";
sparents2="";
sparents3="";
sparents4="";

productooserv=[
  {
    Nombre:"Producto",
    Desc:"",
    Parent:null
  },
  {
    Nombre:"Alimentos, Bebidas y Tabaco",
    Desc:"",
    Parent:"Producto"
  },
  {
    Nombre:"Aceites y grasas comestibles",
    Desc:"",
    Parent:"Alimentos, Bebidas y Tabaco"
  },
  {
    Nombre:"50151600 - Grasas y aceites animales comestibles",
    Desc:"",
    Parent:"Aceites y grasas comestibles"
  },
  {
    Nombre:"50151500 - Grasas y aceites vegetales comestibles",
    Desc:"",
    Parent:"Aceites y grasas comestibles"
  },
  {
    Nombre:"Alimentos preparados y conservados",
    Desc:"",
    Parent:"Alimentos, Bebidas y Tabaco"
  },
  {
    Nombre:"50191500 - Sopas y estofados",
    Desc:"",
    Parent:"Alimentos preparados y conservados"
  },
  {
    Nombre:"50192100 - Botanas",
    Desc:"",
    Parent:"Alimentos preparados y conservados"
  },


  {
    Nombre:"Servicio",
    Desc:"",
    Parent:null
  },
  {
    Nombre:"Organizaciones y Clubes",
    Desc:"",
    Parent:"Servicio"
  },
  {
    Nombre:"Clubes",
    Desc:"",
    Parent:"Organizaciones y Clubes"
  },
  {
    Nombre:"94121500 - Clubes deportivos",
    Desc:"",
    Parent:"Clubes"
  },
  {
    Nombre:"94121600 - Clubes de hobbies (Membresías)",
    Desc:"",
    Parent:"Clubes"
  },
  {
    Nombre:"Organizaciones laborales",
    Desc:"",
    Parent:"Organizaciones y Clubes"
  },
  {
    Nombre:"94101500 - Asociaciones de negocios",
    Desc:"",
    Parent:"Organizaciones laborales"
  },
  {
    Nombre:"94101600 - Asociaciones profesionales",
    Desc:"",
    Parent:"Organizaciones laborales"
  }
];



unidades2=
[
  {
    Nombre:"Acústica",
    Desc:"",
    parent:null
  },
    { Nombre:"Decremento logarítmico",
      Desc:"",
      parent:"Acústica"
    },
      { Nombre:"P41",
        Desc:"Década (logarítmica)",
        parent:"Decremento logarítmico"
      },
      
    { Nombre:"Densidad de energía sonora, Volumétrica, energía de sonido",
      Desc:"",
      parent:"Acústica"
    },
      { Nombre:"A60",
        Desc:"Erg por centímetro cúbico",
        parent:"Densidad de energía sonora, Volumétrica, energía de sonido"
      },
    { Nombre:"Densidad superficial de la impedancia mecánica",
      Desc:"",
      parent:"Acústica"
    },
      { Nombre:"A50",
        Desc:"Dina segundo por centímetro cúbico",
        parent:"Densidad superficial de la impedancia mecánica"
      },


    { Nombre:"Exposición al sonido",
      Desc:"",
      parent:"Acústica"
    },
      { Nombre:"P42",
        Desc:"Pascal por segundo cuadrado",
        parent:"Exposición al sonido"
      },
  { Nombre:"Impedancia acústica",
    Desc:"",
    parent:"Acústica"
  },
      { Nombre:"A52",
        Desc:"Dina segundo por centímetro a la quinta potencia",
        parent:"Impedancia acústica"
      },
      { Nombre:"M32",
        Desc:"Segundos pascal por litro",
        parent:"Impedancia acústica"
      },
      { Nombre:"C66 ",
        Desc:"Segundos pascal por metro cúbico",
        parent:"Impedancia acústica"
      },

  
  {
    Nombre:"Calor",
    Desc:"",
    parent:null
  },
  { Nombre:"SubCalor 1",
    Desc:"",
    parent:"Calor"
  },
  { Nombre:"c1",
    Desc:"1",
    parent:"SubCalor 1"
  },
  { Nombre:"SubCalor 2",
    Desc:"",
    parent:"Calor"
  },
  { Nombre:"c2",
    Desc:"2",
    parent:"SubCalor 2"
  },
  { Nombre:"SubCalor 3",
    Desc:"",
    parent:"Calor"
  },
  { Nombre:"c3",
    Desc:"3",
    parent:"SubCalor 3"
  },
  { Nombre:"c4",
    Desc:"4",
    parent:"SubCalor 3"
  }
  
];
    
ore(ll: string, form: NgForm){
  this.parents=ll
}
ore2(ll: string, form: NgForm){
  this.parents2=ll
}
ore3(ll: string, form: NgForm){
  for(let emp of this.unidades2){
    if(ll==emp.Desc){
      this.parents3=emp.Nombre;
      break;
    }
  }
}
sore(ll: string, form: NgForm){
  this.sparents=ll
}
sore2(ll: string, form: NgForm){
  this.sparents2=ll
}
sore3(ll: string, form: NgForm){
  this.sparents3=ll
}
sore4(ll: string, form: NgForm){
      this.sparents4=ll;
}
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
      uMed: "",
      unidadTipo:"",
      unidadSubtipo:"",
      unidadCodigo:"",
      unidad:"",
      productoTipo: "",
      productoDivision:"",
      productoGrupo:"",
      productoClase:""
    }
  }

  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      form.value.unidadCodigo=this.parents3.toString();
      this.articuloServicioService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        window.alert("Se Guardó Correctamente");
        
        this.router.navigateByUrl('/articulos-y-servicios');
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeArtServ();
        window.alert("Se Actualizó Correctamente");
      });
    }
  }

  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
  }

}
