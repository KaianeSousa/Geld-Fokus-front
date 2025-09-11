import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './shared/components/navbar/navbar';
import {Footer} from './shared/components/footer/footer';
import {StocksSidebar} from './shared/components/stocks-sidebar/stocks-sidebar';

@Component({
  selector: 'app-root',
   imports: [RouterOutlet, Navbar, Footer, StocksSidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'geld-fokus-front';
}
