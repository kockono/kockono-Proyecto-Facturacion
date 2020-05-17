import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosEmisor } from '../models/datos-emisor';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  selectEmpresa: DatosEmisor;
  DatosEmpresa: DatosEmisor[];

  readonly URL = 'http://localhost:3500/emisor'

  constructor(private http: HttpClient) { }

  postDatos(emp: DatosEmisor){
    return this.http.post(this.URL, emp)
  }
  getDatosList(){
    return this.http.get(this.URL);
  }

  putDatos(emp: DatosEmisor) {
    return this.http.put(this.URL + `/${emp._id}`, emp);
  }
  deleteDato(_id: string){
    return this.http.delete(this.URL + `/${_id}`);
  }
}
