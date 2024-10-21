import { Component, EventEmitter, Input, Output, ElementRef, OnInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { IMercancia } from '../../interfaces/imercancia';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RemoveZeroAndFormaPipe } from '../../pipes/remove-zero-and-forma.pipe';
import { ImercanciaService } from '../../services/imercancia.service';

@Component({
  selector: 'app-crear-factura-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveZeroAndFormaPipe],
  templateUrl: './crear-factura-new.component.html',
  styleUrl: './crear-factura-new.component.scss'
})

export class CrearFacturaNewComponent implements OnInit, AfterViewChecked, OnChanges {

  @Input() mercancias: IMercancia [] = [];
  @Output() mercanciasRenovar = new EventEmitter <IMercancia[]>();
  @Input() regimenUpdate: boolean = false;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de facturas
  @Input() updateFacturaId: number = 0;

  mercanciasEnPedido: IMercancia [] = this.mercancias;

  constructor( private elRef: ElementRef, private mercanciaService: ImercanciaService) {}

  private buttonsInitialized = false;  // Флаг для предотвращения повторной инициализации

  private sumaFactura: number = 0; // Suma de factura

  ngOnInit(): void {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['mercancias']) {
       this.mercanciasEnPedido = [...this.mercancias]; // Копируем новые данные
       this.buttonsInitialized = false; // Сбрасываем флаг, чтобы кнопки инициализировались заново
       this.sumarFactura ();
       console.log (this.getSumaFactura());

      }
  }

  initButtons() {
    const buttons = this.elRef.nativeElement.querySelectorAll('.borrar');

    buttons.forEach((button: HTMLElement) => {
      button.addEventListener('click', (event: MouseEvent) => {
        const buttonId = Number((event.target as HTMLElement).id);
        const index = this.mercancias.findIndex(obj => obj.m_id_productos === buttonId);
        console.log ('borrar');
          if (index !== -1) {
            this.mercancias.splice(index, 1);
            this.buttonsInitialized = false;
          }
        })
    })


  }

// Этот хук срабатывает каждый раз, когда происходит изменение в DOM
ngAfterViewChecked(): void {
  if (!this.buttonsInitialized && this.mercanciasEnPedido.length > 0) { // Инициализация кнопок после рендеринга
    this.initButtons();
    this.buttonsInitialized = true; // Обновляем флаг, чтобы не повторять инициализацию
  }
}

  mercanciasCambiarDatos () {
    this.mercanciasRenovar.emit(this.mercancias)
  }


    // Функция для обновления количества en mercancia
    updateQuantity(idProducto: number, value: number): void {
      if (value >= 0) {
        const index = this.mercancias.findIndex(obj => obj.m_id_productos === idProducto);
        if (this.mercancias[index].m_cantidad_maximum && this.role == 'cliente') {
          if (value > this.mercancias[index].m_cantidad_maximum) {  // Si pedido mas que cantidad ma
            value = this.mercancias[index].m_cantidad_maximum;
          }
        }
        this.mercancias[index].m_cantidad_pedida = value;
        console.log ('cantidad:', value);
        let precioMercancia: number = 0;  // precio comprar o vender
        if (this.role == 'cliente') {
          precioMercancia = this.mercancias[index].m_precio_venta ?? 0;
        } else {
          precioMercancia = this.mercancias[index].m_precio_compra ?? 0;
        }
        if (precioMercancia) {
          const suma = value * precioMercancia;
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

  getSumaFactura (): number {
    console.log ('get', this.sumaFactura);
    return this.sumaFactura;
  }

  setSumaFactura (suma: number) {
    this.sumaFactura = suma;
  }

  // Autenticacion
  role = localStorage.getItem('role');  // obtener role usuario
  usuario = localStorage.getItem('usuario');  // obtener role usuario

  sendDatos() {
    console.log('send');
    if (!this.regimenUpdate && this.role && this.usuario) {    // si no regimen update - creamos producto nuevo console.log ('exit!')
      const usuario = +this.usuario;
      this.mercanciaService.createMercancia(this.mercancias, this.sumaFactura, this.role, usuario).subscribe((response) => this.volverMostrar.emit(true)); //this.volverMostrar.emit(true)
      console.log("grabado: ");
    } else {   // si es regimen update - update producto
       if (this.mercancias && this.updateFacturaId && this.usuario) {
        const usuario = +this.usuario;
         this.mercanciaService.actualizarFactura(this.updateFacturaId, this.mercancias, this.sumaFactura, usuario).subscribe((response) => this.volverMostrar.emit(true));
        console.log("editado: ");
      }
    }
  }

    // funccion para volver con lista de facturas
     volverMostrarFacturas () {
      this.volverMostrar.emit (true);
      console.log ('back!');
    }

}
