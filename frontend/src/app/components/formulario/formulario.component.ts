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

  constructor() { }

  ngOnInit(){
    

  }

}
