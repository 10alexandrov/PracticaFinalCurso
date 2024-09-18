import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = 'http://localhost:8080/api/productos'

  constructor(private http: HttpClient, private authService: AuthService) {}
/*
  getProductos (): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map(response => response)
    );
  }*/

    getProductos (): Observable<IProduct[]> {

      const token = this.authService.getToken(); // Извлекаем токен из localStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Устанавливаем заголовок
      });

      if (this.authService.checkTokenExpiration()) {
        return this.http.get<IProduct[]>(this.productUrl, { headers }).pipe(
          map(response => response)
        );
      } else {
        return EMPTY;
      }
    }

}
