import { Routes } from '@angular/router';
import { ConteinerComponent } from './components/container/conteiner/conteiner.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent  },  // перенаправление на страницу продуктов
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },  // перенаправление на страницу продуктов
  { path: 'inicio', component: InicioComponent,canActivate: [AuthGuard] },
  { path: 'productos', component: ConteinerComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios',
     component: UsuariosComponent,
     canActivate: [AuthGuard, rolesGuard],
     data: { roles: ['admin']}  },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // обработка несуществующих маршрутов
];
