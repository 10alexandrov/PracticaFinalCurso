import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { IUsuarios } from '../../interfaces/iusuarios';
import { UsuariosService } from '../../services/usuarios.service';


export function matchPassword(c: AbstractControl): { [key: string]: boolean } | null {
  const pass1 = c.get('u_password')?.value;
  const pass2 = c.get('u_password2')?.value;
  return pass1 === pass2 ? null : { match: true };
 }

 export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const validLength = password.length >= 8;
  if (!validLength || !hasNumber || !hasLetter || !hasSpecial) {
     return { passwordStrength: true };
     }
   return null;
 }

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl:  './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})


export class CrearUsuarioComponent implements OnInit{

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService) {}
  @Input() regimenUpdate: boolean = false;
  @Input() usuarioParaEditar:IUsuarios | null = null;
  @Output () volverMostrar = new EventEmitter <boolean> (); // volver a mostrar lista de usuarios
  public formCreateUser!: FormGroup;

  public sendDatos() {
    if (this.formCreateUser.valid) {
      const usuarioNew: IUsuarios = {
        u_nombre: this.formCreateUser.value.u_nombre,
        u_login: this.formCreateUser.value.u_login,
        u_password: this.formCreateUser.value.passGroup.u_password, // Извлекаем пароль из passGroup
        u_role: this.formCreateUser.value.u_role,
        u_active: this.formCreateUser.value.u_active
      };
      if (!this.regimenUpdate) {    // si no regimen update - creamos producto nuevo
        this.usuarioService.createUsuario(usuarioNew).subscribe((response) => this.volverMostrar.emit(true));
        console.log(usuarioNew);
      } else {   // si es regimen update - update producto
        if (this.usuarioParaEditar && this.usuarioParaEditar.usuario_id) {
          this.usuarioService.actualizarUsuario(this.usuarioParaEditar.usuario_id, usuarioNew).subscribe((response) => this.volverMostrar.emit(true));
          console.log("editado: " + usuarioNew);
        }
      }
    } else {
       console.log("form no es validate");
       this.formCreateUser.markAllAsTouched(); // Помечаем все поля как затронутые, чтобы показать ошибки
      }
    }

    ngOnInit(): void {
      this.formCreateUser = this.fb.group({
        u_nombre: ['', Validators.required],
        u_login: ['', Validators.required],

        passGroup: this.fb.group({
          u_password: ['', [Validators.required, Validators.minLength(8), passwordValidator]], // Проверка длины и силы пароля
          u_password2: ['', Validators.required],
         }, { validator: matchPassword }),
        u_role: ['', Validators.required],
        u_active: [true],                        // User active default = true
        receiveInfo: [true]
      });


      if (this.regimenUpdate) {
        console.log ("regimen editar usuario:" + this.regimenUpdate);
        if (this.usuarioParaEditar) {
          this.formCreateUser.patchValue({
            u_nombre: this.usuarioParaEditar.u_nombre,
            u_login: this.usuarioParaEditar.u_login,
            u_password: this.usuarioParaEditar.u_password,
            u_password2: this.usuarioParaEditar.u_password,
            u_role: this.usuarioParaEditar.u_role,
            u_active: !!this.usuarioParaEditar.u_active,
          });
        }
      }

    }

    volverMostrarUsuario() {
      this.volverMostrar.emit(false);
    }

}
