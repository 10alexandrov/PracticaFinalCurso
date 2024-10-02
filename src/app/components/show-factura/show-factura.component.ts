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
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  mercancias: IMercancia[] = [] // inicializar array usuarios

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

  editarFactura () {}

  volverMostrarFactura () {
    console.log ("volver");
    this.volverMostrar.emit(false);
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
