import { IProduct } from "./iproduct";

export interface Ilugar {

  id: number,
  lugar_estanteria: string,
  lugar_column: number,
  lugar_planta: number,
  lugar_producto: number,
  lugar_llenado: number,
  lugar_cantidad: number,
  lugar_productoInfo: IProduct,

}
