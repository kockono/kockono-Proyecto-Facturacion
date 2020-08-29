import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloServicioService } from '../../services/articulos-y-servicios.service'
import { ArticuloServicio } from '../../models/articulos-y-servicios'
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../models/catalogo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosEmisor } from 'src/app/models/datos-emisor';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-articulos-y-servicios',
  templateUrl: './articulos-y-servicios.component.html',
  styleUrls: ['./articulos-y-servicios.component.css'],
  providers: [ArticuloServicioService]
})
export class ArticulosYServiciosComponent implements OnInit {
  pageActual: number=1;
 
  clav:number;


  constructor( public articuloServicioService: ArticuloServicioService, private _snackBar: MatSnackBar, public catalogoService: CatalogoService ) {

    
   }
  monstrar = true;
  ver = true;
  filterpost = '';



  nom="";
  cla="";
  tip="";
  
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
  
  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeArtServ();
    this.refrescarCatalogos();
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
      unidadTipo:"",
      unidadSubtipo:"",
      unidadCodigo:"",
      unidad:"",
      productoTipo: "",
      productoDivision:"",
      productoGrupo:"",
      productoClase:"",
      productoClave:null
    }
  }


  refrescarListaDeArtServ() {
    this.articuloServicioService.getDatosList().subscribe((res) => {
        this.articuloServicioService.DatosArtServ = res as ArticuloServicio[];
    });
  }

  refrescarCatalogos() {
    this.catalogoService.getDatosList().subscribe((res) => {
      this.catalogoService.DatosCatalogo = res as Catalogo[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      form.value.unidadTipo=this.nom;
      form.value.unidadSubtipo=this.tip;
      form.value.unidadCodigo=this.cla;

      form.value.productoClave=this.clav;
      this.articuloServicioService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeArtServ();
        console.log(this.articuloServicioService.selectArtServ.articuloServicio);
        this.openSnackBar('Se Guardo Correctamente', 'End');
        
        //this.router.navigateByUrl('/articulos-y-servicios');
        // window.location.reload();
      });
    }else{
      this.articuloServicioService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeArtServ();
        this.openSnackBar('Se Actualizo Correctamente', 'End');
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
        this.openSnackBar('Eliminado Correctamente', 'End' );
        
      });
    }
    
  }

  getTipo(tipo: string, form: NgForm) {
    form.value.productoTipo = tipo;
  }
  getDivision(div: string, form: NgForm){
    form.value.productoDivision=div;
  }
  getGrupo(gpo: string, form: NgForm){
    form.value.productoGrupo=gpo;
  }
  getClase(clas: string, form: NgForm){
    form.value.productoClase=clas;
    for (let cat of this.catalogoService.info) {
      if (clas == cat.clase) {
        this.clav = cat.clave;
      }
    }
  }


}//cierra todo

