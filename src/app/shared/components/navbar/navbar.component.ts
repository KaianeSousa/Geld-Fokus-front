import { Component, inject, HostListener, EventEmitter, Output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLogged;
  openMenu = false;
  showLoginDropdown = false;
  showProfileDropdown = false;

  @Output() categorySelected = new EventEmitter<string>();

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
     this.showProfileDropdown = false;
  }

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  toggleProfileDropdown(event: Event) {
    event.stopPropagation();
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  goToManageArticles() {
    this.router.navigate(['/manage-news']);
     this.showProfileDropdown = false;
  }

  goToPublishArticle() {
    this.router.navigate(['/register-news']);
     this.showProfileDropdown = false;

  }
}
