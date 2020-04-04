import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosEmpresa } from '../models/datos-empresa';
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  selectEmpresa: DatosEmpresa;
  DatosEmpresa: DatosEmpresa[];

  readonly baseURL = 'http://localhost:3500/Empresa'

  constructor(private http: HttpClient) { }

  postEmpleado(emp: DatosEmpresa){
    return this.http.post(this.baseURL, emp)
  }
  getEmpleadoList(){
    return this.http.get(this.baseURL);
  }

  putEmpleado(emp: DatosEmpresa) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }
  // deleteEmpleado(_id: string){
  //   return this.http.delete(this.baseURL + `/${_id}`);
  // }
}
