import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFactura } from '../../interfaces/ifactura';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-show-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-factura.component.html',
  styleUrl: './show-factura.component.scss'
})
export class ShowFacturaComponent {

  constructor( private facturasService: FacturasService) {}
  @Input() facturaMostrar!:IFactura;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios


  deleteFactura(id_factura: number): void {
    console.log ('delete');

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
