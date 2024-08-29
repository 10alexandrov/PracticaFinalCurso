import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.scss'
})
export class ShowProductComponent implements OnInit {

  @Input() productoMostrar!:IProduct;

  ngOnInit() {

  }

}
