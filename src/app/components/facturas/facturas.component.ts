import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductFilterPipe } from '../../pipes/product-filter.pipe'
import { Icategoria } from '../../interfaces/icategoria';
import { IProduct } from '../../interfaces/iproduct';
import { ShowProductComponent } from '../show-product/show-product.component';
import { ProductsService } from '../../services/products.service';
import { CategoriasService } from '../../services/categorias.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent {

}
