import { Injectable } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsuarios (): Observable<IUsuarios[]> {

    if (this.authService.checkTokenExpiration()) {
      return this.http.get<IUsuarios[]>(this.usuariosUrl).pipe(
        map(response => response)
      );
    } else {
      return EMPTY;
    }
  }

}
