import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { EstadisticaService } from '../../services/estadistica.service';
import { Iestadistica } from '../../interfaces/iestadistica';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [MenuComponent, CommonModule,],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.scss'
})
export class EstadisticaComponent implements OnInit{

constructor (private estadisticaService: EstadisticaService) {}

estadistica!: Iestadistica  // inicializar array facturas

fechaHoy: boolean = true; // flag para cargar datos hoy o otro dia

ngOnInit () {
  console.log ('hoy?', this.fechaHoy);
  if (this.fechaHoy) {
    console.log ('cargamos');
    this.obtenerEstadistica();
  }
}

  // funccion para obtener la lista con todas usuarios
obtenerEstadistica() {
  this.estadisticaService.getEstadistica().subscribe (
    (data) => {this.estadistica = data; console.log(this.estadistica);},
    (error) => { console.log('Error data de producto', error)}
  );

}

obtenerEstadisticaPorFecha (fecha: string, event: Event) {
  event.preventDefault ();
  this.fechaHoy = false;
  this.estadisticaService.getEstadisticaPorFecha(fecha).subscribe (
    (data) => {this.estadistica = data; console.log(this.estadistica);},
    (error) => { console.log('Error data de producto', error)}
  );

}

}
