import { SafeUrl } from "@angular/platform-browser";

export interface IProduct {

  product_id?: number;
  p_nombre: string;
  p_categoria: number;
  p_description?: string;
  p_ancho: number;
  p_altura: number;
  p_longitud: number;
  p_peso: number;
  p_foto?: string;
  p_cantidad_almacen: number;
  p_cantidad_entrega: number;
  p_cantidad_reservado: number;
  p_cantidad_enviado: number;
  p_precio_compra: number;
  p_precio_venta: number;
  p_codigo: string;
  p_nombre_categoria?: string;
  imagenUrl?: SafeUrl
}
