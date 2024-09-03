import { Pipe, PipeTransform } from '@angular/core';
import { IFactura } from '../interfaces/ifactura';

@Pipe({
  name: 'facturasFilter',
  standalone: true
})
export class FacturasFilterPipe implements PipeTransform {

  transform(facturas: IFactura[], filterBy: string, direccion: number, status: number): IFactura[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    let facturasFiltered: IFactura[];

    console.log (status);

    if(filter || direccion >-1 || status>-1) {

      let tipo: boolean;
      let aceptado: boolean;

      if (direccion > -1) {
        tipo = (direccion == 1)? true : false;
      }

      if (status > -1) {
        aceptado = (status == 1)? true : false;
      }
      facturasFiltered = facturas;  //.filter(factura => usuario.u_nombre.toLocaleLowerCase().includes(filter));

      facturasFiltered = facturasFiltered.reduce((filtered, factura) => {
        console.log(direccion,tipo,factura.f_tipo);
        console.log(status, aceptado, factura.f_aceptado);
        const matchDireccion = tipo === undefined || factura.f_tipo == tipo;
        const matchStatus = aceptado === undefined || factura.f_aceptado == aceptado;
        console.log (factura.factura_id, matchDireccion, matchStatus);
        if (matchDireccion && matchStatus) {
          filtered.push(factura);
        }

        return filtered;
      }, [] as IFactura[]);

      return facturasFiltered;

    } else {
      return facturas;
    }
  }
}
