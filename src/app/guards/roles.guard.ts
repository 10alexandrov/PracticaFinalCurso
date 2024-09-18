import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Сервис для аутентификации

@Injectable({
  providedIn: 'root'
})
export class rolesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles']; // Ожидаемая роль для маршрута
    const usuarioRole = this.authService.getRole(); // Получаем роль пользователя

    if (expectedRoles.includes(usuarioRole)) {
      return true;
    }

    // Если роль не соответствует, перенаправляем на страницу с ошибкой или логин
    this.router.navigate(['/access-denied']);
    return false;
  }
}
