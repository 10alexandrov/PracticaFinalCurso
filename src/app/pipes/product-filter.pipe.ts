import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(productos: IProduct[], filterBy: string, categoria: number): IProduct[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if(filter && categoria <1) {
      return productos.filter(producto => producto.p_nombre.toLocaleLowerCase().includes(filter));
    }
    if (filter && categoria >= 1) {
      return productos.filter(producto =>
        producto.p_categoria == categoria && producto.p_nombre.toLocaleLowerCase().includes(filter)
      );
    }

    if (!filter && categoria >= 1) {
      return productos.filter(producto => producto.p_categoria == categoria);
    }

    return productos;
  }

}
