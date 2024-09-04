import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent implements OnInit{

  public formCreateUser = new FormGroup ({
    u_nombre: new FormControl (),
    u_login: new FormControl (),
    U_password: new FormControl (),
    u_role: new FormControl ()
  })

  ngOnInit(): void {

  }

}
