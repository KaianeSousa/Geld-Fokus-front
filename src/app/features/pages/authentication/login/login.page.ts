import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { AuthRequest } from "../../../../core/@types/User/auth.resquest";
import { AuthService } from "../../../../core/services/auth.service";
import { ToastService } from "../../../../core/services/toast.service";
import { User } from "../../../../core/@types/User";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  public role: string | null = null;
  public headerTitle = 'Login';

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isLoading = false;
  showPassword = false;
  auth : AuthRequest = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.role = params.get('role');
      this.updateHeader();
    });
  }

  updateHeader(): void {
    if (this.role) {
      switch (this.role) {
        case 'jornalista':
          this.headerTitle = 'Login do jornalista';
          break;
        case 'editor':
          this.headerTitle = 'Login do editor';
          break;
        case 'visitante':
          this.headerTitle = 'Login do visitante';
          break;
        default:
          this.headerTitle = 'Login';
          break;
      }
    }
  }


  onLogin(): void {
    if (!this.auth.email || !this.auth.password) {
      this.toastService.showError('Por favor, preencha o email e a senha.');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.auth).subscribe({
      next: (user: User) => {
        console.log('Logged in successfully!')
        this.toastService.showSuccess(`Bem-vindo(a) de volta, ${user.name}!`);
        return this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.toastService.showError('Email ou senha inválidos. Tente novamente.');
        console.error('Erro no login:', err);
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    return this.router.navigate(['/register']);
  }

  toResetPassword() {
    return this.router.navigate(['/recovery-password']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}