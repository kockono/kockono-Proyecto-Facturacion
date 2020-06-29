import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmpresaService2 } from '../../services/datos-fact.service';
import { DatosEmisor } from '../../models/datos-emisor';
import { DatosFact } from '../../models/datos-fact';


import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [DatosEmpresaService, DatosEmpresaService2],
})
export class ClientesComponent implements OnInit {

  pageActual: number=1;



  createFormGroup() {

    return new FormGroup({
      _id: new FormControl(''),
      nombreDeLaEmpresa: new FormControl('', [Validators.required, ]),
      metodo: new FormControl('', [Validators.required]),
      razon: new FormControl('', [Validators.required,]),
      estatus: new FormControl('', [Validators.required,]),
      dias: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      calle: new FormControl('', [Validators.required,]),
      colonia: new FormControl('', [Validators.required,]),
      estado: new FormControl('', [Validators.required,]),
      numExterior: new FormControl('', [Validators.required]),
      numInterior: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required,]),
      municipio: new FormControl('', [Validators.required,]),
      pais: new FormControl('', [Validators.required,]),
      localidad: new FormControl('', [Validators.required,]),
      telefono: new FormControl('', [Validators.required]),
      


    });
  }

  empresaForm : FormGroup;
  constructor(public datosEmpresaService: DatosEmpresaService, public datosEmpresaService2: DatosEmpresaService2) {

    this.empresaForm = this.createFormGroup();
   }
  filterpost = '';

  monstrar = true;
  ver = true;
  fact = true;
  
  ngOnInit(){
    this.resetForm();
    this.resetForm2();
    this.refrescarListaDeEmpresa();
    this.refrescarListaDeEmpresa2();
  }
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisor[];
    });
  }
  refrescarListaDeEmpresa2() {
    this.datosEmpresaService2.getDatosList().subscribe((res) => {
        this.datosEmpresaService2.DatosEmpresa = res as DatosFact[];
    }); 
  }
  onEdit(emp: DatosEmisor) {
    this.datosEmpresaService.selectEmpresa = emp;
  }
  

  resetForm() {
    if(this.empresaForm)
    this.empresaForm.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      nombreDeLaEmpresa: "",
      email: "",
      calle: "",
      colonia: "",
      estado: "",
      metodo:"",
      estatus:"",
      razon:"",
      dias:null,
      numExterior: "",
      numInterior: "",
      cp: "",
      rfc: "",
      municipio: "",
      pais: "",
      localidad: "",
      telefono: null,
      backup: true
    }
  }
  resetForm2() {
    if(this.empresaForm)
    this.empresaForm.reset();
    this.datosEmpresaService2.selectEmpresa = {
      _id: '',
      nombreDeLaEmpresa: '',
      metodo:'',
      forma:'',
      cfdi:'',
      estatus:'',
      razon:'',
      fecha:'',
      monto:null,
      folio:null,
      /* Nuevos campos agregados en base a la factura ejemplo */
      ordenDeCompra: '',
      condiciones: '',	
      vendedor: '',
      viaDeEmbarque: '',
      unidades:null,
      articulo: '',	
      nombre: '',
      precio:null,
      descuento:null,
      uMed: '',
      importe:null,	
      subtotal:null,
      total:null,
      iva:null,
      artarr:[null],
      fechaExpir:'',
      dineroRest:null,
      abono:null
    }
  }
  onSubmit(){
    if(this.empresaForm.valid){
      if(this._id.value == ""){
      this.datosEmpresaService.postDatos(this.empresaForm.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService.putDatos(this.empresaForm.value).subscribe((res)=>{
        this.resetForm();
        this.refrescarListaDeEmpresa();
        this.monstrar = !this.monstrar;
        window.alert("Se Actualizo Correctamente");
      });
    }
  }else{
    window.alert("Verifique que la informacion este correcta");

  }
}
  onDelete(emp: DatosEmisor) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.datosEmpresaService.deleteDato(emp._id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }

get _id() {return this.empresaForm.get('_id');}
get nombreDeLaEmpresa() {return this.empresaForm.get('nombreDeLaEmpresa');}
get metodo() {return this.empresaForm.get('metodo');}
get razon() {return this.empresaForm.get('razon');}
get estatus() {return this.empresaForm.get('estatus');}
get dias() {return this.empresaForm.get('dias');}
get email() {return this.empresaForm.get('email');}
get calle() {return this.empresaForm.get('calle');}
get colonia() {return this.empresaForm.get('colonia');}
get estado() {return this.empresaForm.get('estado');}
get numExterior() {return this.empresaForm.get('numExterior');}
get numInterior() {return this.empresaForm.get('numInterior');}
get cp() {return this.empresaForm.get('cp');}
get rfc() {return this.empresaForm.get('rfc');}
get municipio() {return this.empresaForm.get('municipio');}
get pais() {return this.empresaForm.get('pais');}
get localidad() {return this.empresaForm.get('localidad');}
get telefono() {return this.empresaForm.get('telefono');}
get backup() {return this.empresaForm.get('backup');}
}
