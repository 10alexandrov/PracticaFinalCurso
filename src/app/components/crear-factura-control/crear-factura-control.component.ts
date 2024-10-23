import { Component, EventEmitter, Input, Output, ElementRef, OnInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { IMercancia } from '../../interfaces/imercancia';
import { CommonModule } from '@angular/common';
import { ImercanciaService } from '../../services/imercancia.service';
import { LugaresService } from '../../services/lugares.service';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlmacenShowComponent } from '../almacen-show/almacen-show.component';
import { Ilugar} from '../../interfaces/ilugar';
import { IFactura } from '../../interfaces/ifactura';

@Component({
  selector: 'app-crear-factura-control',
  standalone: true,
  imports: [CommonModule, FormsModule, AlmacenShowComponent,],
  templateUrl: './crear-factura-control.component.html',
  styleUrl: './crear-factura-control.component.scss'
})
export class CrearFacturaControlComponent {

  constructor( private mercanciaService: ImercanciaService,
               private lugarService: LugaresService, ) {}
  @Input() controlarFacturaId:number = -1;
  @Input() facturaMostrar: IFactura | null = null;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  sumaFactura: number = 0; // Suma de factura controlado
  puedoAceptar: boolean = false;   // puedo aceptar factura cuando todos campos son correctos

  // Autorizacion
  role = localStorage.getItem('role');  // obtener role usuario
  usuario = localStorage.getItem('usuario');

  // regimen redactar factura (factura/Almacen)
  regimenAlmacen: boolean = false;

  cambiarRegimenRedactar (): void {
    this.regimenAlmacen = !this.regimenAlmacen;
  }

  volverMostrarFactura () {
    console.log ("volver");
    this.volverMostrar.emit(false);
  }

  mercancias: IMercancia[] = [] // inicializar array merczncias

  ngOnInit(): void {
    if (this.controlarFacturaId > 0) {
      this.mercanciaService.getMercanciasConLugares(this.controlarFacturaId).subscribe (
        (data) => {this.mercancias = data;
                   console.log (data);
                  if (this.role == 'recogedor') {
                    this.sortMercancias();
                  }
                },
        (error) => { console.log('Error data de producto', error)}
      );
    } else {
      console.log ('Numero de factura es incorrecto');
    }

  }

  isDisabled: boolean = true;  // Activar/Desactivar button "Aceptar"

  // comprobar todos campos acceptar para activar button "Aceptar"
  disabled () {
    let aceptado = true;
    this.mercancias.forEach((mercancia) => {if (!mercancia.m_aceptado) aceptado= false});
    console.log (aceptado);
    this.isDisabled = !aceptado;
    console.log ('check' + this.isDisabled);
  }

  isHidden: boolean = false; // para ocultar button "Aceptar"

  hidden () {
    if (this.role == 'receptor' && this.facturaMostrar && this.facturaMostrar.f_aceptado == true) {
      this.isHidden = true;
    }
  }



  aceptarMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == mercancia.m_cantidad_recogida) {
      mercancia.m_aceptado = true;
    }

    this.disabled ();

  }

  cancelarAceptadoMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == $cantidadRecogida) {
      mercancia.m_aceptado = false;
    }

    this.disabled ();
   }

   guardarDatos (aceptarFactura: boolean): void {   // Guardamos datos sin aceptaccion la factura
      console.log('send');
      if (this.mercancias && this.controlarFacturaId && this.usuario) {
        const usuario = +this.usuario;

        if (this.role == 'recogedor') {
          this.mercancias.forEach((mercancia) => {
            if (mercancia.m_precio_venta) {
            mercancia.m_suma_recogida = mercancia.m_cantidad_recogida*mercancia.m_precio_venta;
              this.sumaFactura += mercancia.m_suma_recogida;
            }
          });
        this.mercanciaService.aceptarFactura(this.controlarFacturaId, this.mercancias, this.sumaFactura, usuario, aceptarFactura).subscribe((response) => this.volverMostrar.emit(true));

        }
        if (this.role == 'receptor') {
          this.mercancias.forEach((mercancia) => {
            if (mercancia.m_precio_compra) {
            mercancia.m_suma_recogida = mercancia.m_cantidad_recogida*mercancia.m_precio_compra;
              this.sumaFactura += mercancia.m_suma_recogida;
            }
          })
        this.mercanciaService.aceptarFactura(this.controlarFacturaId, this.mercancias, this.sumaFactura, usuario, aceptarFactura).subscribe(
          (data) => {this.mercancias = data;
                      console.log ("check4");
                      console.log(this.mercancias);
          }

        );
        }
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

    // function para seleccionar lugares de mercancia
    sortMercancias(): void {

      this.mercancias.sort((a, b) => {
        const [secA, colA, floorA] = a.m_lugar ? a.m_lugar.split('-'): ['Z','0','0'];
        const [secB, colB, floorB] = b.m_lugar ? b.m_lugar.split('-'): ['Z','0','0'];

        // Сначала сравниваем секции (буквы)
        if (secA < secB) return -1;
        if (secA > secB) return 1;

        // Если секции одинаковые, сравниваем колонки (числа)
        if (parseInt(colA) < parseInt(colB)) return -1;
        if (parseInt(colA) > parseInt(colB)) return 1;

        // Если секции и колонки одинаковые, сравниваем этажи (числа)
        if (parseInt(floorA) < parseInt(floorB)) return -1;
        if (parseInt(floorA) > parseInt(floorB)) return 1;

        return 0;
      });

    }

}
