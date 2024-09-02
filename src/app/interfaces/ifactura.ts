export interface Ifactura {

  product_id: number;
  f_id_cliente: number;
  f_tipo: boolean;
  f_suma: number;
  f_id_responsable: number;
  f_fecha_tramitacion: Date;
  f_suma_tramitacion:number;
  f_aceptado: number;
  created_at: Date;
}
