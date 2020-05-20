import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosFact } from '../models/datos-fact';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService2 {

  selectEmpresa: DatosFact;
  DatosEmpresa: DatosFact[];

  readonly URL = 'http://localhost:3500/emisor-fact'

  constructor(private http: HttpClient) { }

  postDatos(emp: DatosFact){
    return this.http.post(this.URL, emp)
  }
  getDatosList(){
    return this.http.get(this.URL);
  }

  putDatos(emp: DatosFact) {
    return this.http.put(this.URL + `/${emp._id}`, emp);
  }
  deleteDato(_id: string){
    return this.http.delete(this.URL + `/${_id}`);
  }
}
