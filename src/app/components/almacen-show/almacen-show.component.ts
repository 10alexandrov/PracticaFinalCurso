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
  @Output() disabled = new EventEmitter <void>();

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

  isPopupVisible: boolean = false;
  number: string = "";
  mercancia: IMercancia | undefined = undefined;

  mostrarInfo (id: string, event: MouseEvent) {
    this.isPopupVisible = !this.isPopupVisible;
    console.log ('check 1');
    event.stopPropagation ();
    this.getLugar (id);
  }

  cerrarPopup () {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getBackgroundColor (id: number): any {
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
      if (this.lugares[id-1].lugar_llenado && this.lugares[id-1].lugar_llenado > 0) {
        return {'background': 'blue'};
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
 console.log ('check2-2');
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
