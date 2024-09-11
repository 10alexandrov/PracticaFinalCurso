import { Injectable } from '@angular/core';
import { IUsuarios } from '../interfaces/iusuarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDeleteService {


  private usuariosUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) {}

  deleteUsuario (id: number): Observable<void> {
    const deleteURL = `http://localhost:8080/api/usuarios/${id}`;
    return this.http.delete<void>(deleteURL);
  }

}
