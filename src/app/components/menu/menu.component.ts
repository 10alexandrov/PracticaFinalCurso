import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

constructor (private authService: AuthService) {};

role = localStorage.getItem('role');  // obtener role usuario
// abrir submenu
submenu = [false,false,false,false];

submenuToggle (num: number) {
  console.log (num);
  for (let i =0; i<this.submenu.length; i++) {
    if (i == num) {
      this.submenu[i] = ! this.submenu[i];
    } else {
      this.submenu[i] = false
    }
  }
}

// function para logout

logout (): void {
  this.authService.logout ();
}

}

