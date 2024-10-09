import { Injectable } from '@angular/core';


import { Iestadistica } from '../interfaces/iestadistica';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  private estadUrl = 'http://localhost:8080/api/estadistica'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEstadistica (): Observable<Iestadistica> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<Iestadistica>(this.estadUrl, {headers}).pipe (
        map(response => {
          if (Array.isArray(response)) {
            return response[0];  // Возвращаем первый элемент массива, если это массив
          }
          return response;  // Если это объект, возвращаем объект
        })
      );
    } else {
      return EMPTY;
    }
  }

  getEstadisticaPorFecha(fecha: String): Observable<Iestadistica> {
    const headers = this.getHeaderAuth ();
    const id = this.formatDateToDDMMYYYY(fecha);

    const urlConFecha = `http://localhost:8080/api/estadistica/${id}`;

    console.log(urlConFecha);

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<Iestadistica>(urlConFecha, {headers}).pipe (
        map(response => {
          if (Array.isArray(response)) {
            return response[0];  // Возвращаем первый элемент массива, если это массив
          }
          return response;  // Если это объект, возвращаем объект
        })
      );
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

  // Date -> id para obter estadistica por fecha

  formatDateToDDMMYYYY(date: String): number {

      const dateParts = date.split('-');

      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return parseInt(`${day}${month}${year}`, 10);

    }

}
