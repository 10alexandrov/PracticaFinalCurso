import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IFactura } from '../../interfaces/ifactura';
import { IProduct } from '../../interfaces/iproduct';
import { ShowProductComponent } from '../show-product/show-product.component';
import { ProductsService } from '../../services/products.service';
import { CategoriasService } from '../../services/categorias.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent {

  constructor (private usuariosService: UsuariosService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD

headers = {nombre: "Nombre", login: "Login", role: "Role"};

usuarios: IFactura[] = [] // inicializar array productos

}
