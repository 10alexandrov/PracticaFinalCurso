import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IFactura } from '../../interfaces/ifactura';

@Component({
  selector: 'app-show-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-factura.component.html',
  styleUrl: './show-factura.component.scss'
})
export class ShowFacturaComponent {

  @Input() facturaMostrar!:IFactura;

}
