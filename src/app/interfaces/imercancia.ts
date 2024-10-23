
export interface IMercancia {

  id?: number;
  m_id_facturas?: number;
  m_id_productos: number;
  m_nombre_producto?: string;
  m_precio_compra?: number;
  m_precio_venta?: number;
  m_cantidad_pedida: number;
  m_cantidad_recogida: number;
  m_suma_pedida: number;
  m_suma_recogida: number;
  m_aceptado: boolean;
  m_precio?: number;
  m_cantidad_maximum?: number;   // Cuanto maximum mercancia puedo pedir
  m_lugar?: string;    // Donde esta mercancia en almacen
  m_lugar_numero?: number;   //  Id lugar en formato number

}
