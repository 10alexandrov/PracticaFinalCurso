import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Ilugar} from '../../interfaces/ilugar';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule,],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {

  constructor (private lugaresService: LugaresService,) {}

  lugarParaMostrar: Ilugar | null = null;
  lugares: Ilugar [] = [];

  tables = Array.from({ length: 4 }); // Массив на 4 таблицы
  rows = Array.from({ length: 3 });   // Массив на 3 строки
  cols = Array.from({ length: 10 });  // Массив на 10 столбцов

  getId(tableIndex: number, rowIndex: number, colIndex: number): string {
    // Рассчитываем уникальный порядковый номер ячейки
    return `${tableIndex * 30 +(2 - rowIndex) * 10 + colIndex + 1}`;
  }

  ngOnInit(): void {
    this.lugaresService.getLugares().subscribe(
      (data) => {
        this.lugares = data;
        console.log (this.lugares);
      },
      (error) => { console.log('Error data de lugares', error)});


  }

  isPopupVisible: boolean = false;
  number: string = "";

  mostrarInfo (id: string, event: MouseEvent) {
    this.isPopupVisible = !this.isPopupVisible;
    event.stopPropagation ();
    this.getLugar (id);
  }

  cerrarPopup () {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getBackgroundColor (id: number): any {
      if (this.lugares[id-1].lugar_llenado && this.lugares[id-1].lugar_llenado > 0) {

        return {'background': 'blue'};
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
      console.log (this.lugarParaMostrar);
    },
    (error) => { console.log('Error data de lugar', error)});

  }

}
