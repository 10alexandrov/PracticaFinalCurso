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
import { CrearFacturaControlComponent } from '../crear-factura-control/crear-factura-control.component';
import { IMercancia } from '../../interfaces/imercancia';
import { RemoveZeroAndFormaPipe } from '../../pipes/remove-zero-and-forma.pipe';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuMobileComponent, ShowFacturaComponent, FacturasFilterPipe, MenuComponent, CrearFacturaComponent, CrearFacturaControlComponent ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit{

  constructor (private facturasService: FacturasService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD


headers = {numero: "Número", nombre: "Cliente", suma: "Suma", direccion: "Dirección", estado: "Estado", created: "Creado", accion: "Acción"};
direccion = ['entrante', 'saliente'];

facturas: IFactura[] = [] // inicializar array facturas

ngOnInit () {

  this.obtenerListaFacturas();

}

// Mostrar facturas   ****************

mostrarFacturaId:number = 0;  // numero factura para mostrar
facturaMostrar!: IFactura;   // использовать "!" для non-null assertion
regimenMostrar:boolean = false;   // encender regimen entre lista de factura/mostrar producto
regimenCrear:boolean = false;  // encender regimen crear nuevu factura
regimenUpdate: boolean = false; //  encender regimen editar factura
regimenControlar: boolean = false;  // encender regimen controlar factura para receptor y recogedor
role = localStorage.getItem('role');  // obtener role usuario
usuario = localStorage.getItem('usuario'); // obtener usuario




// conmutador de regimenes ******

mostrarFactura(id:number) {
  this.mostrarFacturaId = id;
  this.regimenMostrar = true;   // Encender el modo de visualisar de facturas
  this.regimenUpdate = false;
  this.regimenCrear = false;
  this.regimenControlar = false;

  const facturaMostrar = this.facturas.find((factura) => factura.factura_id == id);

  if (facturaMostrar) {
    this.facturaMostrar = facturaMostrar;
  }
}

// Volver a modo de lista de usuarios
volverListaFacturas ($flag: boolean) {
  this.regimenMostrar = false;   // Apagar el modo de visualisar de factura
  this.regimenCrear = false;   // Apagar el modo de crear de factura
  this.regimenUpdate = false; //  encender regimen editar factura
  this.regimenControlar = false;

  if ($flag) this.obtenerListaFacturas();
}

crearNuevaFactura() {
  this.regimenCrear = true;   // Encender el modo de crear nueva factura
  this.regimenMostrar = false;
  this.regimenUpdate = false;
  this.regimenControlar = false;
}

encenderRegimenEditar (flag: boolean) {   // Encender el modo de Update de producto
  if (flag) {
    this.regimenUpdate = true;
    this.regimenMostrar = false;
    this.regimenCrear = false;
    this.regimenControlar = false;
  }

}

controlarFactura (idFacturaControlado: number) {
  this.regimenUpdate = false;
  this.regimenMostrar = false;
  this.regimenCrear = false;
  this.regimenControlar = true;  // encender regimen Controlar facturas
  this.mostrarFacturaId = idFacturaControlado;
}



// funccion para obtener la lista con todas usuarios
obtenerListaFacturas() {
  this.facturasService.getFacturas().subscribe (
    (data) => {
      this.facturas = data;
      this.applyFilter();                                 //   usar filter y despues paginacion
    },
    (error) => { console.log('Error data de producto', error)}
  );

  console.log(this.facturas);

}



    // Pagination y filtracion

    itemsPerPage = 8;           // Cantidad de paginas
    currentPage = 1;             // Carrent pagina
    totalPages = 1;              // Cantidad total de paginas
    facturasFiltrated: IFactura[] = [];     // array filtrado por condiciones
    facturasFilteredPorRole: IFactura[] = [];     // array filtrado por role y usuario
    facturasPaginated: IFactura[] = [];     // array paginado

    clientSearch = '';  // Para buscar por cliente
    direccionSearch: number = -1;   // Para buscar por direccion de factura
    statusSearch: number = -1; // Para buscar por status de factura



    // Filtracion de datos

    applyFilter() {
      console.log ("filtr", this.clientSearch, this.direccionSearch, this.statusSearch);

        if(this.clientSearch || this.direccionSearch >-1 || this.statusSearch>-1) {    // si hay algun filter
          console.log(this.clientSearch, this.direccionSearch, this.statusSearch);
          let tipo: boolean;
          let aceptado: boolean;

          if (this.direccionSearch > -1) {
            tipo = (this.direccionSearch == 1)? true : false;    // si hay direccion - definir que dereccion
          }

          if (this.statusSearch > -1) {
            aceptado = (this.statusSearch == 1)? true : false;   // si hay status - definir que status
          }

          console.log (this.facturas);
          let facturasParaFilterar = this.facturas.filter(factura =>
            factura.usuario_cliente && factura.usuario_cliente.u_nombre.toLocaleLowerCase().includes(this.clientSearch.toLocaleLowerCase())
          );
          console.log (facturasParaFilterar);
          facturasParaFilterar = facturasParaFilterar.reduce((filtered, factura) => {

                const matchDireccion = tipo === undefined || factura.f_tipo == tipo;
                const matchStatus = aceptado === undefined || factura.f_aceptado == aceptado;
                 // console.log (factura.factura_id, matchDireccion, matchStatus);
                if (matchDireccion && matchStatus) {
                  filtered.push(factura);
                }

                return filtered;
              }, [] as IFactura[]);
          this.facturasFiltrated = facturasParaFilterar;  //

        } else {
          this.facturasFiltrated = [...this.facturas];
        }

        this.filteredPorRole ();

        this.totalPages = Math.ceil(this.facturasFilteredPorRole.length / this.itemsPerPage);   // Cantar paginas
        this.currentPage = 1;                    // Restablecer a la primera página
        this.facturasPaginated = this.getPaginatedData();              //  Encender Paginacion

    }

    // Filtrar por role y nombre

    filteredPorRole () {

      if (this.usuario) {
        const usuario = +this.usuario;
        if (this.role == 'vendedor' || this.role == 'cliente') {
          this.facturasFilteredPorRole = this.facturasFiltrated.filter(factura =>
            factura.f_id_cliente && factura.f_id_cliente == usuario );
        } else if (this.role == 'receptor'){
          this.facturasFilteredPorRole = this.facturasFiltrated.filter(factura =>
            factura.f_tipo == false );
        } else if (this.role == 'recogedor'){
          this.facturasFilteredPorRole = this.facturasFiltrated.filter(factura =>
            factura.f_tipo == true);

        } else {
          this.facturasFilteredPorRole = [...this.facturasFiltrated];
        }
      } else {
        this.facturasFilteredPorRole = [...this.facturasFiltrated];
      }
      console.log (this.facturasFilteredPorRole);
    }

    // Возвращаем данные для текущей страницы
    getPaginatedData() {

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.facturasFilteredPorRole.slice(startIndex, endIndex);
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
