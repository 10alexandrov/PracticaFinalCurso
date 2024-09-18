import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icategoria } from '../interfaces/icategoria';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriaUrl = 'http://localhost:8080/api/categorias'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategorias (): Observable<Icategoria[]> {

    const token = this.authService.getToken(); // Извлекаем токен из localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Устанавливаем заголовок
    });

    if (this.authService.checkTokenExpiration()) {
    return this.http.get<Icategoria[]>(this.categoriaUrl, {headers} ).pipe(
      map(response => response)
    );
    } else {
      return EMPTY;
    }
  }
}
