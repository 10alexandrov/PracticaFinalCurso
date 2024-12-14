import { Injectable } from '@angular/core';
import { IFactura } from '../interfaces/ifactura';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private facturaUrl = 'http://localhost:8080/api/facturas'

  constructor(private http: HttpClient, private authService: AuthService) {}


  getFacturas (): Observable<IFactura[]> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<IFactura[]>(this.facturaUrl, {headers}).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }

  deleteFactura (id: number): Observable<void> {

    const headers = this.getHeaderAuth ();

    const deleteURL = `${this.facturaUrl}/${id}`;
    return this.http.delete<void>(deleteURL, {headers});
  }


  getHeaderAuth (): HttpHeaders {  // creamos header para authenticacion
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
