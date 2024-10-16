import { Component, EventEmitter, Input, Output, ElementRef, OnInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { IMercancia } from '../../interfaces/imercancia';
import { CommonModule } from '@angular/common';
import { ImercanciaService } from '../../services/imercancia.service';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-factura-control',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './crear-factura-control.component.html',
  styleUrl: './crear-factura-control.component.scss'
})
export class CrearFacturaControlComponent {

  constructor( private mercanciaService: ImercanciaService) {}
  @Input() controlarFacturaId:number = -1;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  sumaFactura: number = 0; // Suma de factura controlado
  puedoAceptar: boolean = false;   // puedo aceptar factura cuando todos campos son correctos

  // Autorizacion
  role = localStorage.getItem('role');  // obtener role usuario
  usuario = localStorage.getItem('usuario');

  volverMostrarFactura () {
    console.log ("volver");
    this.volverMostrar.emit(false);
  }

  mercancias: IMercancia[] = [] // inicializar array usuarios

  ngOnInit(): void {
    if (this.controlarFacturaId > 0) {
      this.mercanciaService.getMercancias(this.controlarFacturaId).subscribe (
        (data) => {this.mercancias = data; console.log (data);},
        (error) => { console.log('Error data de producto', error)}
      );
    } else {
      console.log ('Numero de factura es incorrecto');
    }

  }

  aceptarMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == mercancia.m_cantidad_recogida) {
      mercancia.m_aceptado = true;
    }

  }

  cancelarAceptadoMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == $cantidadRecogida) {
      mercancia.m_aceptado = true;
    }
   }

   guardarDatos (aceptarFactura: boolean): void {   // Guardamos datos sin aceptaccion la factura
      console.log('send');
      if (this.mercancias && this.controlarFacturaId && this.usuario) {
        const usuario = +this.usuario;
        this.mercanciaService.aceptarFactura(this.controlarFacturaId, this.mercancias, this.sumaFactura, usuario, aceptarFactura).subscribe((response) => this.volverMostrar.emit(true));
      }
   }








      // Функция для обновления количества en mercancia
      updateQuantity(idProducto: number, value: number): void {
        if (value >= 0) {  // Можно добавить проверку на корректность введенного значения
          const index = this.mercancias.findIndex(obj => obj.m_id_productos === idProducto);
          if (this.mercancias[index].m_cantidad_maximum) {
            if (value > this.mercancias[index].m_cantidad_maximum) {  // Si pedido mas que cantidad ma
              value = this.mercancias[index].m_cantidad_maximum;
            }
          }
          this.mercancias[index].m_cantidad_pedida = value;
          if (this.mercancias[index].m_precio_venta) {
            const suma = value * this.mercancias[index].m_precio_venta;
            this.mercancias[index].m_suma_pedida = suma;
            this.sumarFactura ();
          }
        }
      }


    sumarFactura (): void {
      const start: number = 0;
      this.sumaFactura = this.mercancias.reduce((total, mercancia) => {
        return total + parseFloat(String(mercancia.m_suma_pedida));
      }, start);
      console.log ('sumar', this.sumaFactura);
    }


}
