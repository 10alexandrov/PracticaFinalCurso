import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';


export function matchPassword(c: AbstractControl): { [key: string]: boolean } | null {
  const pass1 = c.get('u_password')?.value;
  const pass2 = c.get('u_password2')?.value;
  return pass1 === pass2 ? null : { match: true };
 }

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl:  './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit{

  constructor(private fb: FormBuilder) {}
  public formCreateUser!: FormGroup;

  public sendDatos() {
     if (this.formCreateUser.valid) {
       console.log(this.formCreateUser.value);
     } else {
       console.log("Форма не валидна");
       this.formCreateUser.markAllAsTouched(); // Помечаем все поля как затронутые, чтобы показать ошибки
      }
    }

    ngOnInit(): void {
      this.formCreateUser = this.fb.group({
        u_nombre: ['', Validators.required],
        u_login: ['', Validators.required],
        passGroup: this.fb.group({
          u_password: ['', Validators.required],
          u_password2: ['', Validators.required],
        }, { validator: matchPassword }),
        u_role: ['', Validators.required],
        receiveInfo: [true]
      });
    }

    public checkPasswords() { const passGroup = this.formCreateUser.get('passGroup'); console.log('Текущие ошибки:', passGroup?.errors); }

}
