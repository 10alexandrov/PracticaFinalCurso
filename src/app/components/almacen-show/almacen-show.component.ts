import { Component, HostListener, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Ilugar} from '../../interfaces/ilugar';
import { LugaresService } from '../../services/lugares.service';
import { IMercancia } from '../../interfaces/imercancia';

@Component({
  selector: 'app-almacen-show',
  standalone: true,
  imports: [CommonModule, FormsModule, AlmacenShowComponent],
  templateUrl: './almacen-show.component.html',
  styleUrl: './almacen-show.component.scss'
})
export class AlmacenShowComponent {

  constructor (private lugaresService: LugaresService,) {}

  @Input() lugares: Ilugar [] = [];
  @Input() mercancias: IMercancia [] = [];
  @Input() regimenAlmacen: boolean = false;
  @Input() regimenTrasladar: boolean = false;
  @Input() productoSearch: String = "";
  @Input() isHidden: boolean = false;   // Para ocultar button "Aceptar"
  @Output() disabled = new EventEmitter <void>();  // Para encender button "Aceptar"
  @Output() obtenerLugaresAlmacen = new EventEmitter <void> ();

  lugarParaMostrar: Ilugar | null = null;

  tables = Array.from({ length: 4 }); // Массив на 4 таблицы
  rows = Array.from({ length: 3 });   // Массив на 3 строки
  cols = Array.from({ length: 10 });  // Массив на 10 столбцов
  zonas = ['A','B','C','D'];

  getId(tableIndex: number, rowIndex: number, colIndex: number): string {
    // Рассчитываем уникальный порядковый номер ячейки
    return `${tableIndex * 30 +(2 - rowIndex) * 10 + colIndex + 1}`;
  }

  ngOnInit(): void {

    let estanerias: string [] = ['A', 'B', 'C', 'D'];
    this.mercancias.forEach(element => {
      const [secA, colA, floorA] = element.m_lugar ? element.m_lugar.split('-'): ['Z','0','0'];
      let lugar = estanerias.indexOf(secA)*30+(+floorA - 1) * 10 + +colA;
      element.m_lugar_numero = lugar;
    });
  }

  isPopupVisible: boolean = false;    // popup con info de celda
  isPopupAcceptVisible: boolean = false;   // popup para aceptar intercambios entre celdas
  number: string = "";
  mercancia: IMercancia | undefined = undefined;


  // que accion executa en celda
  accionesConCelda (id: string, event: MouseEvent) {

    if(this.regimenTrasladar) {
      this.cambiarCeldas (id);
    } else {
      event.stopPropagation ();
      this.mostrarInfo (id)
    }
  }

  // processo eleccion de celda
  firstSelected: string | null = null;    // id celdas
  secondSelected: string | null = null;
  firstCelda: string = "";                // Celda en formato A-1-1
  secondCelda: string = "";

  cambiarCeldas (id: string) {
      if (!this.firstSelected) {
        this.firstSelected = id;
          this.firstCelda = this.lugares[+id].lugar_estanteria + "-" + this.lugares[+id].lugar_planta + "-" +  (this.lugares[+id].lugar_column-1);
        console.log ("first :" + this.firstSelected);
      } else if (!this.secondSelected) {
          this.secondSelected = id;
          this.secondCelda = this.lugares[+id].lugar_estanteria + "-" + this.lugares[+id].lugar_planta + "-" +  (this.lugares[+id].lugar_column-1);
          console.log ("second :" + this.secondSelected);
          this.isPopupAcceptVisible = true;
      }
  }

  // processo combinacion de celdas
  intercambioCeldas () {
    this.isPopupAcceptVisible = false;
    if (this.firstSelected && this.secondSelected) {
      const firstCelda = +this.firstSelected;
      const secondCelda = +this.secondSelected;

      this.lugaresService.cambiarLugares(firstCelda, secondCelda).subscribe(
        (data) => {
          this.obtenerLugaresAlmacen.emit();
        },
        (error) => {
          console.log('Error data de lugares', error);
        });

        this.firstSelected = null;
        this.secondSelected = null;
        this.firstCelda = "";
        this.secondCelda = "";

    }

  }




  // mostrar info in celda
  mostrarInfo (id: string) {
    this.isPopupVisible = !this.isPopupVisible;
    this.getLugar (id);
  }

  cerrarPopup () {
    this.isPopupVisible = false;
    this.isPopupAcceptVisible = false;
    this.firstSelected = null;
    this.secondSelected = null;
    this.firstCelda = "";
    this.secondCelda = "";
  }

  getBackgroundColor (id: number): any {
    if (id.toString() == this.firstSelected || id.toString() == this.secondSelected) return {'background': 'red'}
    if (this.regimenAlmacen) {
      const mercancia = this.mercancias.find((element) => element.m_lugar_numero == id);
      if (mercancia) {
        if (mercancia.m_aceptado)  {
          return {'background': 'green'};
        } else {
          return {'background': 'red'};
        }
      } else {
        return {'background': 'white'};
      }

    } else {
      if (this.productoSearch) {
        if (this.lugares.find((element) => element.id == id)) return {'background': 'green'};
        else return {'background': 'white'};
      } else {
        if (this.lugares[id-1].lugar_cantidad && this.lugares[id-1].lugar_cantidad > 0) {
          return {'background': 'blue'};
        }
      }
    }
  }

  // Numero de celda
  getNumeroCelda (row: number, column: number): string {
    const rowReal: number = 3 - row;
    const columnReal: number = column + 1;
    const numeroCelda: string = rowReal + '-' + columnReal;
    return numeroCelda;
  }

  getLugar (id: string): void {
    const idNumber = +id;
    this.lugaresService.getLugar(idNumber).subscribe(
    (data) => {
      this.lugarParaMostrar = data;
      this.mercancia = this.mercancias.find ((element) => element.m_id_productos == this.lugarParaMostrar?.lugar_producto);
      console.log (this.mercancia);
    },
    (error) => { console.log('Error data de lugar', error)});

  }

  // Aceptar mercancia
  aceptarMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == mercancia.m_cantidad_recogida) {
      mercancia.m_aceptado = true;
    }
    this.disabled.emit();

  }

  cancelarAceptadoMercancia ($idRecogida: number, $cantidadRecogida: any): void {
    const mercancia = this.mercancias.find(item => item.id == $idRecogida);
    if (mercancia && mercancia.m_cantidad_pedida == $cantidadRecogida) {
      mercancia.m_aceptado = false;
    }
    this.disabled.emit();
   }

}
