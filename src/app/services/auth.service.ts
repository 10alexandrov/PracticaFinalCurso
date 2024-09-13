import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private router: Router) {}

  login(u_login: string, u_password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { u_login, u_password });
  }

// function logout con remove Token

logout(): void {
  const token = this.getToken();

  if (token) {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      () => {
        this.removeToken();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Ошибка при logout:', error);
      }
    );
  } else {
    this.router.navigate(['/login']);
  }
}

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  setTokenExpiry (expiry: number) {
    localStorage.setItem('tokenExpiry', expiry.toString());
  }

  getTokenExpiry(): number | null {
    const expiry = localStorage.getItem('tokenExpiry');
    return expiry ? parseInt(expiry, 10) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  removeToken (): void {
    localStorage.removeItem("jwtToken");
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    return expiry ? Date.now() > expiry : true;
  }

  // Проверка аутентификации пользователя
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(); // Проверка наличия токена и его срока действия
  }

  checkTokenExpiration(): boolean {
    const expiry = this.getTokenExpiry();

    // Если токен истекает через 5 минут, можно показать уведомление или обновить токен
    if (expiry && Date.now() > (expiry - 5 * 60 * 1000)) {
      this.removeToken ();
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
