import { DatosEmpresa } from './../../models/datos-empresa';
import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-empresa.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DatosEmpresaService]

})
export class FormularioComponent implements OnInit {

  constructor(public datosEmpresaService: DatosEmpresaService) { }

  ngOnInit(){
    
    this.resetForm();
    this.refrescarListaDeEmpresa();
  }


  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.datosEmpresaService.selectEmpresa = {
      _id: "",
      email: "",
      nombreDeLaEmpresa: "",
      calle: "",
      colonia: "",
      estado: "",
      lugarExpedicion:  "",
      descripcion: "",
      valorUnitario: "",
      importe: "",
      folio: "",
      numExterior: "",
      cp: "",
      rfc: "",
      municipio: "",
      fechaEmision: "",
      cantidad: "",
      importeConLetra: "",
      metodoPago: "",
      pais: "",
      telefono: null,
      unidad: "",
      backup: true
    }
    
  }
  
  refrescarListaDeEmpresa() {
    this.datosEmpresaService.getEmpleadoList().subscribe((res) => {
        this.datosEmpresaService.DatosEmpresa = res as DatosEmpresa[];
    });
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.datosEmpresaService.postEmpleado(form.value).subscribe((res) => {
        this.refrescarListaDeEmpresa();
        // M.toast({html: 'Se Guardo Correctamente', classes: 'rounded'});
        window.location.reload();
      });
    }else{
      this.datosEmpresaService.putEmpleado(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refrescarListaDeEmpresa();
        // M.toast({html: 'Se Actualizo Correctamente', classes: 'rounded'})
      });
    }

  }

}
