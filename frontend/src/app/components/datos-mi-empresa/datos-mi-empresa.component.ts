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
  monstrar = true;
  ver = true;
  filterpost = '';
  
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
        // window.location.reload();
      });
    }else{
      this.datosMiEmpresaService.putDatos(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        window.alert("Se Actualizo Correctamente");
        this.monstrar=!this.monstrar;
      });
    }
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.datosMiEmpresaService.deleteDato(_id).subscribe((res) =>{
        this.refrescarListaDeEmpresa();
        // this.resetForm(form);
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }

}




