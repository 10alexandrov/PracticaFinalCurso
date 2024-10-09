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
import { IMercancia } from '../../interfaces/imercancia';
import { RemoveZeroAndFormaPipe } from '../../pipes/remove-zero-and-forma.pipe';

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

facturas: IFactura[] = [] // inicializar array facturas

ngOnInit () {

  this.obtenerListaFacturas();

}


clientSearch = '';  // Para buscar por cliente

direccionSearch: number = -1;   // Para buscar por direccion de factura

statusSearch: number = -1; // Para buscar por status de factura

// Mostrar facturas   ****************

mostrarFacturaId:number = 0;  // numero factura para mostrar
facturaMostrar!: IFactura;   // использовать "!" для non-null assertion
regimenMostrar:boolean = false;   // encender regimen entre lista de factura/mostrar producto
regimenCrear:boolean = false;  // encender regimen crear nuevu factura
regimenUpdate: boolean = false; //  encender regimen editar factura

mostrarFactura(id:number) {
  console.log(id);
  this.mostrarFacturaId = id;
  this.regimenMostrar = true;   // Encender el modo de visualisar de facturas
}

// Volver a modo de lista de usuarios
volverListaFacturas ($flag: boolean) {
  this.regimenMostrar = false;   // Apagar el modo de visualisar de factura
  this.regimenCrear = false;   // Apagar el modo de crear de factura
  this.regimenUpdate = false; //  encender regimen editar factura
  console.log ("flag recarga:", $flag);

  if ($flag) this.obtenerListaFacturas();
}

// funccion para obtener la lista con todas usuarios
obtenerListaFacturas() {
  this.facturasService.getFacturas().subscribe (
    (data) => {
      this.facturas = data;
      this.totalPages = Math.ceil(this.facturas.length / this.itemsPerPage);   //  cuantos paginas para paginacion
      this.facturasPaginated = this.getPaginatedData();                       //   obtener primera pagina
    },
    (error) => { console.log('Error data de producto', error)}
  );

  console.log(this.facturas);

}

  crearNuevaFactura() {
    this.regimenCrear = true;   // Encender el modo de visualisar de usuario
    this.regimenMostrar = false;
    this.regimenUpdate = false;
  }

  encenderRegimenEditar (flag: boolean) {   // Encender el modo de Update de producto
    console.log ("flag");
    if (flag) {
      this.regimenUpdate = true;
      this.regimenMostrar = false;
      this.regimenCrear = false;
    }

  }


    // Pagination

    itemsPerPage = 5;           // Cantidad de paginas
    currentPage = 1;             // Carrent pagina
    totalPages = 1;              // Cantidad total de paginas
    facturasPaginated: IFactura[] = [];     // array paginado

    // Возвращаем данные для текущей страницы
    getPaginatedData() {
      console.log (this.facturas);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.facturas.slice(startIndex, endIndex);
    }

    // Переход на предыдущую страницу
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.facturasPaginated = this.getPaginatedData();
      }
    }

    // Переход на следующую страницу
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.facturasPaginated = this.getPaginatedData();
      }
    }

}
