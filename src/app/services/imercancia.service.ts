import { Injectable } from '@angular/core';
import { IFactura } from '../interfaces/ifactura';
import { IMercancia } from '../interfaces/imercancia';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImercanciaService {

  private mercanciaUrl = 'http://localhost:8080/api/mercancias'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMercancias (id: number): Observable<IMercancia[]> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      const getURL = `http://localhost:8080/api/mercancias/${id}`;
      return this.http.get<IMercancia[]>(getURL, {headers}).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }

  deleteMercancia (id: number): Observable<void> {
    const deleteURL = `http://localhost:8080/api/mercancias/${id}`;
    return this.http.delete<void>(deleteURL);
  }


  getHeaderAuth (): HttpHeaders {  // creamos header para authenticacion
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createMercancia (mercancias: IMercancia [], f_suma: number): Observable<IMercancia[]> {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma};

    if (this.authService.checkTokenExpiration()) {
      const getURL = `http://localhost:8080/api/mercancias`;
      return this.http.post<IMercancia[]>(getURL, body, {headers}).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }


  actualizarFactura (id: number, mercancias: IMercancia [], f_suma: number): Observable<any> {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma};
    const urlConId = `${this.mercanciaUrl}/${id}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('update');
      return this.http.put(urlConId, body, { headers});
    } else {
      console.log('no update');
      return EMPTY;
    }
  }

}
