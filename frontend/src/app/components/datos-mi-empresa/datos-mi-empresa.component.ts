import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatosMiEmpresaService } from '../../services/datos-mi-empresa.service';
import { DatosMiEmpresa } from '../../models/datos-mi-empresa';

@Component({
  selector: 'app-datos-mi-empresa',
  templateUrl: './datos-mi-empresa.component.html',
  styleUrls: ['./datos-mi-empresa.component.css'],
  providers: [DatosMiEmpresaService]
})
export class DatosMiEmpresaComponent implements OnInit {

  constructor(public datosMiEmpresaService: DatosMiEmpresaService) { }
  editar=true;


  ngOnInit(){
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }
  refrescarListaDeEmpresa() { 
    this.datosMiEmpresaService.getDatosList().subscribe((res) => {
        this.datosMiEmpresaService.DatosEmpresa = res as DatosMiEmpresa[];
    });
  }
  onEdit(emp: DatosMiEmpresa) {
    this.datosMiEmpresaService.selectEmpresa = emp;                             
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosMiEmpresaService.selectEmpresa = {
      _id: "", 
      nombreDeLaEmpresa: "",
      ver:true,
      email: "",
      calle: "",
      numero: null,
      colonia: "",
      pais: "",
      estado: "",
      municipio: "",
      codigoPostal: null,
      rfc: ""
    }
  }



onSubmit(form: NgForm){
  if(form.value._id == ""){
    this.datosMiEmpresaService.postDatos(form.value).subscribe((res) => {
      this.refrescarListaDeEmpresa();
      console.log(this.datosMiEmpresaService.selectEmpresa.nombreDeLaEmpresa);
      window.alert("Se Guardo Correctamente");
    });
  }else{
    this.datosMiEmpresaService.putDatos(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refrescarListaDeEmpresa();
      // this.editar= !this.editar;
      window.alert("Se Actualizo Correctamente");
    });
  }
}


}
 



