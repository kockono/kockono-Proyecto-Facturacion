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



  constructor( public articuloServicioService: ArticuloServicioService ) {

    
   }
  monstrar = true;
  ver = true;
  filterpost = '';



  nom="";
  cla="";
  tip="";
  
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
  
  
  
  unidades2 =
  [
    {
      Tipo: "Multiplos / Fracciones / Decimales",
      Clave: "H87",
      Nombre: "Pieza"
    },
    {
      Tipo: "Unidades de venta",
      Clave: "EA",
      Nombre: "Elemento"
    },
    {
      Tipo: "Unidades especificas de la industria (varias)",
      Clave: "E48",
      Nombre: "Unidad de Servicio"
    },
    {
      Tipo: "Unidades de venta",
      Clave: "ACT",
      Nombre: "Actividad"
    },
    {
      Tipo: "Mecanica",
      Clave: "KGM",
      Nombre: "Kilogramo"
    },
    {
      Tipo: "Unidades especificas de la industria (varias)",
      Clave: "E51",
      Nombre: "Trabajo"
    },
    {
      Tipo: "Diversos",
      Clave: "A9",
      Nombre: "Tarifa"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "MTR",
      Nombre: "Metro"
    },
    {
      Tipo: "Diversos",
      Clave: "AB",
      Nombre: "Paquete a granel"
    },
    {
      Tipo: "Unidades especificas de la industria (varias)",
      Clave: "BB",
      Nombre: "Caja base"
    },
    {
      Tipo: "Unidades de venta",
      Clave: "KT",
      Nombre: "Kit"
    },
    {
      Tipo: "Unidades de venta",
      Clave: "SET",
      Nombre: "Conjunto"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "LTR",
      Nombre: "Litro"
    },
    {
      Tipo: "Unidades de empaque",
      Clave: "XBX",
      Nombre: "Caja"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "MON",
      Nombre: "Mes"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "HUR",
      Nombre: "Hora"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "MTK",
      Nombre: "Metro cuadrado"
    },
    {
      Tipo: "Diversos",
      Clave: "11",
      Nombre: "Equipos"
    },
    {
      Tipo: "Mecanica",
      Clave: "MGM",
      Nombre: "Miligramo"
    },
    {
      Tipo: "Unidades de empaque",
      Clave: "XPK",
      Nombre: "Paquete"
    },
    {
      Tipo: "Unidades de empaque",
      Clave: "XKI",
      Nombre: "Kit (Conjunto de piezas)"
    },
    {
      Tipo: "Diversos",
      Clave: "AS",
      Nombre: "Variedad"
    },
    {
      Tipo: "Mecanica",
      Clave: "GRM",
      Nombre: "Gramo"
    },
    {
      Tipo: "Numeros enteros / Numeros / Ratios",
      Clave: "PR",
      Nombre: "Par"
    },
    {
      Tipo: "Unidades de venta",
      Clave: "DPC",
      Nombre: "Docenas de piezas"
    },
    {
      Tipo: "Unidades de empaque",
      Clave: "xun",
      Nombre: "Unidad"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "DAY",
      Nombre: "Día"
    },
    {
      Tipo: "Unidades de empaque",
      Clave: "XLT",
      Nombre: "Lote"
    },
    {
      Tipo: "Diversos",
      Clave: "10",
      Nombre: "Grupos"
    },
    {
      Tipo: "Tiempo y Espacio",
      Clave: "MLT",
      Nombre: "Mililitro"
    },
    {
      Tipo: "Unidades especificas de la industria (varias)",
      Clave: "E54",
      Nombre: "Viaje"
    }
    
  ];
      
  ore(tipose: string, form: NgForm){
    for(let emp of this.unidades2){
      if(tipose==emp.Nombre){
        this.cla=emp.Clave;
        this.tip=emp.Tipo;
        this.nom=emp.Nombre;
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


  
  ngOnInit(){
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
      form.value.unidadTipo=this.nom;
      form.value.unidadSubtipo=this.tip;
      form.value.unidadCodigo=this.cla;
      this.articuloServicioService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        window.alert("Se Guardó Correctamente");
        
        //this.router.navigateByUrl('/articulos-y-servicios');
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeArtServ();
        window.alert("Se Actualizó Correctamente");
        this.monstrar=!this.monstrar
      });
    }
  }

  onEdit(emp: ArticuloServicio) {
    this.articuloServicioService.selectArtServ = emp;
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



}

