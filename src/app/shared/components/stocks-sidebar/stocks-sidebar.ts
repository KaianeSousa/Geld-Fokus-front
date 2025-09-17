import { Component, inject, OnInit } from '@angular/core';
import { StockWidgetComponent } from "../stock-widget/stock-widget";
import { Stock } from '../../../core/@types/Stock';
import { StockService } from '../../../core/services/stock.service';

@Component({
  selector: 'app-stocks-sidebar',
  imports: [StockWidgetComponent],
  templateUrl: './stocks-sidebar.html',
  styleUrl: './stocks-sidebar.scss'
})
export class StocksSidebar implements OnInit {
  acoes: Stock[] = [];
  acoesBaratas: Stock[] = [];
  acoesDestaque: Stock[] = [];

  private stockService = inject(StockService);

  ngOnInit(): void {
    this.stockService.getExpensiveStocks().subscribe(stocks => {
      this.acoes = stocks;
    });

    this.stockService.getCheapestStocks().subscribe(stocks => {
      this.acoesBaratas = stocks;
    });

    this.stockService.getFeaturedStocks().subscribe(stocks => {
      this.acoesDestaque = stocks;
    });
  }
}