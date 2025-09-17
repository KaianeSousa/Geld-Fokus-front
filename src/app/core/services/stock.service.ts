import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Stock } from '../@types/Stock';
import { StockResponse } from '../@types/Stock/StockResponse';


@Injectable({
    providedIn: 'root'
  })
  export class StockService {
    private readonly endpoint = 'http://localhost:8080/stocks'; 
  
    private http = inject(HttpClient);
  
    getExpensiveStocks(): Observable<Stock[]> {
      return this.http.get<StockResponse[]>(`${this.endpoint}/expensive`).pipe(
        map(stocks => this.transformStocks(stocks))
      );
    }
  
    getCheapestStocks(): Observable<Stock[]> {
      return this.http.get<StockResponse[]>(`${this.endpoint}/cheapest`).pipe(
        map(stocks => this.transformStocks(stocks))
      );
    }
  
    getFeaturedStocks(): Observable<Stock[]> {
      return this.http.get<StockResponse[]>(`${this.endpoint}/featured`).pipe(
        map(stocks => this.transformStocks(stocks))
      );
    }
  
    private transformStocks(stocks: StockResponse[]): Stock[] {
      return stocks.map(stock => ({
        symbol: stock.summary.symbol,
        name: stock.summary.shortName,
        logoUrl: stock.summary.logoUrl,
        value: stock.summary.value,
        change: stock.summary.change.percent,
        positive: stock.summary.positive
      }));
    }
  }