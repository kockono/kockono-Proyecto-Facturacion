import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ArticuloServicio } from '../models/articulos-y-servicios';
@Injectable({
  providedIn: 'root'
})
export class ArticuloServicioService {

    selectArtServ: ArticuloServicio;
    DatosArtServ: ArticuloServicio[];
  
    readonly URL = 'http://localhost:3500/articulos-y-servicios'
  
    constructor(private http: HttpClient) { }
  
    postDatos(emp: ArticuloServicio){
      return this.http.post(this.URL, emp)
    }
    getDatosList(){
      return this.http.get(this.URL);
    }
  
    putDatos(emp: ArticuloServicio) {
      return this.http.put(this.URL + `/${emp._id}`, emp);
    }
    deleteDato(_id: string){
      return this.http.delete(this.URL + `/${_id}`);
    }
}