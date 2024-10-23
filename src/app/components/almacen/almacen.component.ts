import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ilugar} from '../../interfaces/ilugar';
import { LugaresService } from '../../services/lugares.service';
import { AlmacenShowComponent } from '../almacen-show/almacen-show.component';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [MenuComponent, CommonModule, AlmacenShowComponent],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {

  constructor (private lugaresService: LugaresService,) {}

  lugares: Ilugar [] = [];

  ngOnInit(): void {
    this.lugaresService.getLugares().subscribe(
      (data) => {
        this.lugares = data;
        console.log (this.lugares);
      },
      (error) => { console.log('Error data de lugares', error)});
  }

}
