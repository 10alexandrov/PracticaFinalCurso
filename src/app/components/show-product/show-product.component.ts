import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/iproduct';
import { FacturasService } from '../../services/facturas.service';
import { ProductosService } from '../../services/productos.service';
import { UpdateProductComponent } from '../update-product/update-product.component';


@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [CommonModule, UpdateProductComponent,],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.scss'
})
export class ShowProductComponent implements OnInit {

  constructor( private productoService: ProductosService) {}
  @Input() productoMostrar!:IProduct;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  productoParaEditar:IProduct | null = null;

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

  regimenUpdate: boolean = false;  // Regimen de update producto nuevo


  encenderRegimenUpdate () {
    this.regimenUpdate = !this.regimenUpdate;  //
    console.log (this.regimenUpdate);
    if (this.regimenUpdate) {
      this.productoParaEditar = this.productoMostrar;
    }
  }
}
