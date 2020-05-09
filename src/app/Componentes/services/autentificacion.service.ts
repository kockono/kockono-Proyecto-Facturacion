import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private URL = 'http://localhost:3000/facturas/receptor';
  constructor(private http: HttpClient) 
  {
  }
  reseptor(datos){
    return this.http.post<any>(this.URL + '/', datos) 
  }
}
