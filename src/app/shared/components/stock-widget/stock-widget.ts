import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Stock} from '../../../core/@types/Stock';
import {StockChartComponent} from '../stock-chart/stock-chart.component';

@Component({
  selector: 'app-stock-widget',
  standalone: true,
   imports: [CommonModule, StockChartComponent],
  templateUrl: './stock-widget.html',
  styleUrls: ['./stock-widget.scss']
})
export class StockWidgetComponent implements OnChanges {
   @Input() title: string = '';
   @Input() stocks: Stock[] | null = null;
   @Input() isLoading: boolean = false;
   @Input() error: Error | null = null;

   public selectedStock: Stock | null = null;

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['stocks'] && this.stocks && this.stocks.length > 0) {
         this.selectedStock = this.stocks[0];
      }
   }

   selectStock(stock: Stock): void {
      this.selectedStock = stock;
   }
}
