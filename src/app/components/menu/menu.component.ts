import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

constructor (private authService: AuthService,
              private router: Router
) {};

role = localStorage.getItem('role');  // obtener role usuario




isActive( route:string): boolean {
  return this.router.url === route;
}



// function para logout

logout (): void {
  this.authService.logout ();
}

}

