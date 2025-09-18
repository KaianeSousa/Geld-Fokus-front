import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {StocksSidebar} from './shared/components/stocks-sidebar/stocks-sidebar';
import {ToastContainer} from './shared/components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  standalone: true,
   imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, StocksSidebar, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'geld-fokus-front';
  private router = inject(Router);

  isHome(): boolean {
    return this.router.url === '/';
  }

  isNewDetails(): boolean {
    return this.router.url.startsWith('/news');
  }
}
