import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatosMiEmpresa } from '../models/datos-mi-empresa';
@Injectable({
  providedIn: 'root'
})
export class DatosMiEmpresaService {

    selectEmpresa: DatosMiEmpresa;
    DatosEmpresa: DatosMiEmpresa[];
  
    readonly URL = 'http://localhost:3500/datos-mi-empresa'
  
    constructor(private http: HttpClient) { }
  
    postDatos(emp: DatosMiEmpresa){
      return this.http.post(this.URL, emp)
    }
    getDatosList(){
      return this.http.get(this.URL);
    }
  
    putDatos(emp: DatosMiEmpresa) {
      return this.http.put(this.URL + `/${emp._id}`, emp);
    }
    deleteDato(_id: string){
      return this.http.delete(this.URL + `/${_id}`);
    }
}
