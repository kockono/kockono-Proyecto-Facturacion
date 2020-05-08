import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'

})

export class RecuperacionPasswordService {

  private URL = 'http://localhost:3500/recover';


  constructor(private http: HttpClient, private router: Router) { 
  }
  
  recoverPassword(recovery){
    return this.http.post<any>(this.URL + '/password', recovery);

  }
  pin(recovery){
    return this.http.post<any>(this.URL + '/correo', recovery);

  }
  correo(recovery){
    return this.http.post<any>(this.URL + '/correo', recovery);

  }

}
