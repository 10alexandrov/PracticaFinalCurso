import { Injectable } from '@angular/core';
import { IFactura } from '../interfaces/ifactura';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private facturaUrl = 'http://localhost:8080/api/facturas'

  constructor(private http: HttpClient) {}

  getFacturas (): Observable<IFactura[]> {
    return this.http.get<IFactura[]>(this.facturaUrl).pipe(
      map(response => response)
    );
  }
}
