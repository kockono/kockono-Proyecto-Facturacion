import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosEmpresa } from '../models/datos-empresa';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  selectEmpresa: DatosEmpresa;
  DatosEmpresa: DatosEmpresa[];

  readonly URL = 'http://localhost:3500/empresa'

  constructor(private http: HttpClient) { }

  postEmpleado(emp: DatosEmpresa){
    return this.http.post(this.URL, emp)
  }
  getEmpleadoList(){
    return this.http.get(this.URL);
  }

  putEmpleado(emp: DatosEmpresa) {
    return this.http.put(this.URL + `/${emp._id}`, emp);
  }
  // deleteEmpleado(_id: string){
  //   return this.http.delete(this.URL + `/${_id}`);
  // }
}
