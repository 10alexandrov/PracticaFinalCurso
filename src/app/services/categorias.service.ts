import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Icategoria } from '../interfaces/icategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriaUrl = 'http://localhost:8080/api/categorias'

  constructor(private http: HttpClient) {}

  getCategorias (): Observable<Icategoria[]> {
    return this.http.get<Icategoria[]>(this.categoriaUrl).pipe(
      map(response => response)
    );
  }
}
