import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-navbar.html',
  styleUrls: ['./manage-navbar.scss']
})
export class ManageNavbar {
  private isMenuOpen = false;

  @HostBinding('class.opened-menu') get openedMenuClass() {
    return this.isMenuOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
