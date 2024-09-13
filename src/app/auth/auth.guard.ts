import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');
    console.log (token);
    if (token) {
      return true;  // Разрешаем доступ, если токен существует
    } else {
      this.router.navigate(['/login']);  // Перенаправляем на страницу входа, если токена нет
      return false;
    }
  }
}

