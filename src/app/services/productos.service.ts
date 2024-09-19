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
export class ProductosService {

  private productUrl = 'http://localhost:8080/api/productos'

  constructor(private http: HttpClient, private authService: AuthService) {}

    getProductos (): Observable<IProduct[]> {

      const headers = this.getHeaderAuth ();

      if (this.authService.checkTokenExpiration()) {
        return this.http.get<IProduct[]>(this.productUrl, { headers }).pipe(
          map(response => response)
        );
      } else {
        return EMPTY;
      }
    }


    deleteProducto (id: number): Observable<void> {

      const headers = this.getHeaderAuth ();

      const deleteURL = `http://localhost:8080/api/productos/${id}`;
      if (this.authService.checkTokenExpiration()) {
          return this.http.delete<void>(deleteURL, { headers });
      } else {
          return EMPTY;
      }
    }

    createProducto (product: IProduct): Observable<any> {

      const headers = this.getHeaderAuth ();
      if (this.authService.checkTokenExpiration()) {
        return this.http.post(this.productUrl, product, { headers});
      } else {
        return EMPTY;
      }
    }


    getHeaderAuth (): HttpHeaders {  // creamos header para authenticacion
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

}

