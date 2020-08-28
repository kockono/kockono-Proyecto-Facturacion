import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo } from '../models/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  readonly URL = 'http://localhost:3500/catalogo';

  info: any = [];

  selectCatalogo: Catalogo;
  DatosCatalogo: Catalogo[];

  constructor(private http: HttpClient) {
    this.http.get(this.URL).subscribe((resp: any) => {
      this.info = resp;
    });
  }
  postDatos(catalago: any) {
    return this.http.post(this.URL, catalago);
  }

  getDatosList() {
    return this.http.get(this.URL);
  }

  putDatos(cat: Catalogo) {
    return this.http.put(this.URL + `/${cat._id}`, cat);
  }
  deleteDato(id: string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
