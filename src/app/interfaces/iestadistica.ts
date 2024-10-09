export interface Iestadistica {

  id: number,
  e_fecha: Date,
  e_suma_restos: number,
  e_volumen_restos: number,
  e_suma_compras_hoy: number,
  e_suma_ventas_hoy: number,
  e_suma_compras_mes: number,
  e_suma_ventas_mes: number,
  e_beneficios_hoy: number,
  e_beneficios_mes: number,
  faltaMercancias: any[]

}
