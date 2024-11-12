import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ilugar} from '../../interfaces/ilugar';
import { LugaresService } from '../../services/lugares.service';
import { AlmacenShowComponent } from '../almacen-show/almacen-show.component';
import { FormsModule, Validators } from '@angular/forms';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [MenuComponent, CommonModule, AlmacenShowComponent, FormsModule, MenuMobileComponent],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {

  constructor (private lugaresService: LugaresService,) {}

  lugares: Ilugar [] = [];
  lugaresFiltrado: Ilugar [] = [];
  productoSearch: String = "";
  regimenTrasladar: boolean = false; // Regimen Trasladar

  ngOnInit(): void {
    this.obtenerLugaresAlmacen ();
  }

  // obtener informacion sobre celdas en almacen
  obtenerLugaresAlmacen () : void  {
    this.lugaresService.getLugares().subscribe(
      (data) => {
        this.lugares = data;
        this.applyFilter()
        console.log (this.lugares);
      },
      (error) => { console.log('Error data de lugares', error)});

  }


  applyFilter() {
    console.log ("filtr", this.productoSearch);
      if (this.productoSearch) {
        this.lugaresFiltrado = this.lugares.filter(lugar =>
          lugar.lugar_productoInfo.p_nombre && lugar.lugar_productoInfo.p_nombre.toLocaleLowerCase().includes(this.productoSearch.toLocaleLowerCase())
        );
        console.log (this.lugaresFiltrado)

      } else {
        this.lugaresFiltrado = [...this.lugares];
      }
  }

  regimenTrasladarInterruptor() {
    this.regimenTrasladar = !this.regimenTrasladar;
    console.log ("Trasladar" + this.regimenTrasladar);
  }

}
