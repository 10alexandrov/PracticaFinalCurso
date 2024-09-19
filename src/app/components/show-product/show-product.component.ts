import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/iproduct';
import { FacturasService } from '../../services/facturas.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.scss'
})
export class ShowProductComponent implements OnInit {

  constructor( private productoService: ProductosService) {}
  @Input() productoMostrar!:IProduct;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios


  ngOnInit() {

  }

  deleteProducto(id_product: number): void {
    console.log ('delete');

		if (id_product) {
			this.productoService.deleteProducto(id_product).subscribe(
			  () => {
				console.log(`Producto with  id ${id_product} deleted successfully.`);
        this.volverMostrar.emit(true);
			  },
			  (error) => {
				console.error(`Error deleting evento with id ${id_product}: ${error}`);
			  }
			);
		  } else {
			console.error(`Evento with title ${id_product} has not found.`);
	  }
  }
}
