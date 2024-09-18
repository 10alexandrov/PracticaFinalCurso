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

    const token = this.authService.getToken(); // Извлекаем токен из localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Устанавливаем заголовок
    });

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<IFactura[]>(this.facturaUrl, {headers}).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }
}
