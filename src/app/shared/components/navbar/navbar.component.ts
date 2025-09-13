import { Component, inject, HostListener } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
    imports: [
        NgOptimizedImage
    ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLogged;

  openMenu = false;

  showLoginDropdown = false;


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && this.showLoginDropdown) {
      this.showLoginDropdown = false;
    }
  }

  toggleLoginDropdown(event: Event) {
    event.stopPropagation(); 
    this.showLoginDropdown = !this.showLoginDropdown;
  }

  goToLoginAs(role: string): void {
    this.showLoginDropdown = false; 
    this.router.navigate(['/login', role]);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToIbovespaPage(): void {
    this.router.navigate(['/ibovespa']);
  }

  goToP500Page(): void {
    this.router.navigate(['/p500']);
  }

  goToCriptocurrencyPage(): void {
    this.router.navigate(['/criptocurrency']);
  }

  goToRealEstatePage(): void {
    this.router.navigate(['/real-estate']);
  }

  goToEarningsPage(): void {
    this.router.navigate(['/earnings'])
  }

  goToETFsPage(): void {
    this.router.navigate(['./etfs'])
  }

  goToREITsPage(): void {
    this.router.navigate(['./reits'])
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
