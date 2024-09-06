import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


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
          u_password: ['', [Validators.required, Validators.minLength(8), passwordValidator]], // Проверка длины и силы пароля
          u_password2: ['', Validators.required],
         }, { validator: matchPassword }),
        u_role: ['', Validators.required],
        u_active: [true],                        // User active default = true
        receiveInfo: [true]
      });
    }

    public checkPasswords() { const passGroup = this.formCreateUser.get('passGroup'); console.log('Текущие ошибки:', passGroup?.errors); }

}
