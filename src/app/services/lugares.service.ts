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
export class LugaresService {

  private lugarUrl = 'http://almacen-admin/api/lugares';

  constructor(private http: HttpClient, private authService: AuthService) { }


  getLugares (): Observable<any> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      console.log('read');
      return this.http.get(this.lugarUrl, { headers});
    } else {
      console.log('not read');
      return EMPTY;
    }
  }


  getLugar (id: number): Observable<any> {

    const headers = this.getHeaderAuth ();
    const urlConId = `${this.lugarUrl}/${id}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('read');
      return this.http.get(urlConId, { headers});
    } else {
      console.log('not read');
      return EMPTY;
    }
  }

  cambiarLugares(firstCelda: number, secondCelda: number): Observable<any> {

    const headers = this.getHeaderAuth ();
    const body = {firstCelda, secondCelda};
    const urlConId = `${this.lugarUrl}/cambiar`;

    if (this.authService.checkTokenExpiration()) {
      console.log('read');
      return this.http.put(urlConId, body, { headers});
    } else {
      console.log('not read');
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
