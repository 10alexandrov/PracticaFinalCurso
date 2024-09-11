import { Injectable } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuariosStoreService {

  private usuariosUrl = 'http://localhost:8080/api/usuarios/'

  constructor(private http: HttpClient) {}

  createUsuario (usario: IUsuarios): Observable<any> {
    return this.http.post(this.usuariosUrl, usario);
  }

}
