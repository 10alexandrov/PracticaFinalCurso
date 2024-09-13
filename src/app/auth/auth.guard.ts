import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Доступ разрешён
    } else {
      this.router.navigate(['/login']); // Перенаправление на страницу логина
      return false; // Доступ запрещён
    }
  }
}

