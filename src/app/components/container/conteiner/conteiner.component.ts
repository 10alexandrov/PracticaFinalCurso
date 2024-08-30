import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductFilterPipe } from '../../../pipes/product-filter.pipe'
import { Icategoria } from '../../../interfaces/icategoria';
import { IProduct } from '../../../interfaces/iproduct';
import { ShowProductComponent } from '../../show-product/show-product.component';
import { ProductsService } from '../../../services/products.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-conteiner',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, ShowProductComponent,],
  templateUrl: './conteiner.component.html',
  styleUrl: './conteiner.component.scss'
})
export class ConteinerComponent {

  constructor (private productosService: ProductsService,
     private categoriasService: CategoriasService) {}  // injectar relaciones con BD

  headers = {nombre: "Nombre", categoria: "Categoria", cantidad: "Cantidad en almacen", precio: "Precio venta"};

  productos: IProduct[] = [] // inicializar array productos
  categorias: Icategoria[] = []  // Inicializar array categories

ngOnInit () {
  this.productosService.getProductos().subscribe (
    (data) => {this.productos = data;},
    (error) => { console.log('Error data de producto', error)}
  );
  // this.productos = this.productosService.getProductos();   // obtener datos de de productos de BD
  this.categorias = this.categoriasService.getCategorias();   // obtener datos de BD
}

// filter

filterSearch = '';

categoriaSearch = 0;

// Mostrar producto

mostrarProductoId:number = 0;  // numero producto para mostrar
productoMostrar:IProduct = this.productos[this.mostrarProductoId];   // producto para mostrar
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto

mostrarProducto(id:number) {
  this.mostrarProductoId = id - 1;
  this.productoMostrar = this.productos[this.mostrarProductoId];
  this.regimenMostrar = true;   // Encender el modo de visualisar de producto
}

// Volver a modo de lista de productos
volverMostrarProducto () {
  this.regimenMostrar = false;   // Encender el modo de visualisar de producto
  console.log(this.regimenMostrar);
}

}
