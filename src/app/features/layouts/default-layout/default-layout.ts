import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { StocksSidebar } from '../../../shared/components/stocks-sidebar/stocks-sidebar';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.scss'
})
export class DefaultLayout {}
