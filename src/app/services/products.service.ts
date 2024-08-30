import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productUrl = 'http://localhost:8080/api/productos'

  constructor(private http: HttpClient) {}

  getProductos (): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map(response => response)
    );
  }

}
