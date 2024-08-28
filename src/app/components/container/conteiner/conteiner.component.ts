import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conteiner',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './conteiner.component.html',
  styleUrl: './conteiner.component.scss'
})
export class ConteinerComponent {

  headers = {nombre: "Nombre", categoria: "Categoria", cantidad: "Cantidad en almacen", precio: "Precio venta"};

  productos: IProduct[] = [{
    product_id: 1,
    p_nombre: "Agua Minerale 0,5l",
    p_categoria: 1,
    p_description: "string;",
    p_ancho: 70,
    p_altura: 170,
    p_longitud: 70,
    p_peso: 700,
    p_cantidad_almacen: 200,
    p_cantidad_entregado: 100,
    p_cantidad_reservado: 50,
    p_cantidad_enviado: 0,
    p_precio_compra: 0.56,
    p_precio_venta: 1.21,
    p_codigo: "string;",
  }, {
    product_id: 2,
    p_nombre: "Agua Minerale 1l",
    p_categoria: 1,
    p_description: "string;",
    p_ancho: 70,
    p_altura: 270,
    p_longitud: 70,
    p_peso: 1200,
    p_cantidad_almacen: 200,
    p_cantidad_entregado: 100,
    p_cantidad_reservado: 50,
    p_cantidad_enviado: 0,
    p_precio_compra: 0.76,
    p_precio_venta: 1.81,
    p_codigo: "string;",
  }, {
    product_id: 3,
    p_nombre: "Agua Minerale 2l",
    p_categoria: 1,
    p_description: "string;",
    p_ancho: 70,
    p_altura: 320,
    p_longitud: 70,
    p_peso: 2200,
    p_cantidad_almacen: 200,
    p_cantidad_entregado: 100,
    p_cantidad_reservado: 50,
    p_cantidad_enviado: 0,
    p_precio_compra: 0.96,
    p_precio_venta: 2.11,
    p_codigo: "string;",
  }, {
    product_id: 4,
    p_nombre: "Milk",
    p_categoria: 2,
    p_description: "string;",
    p_ancho: 70,
    p_altura: 270,
    p_longitud: 70,
    p_peso: 1200,
    p_cantidad_almacen: 200,
    p_cantidad_entregado: 100,
    p_cantidad_reservado: 50,
    p_cantidad_enviado: 0,
    p_precio_compra: 0.76,
    p_precio_venta: 1.81,
    p_codigo: "string;",
  }
]

constructor () {}

ngOnInit () {}


}
