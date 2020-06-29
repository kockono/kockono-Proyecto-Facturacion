import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-prov.service';
import { DatosEmisorProv } from '../../models/datos-emisor-prov';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosEmisor } from 'src/app/models/datos-emisor';

@Component({
  selector: 'app-prov',
  templateUrl: './prov.component.html',
  styleUrls: ['./prov.component.css'],
  providers: [DatosEmpresaService]
})
export class ProvComponent implements OnInit {

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

  constructor(public datosEmpresaService: DatosEmpresaService) {
    this.empresaForm = this.createFormGroup();
   }

  monstrar = true;
  ver = true;
  filterpost = '';
  
  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getDatosList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmisorProv[];
    });
  }
  onEdit(emp: DatosEmisorProv) {
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
        window.alert("Se Actualizo Correctamente");
        this.monstrar=!this.monstrar;
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
}