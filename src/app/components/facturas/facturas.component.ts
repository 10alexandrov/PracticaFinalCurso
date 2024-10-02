import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IFactura } from '../../interfaces/ifactura';
import { IProduct } from '../../interfaces/iproduct';
import { ShowFacturaComponent } from '../show-factura/show-factura.component';
import { FacturasService } from '../../services/facturas.service';
import { CategoriasService } from '../../services/categorias.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsuariosService } from '../../services/usuarios.service';
import { FacturasFilterPipe  } from '../../pipes/facturas-filter.pipe'
import { MenuComponent } from '../menu/menu.component';
import { CrearFacturaComponent } from '../crear-factura/crear-factura.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowFacturaComponent, FacturasFilterPipe, MenuComponent, CrearFacturaComponent,],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit{

  constructor (private facturasService: FacturasService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD


headers = {numero: "Numero", nombre: "Client", suma: "Suma", direccion: "Direccion", estado: "Estado", created: "Creado"};
direccion = ['entrante', 'saliente'];

facturas: IFactura[] = [] // inicializar array usuarios

ngOnInit () {

  this.obtenerListaFacturas();

}


clientSearch = '';  // Para buscar por cliente

direccionSearch: number = -1;   // Para buscar por direccion de factura

statusSearch: number = -1; // Para buscar por status de factura

// Mostrar facturas   ****************

mostrarFacturaId:number = 0;  // numero factura para mostrar
facturaMostrar!: IFactura;   // использовать "!" для non-null assertion
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto
regimenCrear:boolean = false;  // encender regimen crear nuevu usuario

mostrarFactura(id:number) {
  console.log(id);
  this.mostrarFacturaId = id;
  this.regimenMostrar = true;   // Encender el modo de visualisar de facturas
}

// Volver a modo de lista de usuarios
volverListaFacturas ($flag: boolean) {
  this.regimenMostrar = false;   // Apagar el modo de visualisar de usuario
  this.regimenCrear = false;   // Apagar el modo de crear de usuario
  console.log ("flag recarga:", $flag);

  if ($flag) this.obtenerListaFacturas();
}

// funccion para obtener la lista con todas usuarios
obtenerListaFacturas() {
  this.facturasService.getFacturas().subscribe (
    (data) => {this.facturas = data;},
    (error) => { console.log('Error data de producto', error)}
  );

  console.log(this.facturas);

}

crearNuevaFactura() {
  this.regimenCrear = true;   // Encender el modo de visualisar de usuario
}

}
