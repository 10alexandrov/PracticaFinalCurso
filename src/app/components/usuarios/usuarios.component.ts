import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IusuariosFilterPipe  } from '../../pipes/iusuarios-filter.pipe'
import { IUsuarios } from '../../interfaces/iusuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ShowUsuarioComponent } from '../show-usuario/show-usuario.component';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowUsuarioComponent, IusuariosFilterPipe, CrearUsuarioComponent, MenuComponent ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  constructor (private usuariosService: UsuariosService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD


headers = {nombre: "Nombre", login: "Login", role: "Role", active:"Active"};
roles = ['admin', 'vendedor', 'client', 'receptor', 'reponedor','manager'];

usuarios: IUsuarios[] = [] // inicializar array usuarios

ngOnInit () {

  this.obtenerListaUsuarios();

}

usuarioSearch = '';

roleSearch = '';

// Mostrar usuarios   ****************

mostrarUsuarioId:number = 0;  // numero usuario para mostrar
usuarioMostrar!: IUsuarios;   // использовать "!" для non-null assertion


regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar usuarios
regimenCrear:boolean = false;  // encender regimen crear nuevu usuario

mostrarUsuario(id:number) {
  const findUsuario = this.usuarios.find(usuario => usuario.usuario_id == id);
  if (findUsuario) {
   this.usuarioMostrar = findUsuario;
  } else {
    console.log('Error: no hay usuario con este id: ', id);
  }

  this.regimenMostrar = true;   // Encender el modo de visualisar de usuario
}

crearNuevoUsuario() {
  this.regimenCrear = true;   // Encender el modo de visualisar de usuario
}

// Volver a modo de lista de usuarios
volverListaUsuarias ($flag: boolean) {
  this.regimenMostrar = false;   // Apagar el modo de visualisar de usuario
  this.regimenCrear = false;   // Apagar el modo de crear de usuario

  if ($flag) this.obtenerListaUsuarios();
}

// funccion para obtener la lista con todas usuarios
obtenerListaUsuarios() {
  this.usuariosService.getUsuarios().subscribe (
    (data) => {this.usuarios = data;},
    (error) => { console.log('Error data de producto', error)}
  );

  console.log(this.usuarios);

}

}
