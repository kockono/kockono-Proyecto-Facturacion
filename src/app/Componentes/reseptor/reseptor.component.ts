import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../services/autentificacion.service';

@Component({
  selector: 'app-reseptor',
  templateUrl: './reseptor.component.html',
  styleUrls: ['./reseptor.component.css']
})
export class ReseptorComponent implements OnInit {
  datosreseptor = {Nombre:'', RFC:'', Estatus: '', NumSerie:'', Calle:'', Colonia:'', NumInt:'',NumExt:'',CodigoPostal:'',Municipio:'',Localidad:'',Estado:'',RazonS:''}
  constructor(private aut: AutentificacionService) { }
  reseptor()
  {
    this.aut.reseptor(this.datosreseptor).subscribe(res=>{
      console.log(res)
    })
  }
  ngOnInit(): void {
  }

}
