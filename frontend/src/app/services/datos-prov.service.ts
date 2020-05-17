import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosEmisorProv } from '../models/datos-emisor-prov';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  selectEmpresa: DatosEmisorProv;
  DatosEmpresa: DatosEmisorProv[];

  readonly URL = 'http://localhost:3500/emisor-prov'

  constructor(private http: HttpClient) { }

  postDatos(emp: DatosEmisorProv){
    return this.http.post(this.URL, emp)
  }
  getDatosList(){
    return this.http.get(this.URL);
  }

  putDatos(emp: DatosEmisorProv) {
    return this.http.put(this.URL + `/${emp._id}`, emp);
  }
  deleteDato(_id: string){
    return this.http.delete(this.URL + `/${_id}`);
  }
}
