import { Routes } from '@angular/router';
import { ConteinerComponent } from './components/container/conteiner/conteiner.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },  // перенаправление на страницу продуктов
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ConteinerComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }  // обработка несуществующих маршрутов
];
