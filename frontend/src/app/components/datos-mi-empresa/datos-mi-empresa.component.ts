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
  mostrar= false;

  
  TodosDatos= {
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
  };

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
  
  onEnvioDatosEmpresa(){
        this.datosMiEmpresaService.postDatos(this.TodosDatos).subscribe();
        window.alert("Se Guardo Correctamente");
}


  


}




