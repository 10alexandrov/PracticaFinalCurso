import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(productos: IProduct[], filterBy: string): IProduct[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if(filter) {
      return productos.filter(producto => producto.p_nombre.toLocaleLowerCase().includes(filter));
    }
    return productos;
  }

}
