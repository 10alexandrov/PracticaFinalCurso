import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductFilterPipe } from '../../../pipes/product-filter.pipe'
import { Icategoria } from '../../../interfaces/icategoria';
import { IProduct } from '../../../interfaces/iproduct';
import { ShowProductComponent } from '../../show-product/show-product.component';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MenuComponent } from '../../menu/menu.component';
import { CrearProductoComponent } from '../../crear-producto/crear-producto.component';

@Component({
  selector: 'app-conteiner',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, ShowProductComponent, MenuComponent, CrearProductoComponent],
  templateUrl: './conteiner.component.html',
  styleUrl: './conteiner.component.scss'
})
export class ConteinerComponent {

  constructor (private productosService: ProductosService,
      private categoriasService: CategoriasService,
      private sanitizer: DomSanitizer) {}  // injectar relaciones con BD

  headers = {nombre: "Nombre", categoria: "Categoria", cantidad: "Cantidad en almacen", precio: "Precio venta"};

  productos: IProduct[] = [] // inicializar array productos
  categorias: Icategoria[] = []  // Inicializar array categories

ngOnInit () {
  this.obtenerListaProductos()
}

// filter

filterSearch = '';

categoriaSearch = 0;

// Mostrar producto   ****************

mostrarProductoId:number = 0;  // numero producto para mostrar
productoMostrar:IProduct = this.productos[this.mostrarProductoId];   // producto para mostrar
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto
regimenCrear:boolean = false;  // encender regimen crear nuevo producto
regimenUpdate: boolean = false; //  encender regimen editar producto

mostrarProducto(id:number) {
  const findProduct = this.productos.find(product => product.product_id == id);
  if (findProduct) {
   this.productoMostrar = findProduct;
  } else {
    console.log('Error: no hay producto con este id: ', id);
  }
  this.regimenUpdate = false;
  this.regimenMostrar = true;   // Encender el modo de visualisar de producto
}

// Volver a modo de lista de productos
volverMostrarProducto ($flag: boolean) {
  this.regimenMostrar = false;   // Encender el modo de visualisar de producto
  this.regimenCrear = false;
  this.regimenUpdate = false;
  console.log(this.regimenMostrar);

  if ($flag) this.obtenerListaProductos();
}

// funccion para obtener la lista con todas productos
obtenerListaProductos() {
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

crearNuevoProducto() {
  this.regimenCrear = true;   // Encender el modo de visualisar de producto
}

encenderRegimenEditar (flag: boolean) {   // Encender el modo de Update de producto
  console.log ("flag");
  if (flag) {
    this.regimenUpdate = true;
    this.regimenMostrar = false;
    this.regimenCrear = false;
  }
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
