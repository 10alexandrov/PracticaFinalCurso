import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent implements OnInit {

  constructor (private authService: AuthService,
    private router: Router
) {};

role = localStorage.getItem('role');  // obtener role usuario

isMenuVisible: boolean = false;

menuVisible (): void {
  this.isMenuVisible = !this.isMenuVisible;
}

  isActive( route:string): boolean {
    return this.router.url === route;
  }

  // function para logout

logout (): void {
  this.authService.logout ();
}

ngOnInit(): void {

}

}
