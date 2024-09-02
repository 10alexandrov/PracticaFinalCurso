import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUsuarios } from '../../interfaces/iusuarios';

@Component({
  selector: 'app-show-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-usuario.component.html',
  styleUrl: './show-usuario.component.scss'
})
export class ShowUsuarioComponent {


  @Input() usuarioMostrar!:IUsuarios;

}
