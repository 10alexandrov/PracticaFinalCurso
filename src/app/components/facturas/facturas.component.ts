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

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowFacturaComponent, FacturasFilterPipe, MenuComponent],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit{

  constructor (private facturasService: FacturasService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD


headers = {numero: "Numero", nombre: "Client", suma: "Suma", created: "Creado"};
direccion = ['entrante', 'saliente'];

facturas: IFactura[] = [] // inicializar array usuarios

ngOnInit () {
  this.facturasService.getFacturas().subscribe (
    (data) => {this.facturas = data;},
    (error) => { console.log('Error data de facturas', error)}
  );

}

clientSearch = '';  // Para buscar por cliente

direccionSearch: number = -1;   // Para buscar por direccion de factura

statusSearch: number = -1; // Para buscar por status de factura

// Mostrar facturas   ****************

mostrarFacturaId:number = 0;  // numero usuario para mostrar
facturaMostrar!: IFactura;   // использовать "!" для non-null assertion
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto


mostrarFactura(id:number) {
  const findFactura = this.facturas.find(factura => factura.factura_id == id);
  if (findFactura) {
   this.facturaMostrar = findFactura;
  } else {
    console.log('Error: no hay factura con este id: ', id);
  }

  this.regimenMostrar = true;   // Encender el modo de visualisar de usuario
}

// Volver a modo de lista de usuarios
volverMostrarFactura () {
  this.regimenMostrar = false;   // Encender el modo de visualisar de usuario
  console.log(this.regimenMostrar);
}

}
