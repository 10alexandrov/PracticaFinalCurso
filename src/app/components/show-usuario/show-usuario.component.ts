import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUsuarios } from '../../interfaces/iusuarios';
import { UsuariosDeleteService } from '../../services/usuarios-delete.service';

@Component({
  selector: 'app-show-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-usuario.component.html',
  styleUrl: './show-usuario.component.scss'
})
export class ShowUsuarioComponent {

  constructor( private usuarioDeleteService: UsuariosDeleteService) {}
  @Input() usuarioMostrar!:IUsuarios;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios



  deleteUsuario(id_usuario: number): void {

		if (id_usuario) {
			this.usuarioDeleteService.deleteUsuario(id_usuario).subscribe(
			  () => {
				console.log(`Usuario with  id ${id_usuario} deleted successfully.`);
        this.volverMostrar.emit(true);
			  },
			  (error) => {
				console.error(`Error deleting evento with id ${id_usuario}: ${error}`);
			  }
			);
		  } else {
			console.error(`Evento with title ${id_usuario} has not found.`);
	  }
  }

}
