import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IFactura } from '../../interfaces/ifactura';
import { ImercanciaService } from '../../services/imercancia.service';
import { FacturasService } from '../../services/facturas.service';
import { IMercancia } from '../../interfaces/imercancia';

@Component({
  selector: 'app-show-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-factura.component.html',
  styleUrl: './show-factura.component.scss'
})
export class ShowFacturaComponent implements OnInit{

  constructor( private facturasService: FacturasService, private mercanciaService: ImercanciaService) {}
  @Input() mostrarFacturaId:number = -1;
  @Input() facturaMostrar: IFactura | null = null;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  @Output () encenderRegimenEditar = new EventEmitter <boolean> (); // Encender regimen editar de factura

  mercancias: IMercancia[] = [] // inicializar array usuarios

  isPopupAcceptVisible: boolean = false; // Popup ventana

  ngOnInit(): void {
    if (this.mostrarFacturaId > 0) {
      this.mercanciaService.getMercancias(this.mostrarFacturaId).subscribe (
        (data) => {this.mercancias = data; console.log (data);},
        (error) => { console.log('Error data de producto', error)}
      );
    } else {
      console.log ('Numero de factura es incorrecto');
    }

  }

  // Autorizacion
  role = localStorage.getItem('role');  // obtener role usuario


  // Encender regimen de editar factura
  editarFactura () {
      console.log ("editar");
      this.encenderRegimenEditar.emit(true);
  }

  volverMostrarFactura () {
    this.volverMostrar.emit(false);
  }

  // Interruptor ventana de popup
  popupInterruptor () {
    this.isPopupAcceptVisible = !this.isPopupAcceptVisible
  }

  borrarFactura (id_factura: number): void  {

		if (id_factura) {
			this.facturasService.deleteFactura(id_factura).subscribe(
			  () => {
				console.log(`Usuario with  id ${id_factura} deleted successfully.`);
        this.volverMostrar.emit(true);
			  },
			  (error) => {
				console.error(`Error deleting evento with id ${id_factura}: ${error}`);
			  }
			);
		  } else {
			console.error(`Evento with title ${id_factura} has not found.`);
	  }
  }

}
