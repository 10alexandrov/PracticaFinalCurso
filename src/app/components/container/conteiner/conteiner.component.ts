import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductFilterPipe } from '../../../pipes/product-filter.pipe'
import { Icategoria } from '../../../interfaces/icategoria';
import { IProduct } from '../../../interfaces/iproduct';
import { ShowProductComponent } from '../../show-product/show-product.component';
import { ProductsService } from '../../../services/products.service';
import { CategoriasService } from '../../../services/categorias.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-conteiner',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, ShowProductComponent, MenuComponent,],
  templateUrl: './conteiner.component.html',
  styleUrl: './conteiner.component.scss'
})
export class ConteinerComponent {

  constructor (private productosService: ProductsService,
      private categoriasService: CategoriasService,
      private sanitizer: DomSanitizer) {}  // injectar relaciones con BD

  headers = {nombre: "Nombre", categoria: "Categoria", cantidad: "Cantidad en almacen", precio: "Precio venta"};

  productos: IProduct[] = [] // inicializar array productos
  categorias: Icategoria[] = []  // Inicializar array categories

ngOnInit () {
  this.productosService.getProductos().subscribe (
    (data) => {this.productos = data;},
    (error) => { console.log('Error data de producto', error)}
  );

  this.categoriasService.getCategorias().subscribe (
    (data) => {this.categorias = data;},
    (error) => { console.log('Error data de categorias', error)}
  );   // obtener datos de BD

  this.productos.forEach(producto => {  // Convertir Imagen para visualizar
    if (producto.p_foto) {
      const contentType = this.detectImageFormat(producto.p_foto); // Определяем формат изображения
      const base64String = this.arrayBufferToBase64(producto.p_foto);
      producto.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(`data:${contentType};base64,${base64String}`);
    }
  });
}

// filter

filterSearch = '';

categoriaSearch = 0;

// Mostrar producto   ****************

mostrarProductoId:number = 0;  // numero producto para mostrar
productoMostrar:IProduct = this.productos[this.mostrarProductoId];   // producto para mostrar
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto

mostrarProducto(id:number) {
  const findProduct = this.productos.find(product => product.product_id == id);
  if (findProduct) {
   this.productoMostrar = findProduct;
  } else {
    console.log('Error: no hay producto con este id: ', id);
  }

  this.regimenMostrar = true;   // Encender el modo de visualisar de producto
}

// Volver a modo de lista de productos
volverMostrarProducto () {
  this.regimenMostrar = false;   // Encender el modo de visualisar de producto
  console.log(this.regimenMostrar);
}



// Display imagen ****************************

arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

detectImageFormat(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return 'image/jpeg'; // JPEG
  } else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return 'image/png'; // PNG
  }
  return 'image/jpeg'; // Дефолтный тип, если формат не распознан
}

}
