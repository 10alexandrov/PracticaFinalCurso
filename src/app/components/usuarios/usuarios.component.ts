import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IusuariosFilterPipe  } from '../../pipes/iusuarios-filter.pipe'
import { IUsuarios } from '../../interfaces/iusuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ShowUsuarioComponent } from '../show-usuario/show-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowUsuarioComponent, IusuariosFilterPipe ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  constructor (private usuariosService: UsuariosService,
    private sanitizer: DomSanitizer) {}  // injectar relaciones con BD


headers = {nombre: "Nombre", login: "Login", role: "Role", dateAt:"Created"};
roles = ['admin', 'vendedor', 'client', 'receptor', 'reponedor','manager'];

usuarios: IUsuarios[] = [] // inicializar array usuarios

ngOnInit () {
  this.usuariosService.getUsuarios().subscribe (
    (data) => {this.usuarios = data;},
    (error) => { console.log('Error data de producto', error)}
  );

}

usuarioSearch = '';

roleSearch = '';

// Mostrar producto   ****************

mostrarUsuarioId:number = 0;  // numero usuario para mostrar
usuarioMostrar!: IUsuarios;   // использовать "!" для non-null assertion
regimenMostrar:boolean = false;   // encender regimen entre lista de productos/mostrar producto

mostrarUsuario(id:number) {
  const findUsuario = this.usuarios.find(usuario => usuario.usuario_id == id);
  if (findUsuario) {
   this.usuarioMostrar = findUsuario;
  } else {
    console.log('Error: no hay usuario con este id: ', id);
  }

  this.regimenMostrar = true;   // Encender el modo de visualisar de usuario
}

// Volver a modo de lista de usuarios
volverMostrarUsuario () {
  this.regimenMostrar = false;   // Encender el modo de visualisar de usuario
  console.log(this.regimenMostrar);
}

}
