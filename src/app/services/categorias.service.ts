import { Injectable } from '@angular/core';
import { Icategoria } from '../interfaces/icategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  getCategorias (): Icategoria[] {
    return [{
      id_categoria: 1,
      c_nombre:'Bebidas'
    }, {
        id_categoria: 2,
        c_nombre:'Cereales'
    }, {
      id_categoria: 3,
      c_nombre:'Enlatada'
    }, {
      id_categoria: 4,
      c_nombre:'Pasteleria'
    }, {
      id_categoria: 5,
      c_nombre:'Alcohol'
    }]
  }
}
