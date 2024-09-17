import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  u_login = '';
  u_password = '';
  public formLogin!: FormGroup;

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  login(): void {

    this.u_login = this.formLogin.value.u_login;
    this.u_password = this.formLogin.value.u_password;
    console.log (this.u_login, this.u_password);

    this.authService.login(this.u_login, this.u_password).subscribe( (response: any) => {
       if (response.token) {
         this.authService.setToken(response.token);
         this.authService.setTokenExpiry (Date.now() + response.expires_in*1000);
         this.authService.setRole(response.role)
         this.router.navigate(['/inicio']);
         } else { console.log('Error: autorización fallida'); }
     },
     (error) => { console.log('Error en el proceso de login:', error); } );
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      u_login: [''],
      u_password: [''],
      receiveInfo: [true]
    });
  }

}

