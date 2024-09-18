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

// function para logout

logout (): void {
  this.authService.logout ();
}

}

