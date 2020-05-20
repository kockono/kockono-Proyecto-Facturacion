import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-prov.service';
import { DatosEmisorProv } from '../../models/datos-emisor-prov';

@Component({
  selector: 'app-prov',
  templateUrl: './prov.component.html',
  styleUrls: ['./prov.component.css'],
  providers: [DatosEmpresaService]
})
export class ProvComponent implements OnInit {

  constructor(public datosEmpresaService: DatosEmpresaService) { }
  monstrar = true;
  ver = true;
  
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
  
  resetForm(form?: NgForm) {
    if(form)
      form.reset();
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
  
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService.postDatos(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        console.log(this.datosEmpresaService.selectEmpresa.nombreDeLaEmpresa);
        window.alert("Se Guardo Correctamente");
        // window.location.reload();
      });
    }else{
      this.datosEmpresaService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
        
        this.monstrar=!this.monstrar;
      });
    }
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.datosEmpresaService.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }
}

