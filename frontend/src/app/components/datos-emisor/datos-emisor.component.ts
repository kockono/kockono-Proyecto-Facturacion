import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosEmisor } from '../../models/datos-emisor';

@Component({
  selector: 'app-datos-emisor',
  templateUrl: './datos-emisor.component.html',
  styleUrls: ['./datos-emisor.component.css']
})
export class DatosEmisorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
