import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  model = { email: '', password: '' };
  loading = false;

  constructor(private router: Router) {}

  submit(): void {
    this.loading = true;
    // Simular autenticación básica: aceptar cualquier credencial tras 700ms
    setTimeout(() => {
      this.loading = false;
      // Redirigir a la raíz (App)
      this.router.navigateByUrl('/');
    }, 700);
  }
}
