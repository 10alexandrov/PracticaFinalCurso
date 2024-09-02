import { Injectable } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) {}

  getUsuarios (): Observable<IUsuarios[]> {
    return this.http.get<IUsuarios[]>(this.usuariosUrl).pipe(
      map(response => response)
    );
  }

}
