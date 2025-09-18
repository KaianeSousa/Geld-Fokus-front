import { Component, inject, OnInit } from '@angular/core';
import { StockWidgetComponent } from "../stock-widget/stock-widget";
import { Stock } from '../../../core/@types/Stock';
import { StockService } from '../../../core/services/stock.service';
import {map, Observable, of, startWith} from 'rxjs';
import {Article} from '../../../core/@types/Article';
import {catchError} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

interface StocksState {
   loading: boolean;
   stocks: Stock[] | null;
   error: Error | null;
}

@Component({
  selector: 'app-stocks-sidebar',
   imports: [StockWidgetComponent, AsyncPipe],
  templateUrl: './stocks-sidebar.html',
  styleUrl: './stocks-sidebar.scss'
})
export class StocksSidebar implements OnInit {
   expensiveStocksState$!: Observable<StocksState>;
   cheapStocksState$!: Observable<StocksState>;
   featuredStocksState$!: Observable<StocksState>;

   private stockService = inject(StockService);

   ngOnInit(): void {
      this.loadAllStocks();
   }

   private loadAllStocks(): void {
      this.expensiveStocksState$ = this.stockService.getExpensiveStocks().pipe(
         map(stocks => ({ loading: false, stocks: stocks, error: null })),
         startWith({ loading: true, stocks: null, error: null }),
         catchError(error => of({ loading: false, stocks: null, error: error })),
      );

      this.cheapStocksState$ = this.stockService.getCheapestStocks().pipe(
         map(stocks => ({ loading: false, stocks: stocks, error: null })),
         startWith({ loading: true, stocks: null, error: null }),
         catchError(error => of({ loading: false, stocks: null, error: error }))
      );

      this.featuredStocksState$ = this.stockService.getFeaturedStocks().pipe(
         map(stocks => ({ loading: false, stocks: stocks, error: null })),
         startWith({ loading: true, stocks: null, error: null }),
         catchError(error => of({ loading: false, stocks: null, error: error }))
      );
   }
}
