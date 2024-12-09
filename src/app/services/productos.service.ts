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

  private productUrl = 'http://almacen-admin/api/productos'

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

    getProductosActivos() : Observable<IProduct[]> {    // Para obtener array con productos activos

      const headers = this.getHeaderAuth ();
      const productUrlActivos = 'http://almacen-admin/api/productos/activos'

      if (this.authService.checkTokenExpiration()) {
        return this.http.get<IProduct[]>(productUrlActivos, { headers }).pipe(
          map(response => response)
        );
      } else {
        return EMPTY;
      }
    }


    deleteProducto (id: number): Observable<void> {

      const headers = this.getHeaderAuth ();

      const deleteURL = `http://almacen-admin/api/productos/${id}`;
      if (this.authService.checkTokenExpiration()) {
          return this.http.delete<void>(deleteURL, { headers });
      } else {
          return EMPTY;
      }
    }

    createProducto (product: IProduct): Observable<any> {

      const headers = this.getHeaderAuth ();

      if (this.authService.checkTokenExpiration()) {
        console.log('grab');
        return this.http.post(this.productUrl, product, { headers});
      } else {
        console.log('no grab');
        return EMPTY;
      }
    }

    actualizarProducto (id: number, product: IProduct): Observable<any> {

      const headers = this.getHeaderAuth ();
      const urlConId = `${this.productUrl}/${id}`;

      if (this.authService.checkTokenExpiration()) {
        console.log('update');
        return this.http.put(urlConId, product, { headers});
      } else {
        console.log('no update');
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

