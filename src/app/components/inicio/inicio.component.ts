import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ MenuComponent, MenuMobileComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
