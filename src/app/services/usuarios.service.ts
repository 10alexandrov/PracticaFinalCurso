import { Injectable } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsuarios (): Observable<IUsuarios[]> {

    const headers = this.getHeaderAuth ();

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<IUsuarios[]>(this.usuariosUrl, { headers }).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }


  createUsuario (usario: IUsuarios): Observable<any> {

    const headers = this.getHeaderAuth ();

    return this.http.post(this.usuariosUrl, usario, { headers });
  }

  deleteUsuario (id: number): Observable<void> {
    const headers = this.getHeaderAuth ();
    const deleteURL = `${this.usuariosUrl}/${id}`;
    return this.http.delete<void>(deleteURL, { headers });
  }

  actualizarUsuario (id: number, usuario: IUsuarios): Observable<any> {

    const headers = this.getHeaderAuth ();
    const urlConId = `${this.usuariosUrl}/${id}`;

    if (this.authService.checkTokenExpiration()) {
      console.log('update');
      return this.http.put(urlConId, usuario, { headers});
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
