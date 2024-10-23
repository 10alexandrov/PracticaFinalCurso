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

  getMercanciasConLugares (id: number): Observable<IMercancia[]> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      const getURL = `http://localhost:8080/api/mercancias/showWidthPlace/${id}`;
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

  createMercancia (mercancias: IMercancia [], f_suma: number, role: string, usuario: number): Observable<IMercancia[]> {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma, role, usuario};

    if (this.authService.checkTokenExpiration()) {
      const getURL = `http://localhost:8080/api/mercancias`;
      return this.http.post<IMercancia[]>(getURL, body, {headers}).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }


  actualizarFactura (id: number, mercancias: IMercancia [], f_suma: number, usuario: number): Observable<any> {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma, usuario};
    const urlConId = `${this.mercanciaUrl}/${id}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('update');
      return this.http.put(urlConId, body, { headers});
    } else {
      console.log('no update');
      return EMPTY;
    }
  }

  aceptarFactura (controlarFacturaId: number, mercancias: IMercancia [], f_suma: number, usuario: number, aceptarFactura: boolean): Observable<IMercancia[]> {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma, usuario, aceptarFactura };
    const urlConId = `${this.mercanciaUrl}/aceptar/${controlarFacturaId}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('update');
      return this.http.post<IMercancia[]>(urlConId, body, { headers});
    } else {
      console.log('no update');
      return EMPTY;
    }

  }

  aceptarFacturaColocarMercancias (controlarFacturaId: number, mercancias: IMercancia [], f_suma: number, usuario: number, aceptarFactura: boolean) {

    const headers = this.getHeaderAuth ();
    const body = {mercancias, f_suma, usuario, aceptarFactura };
    const urlConId = `${this.mercanciaUrl}/aceptarycolocar/${controlarFacturaId}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('update');
      return this.http.post(urlConId, body, { headers});
    } else {
      console.log('no update');
      return EMPTY;
    }

  }

}
