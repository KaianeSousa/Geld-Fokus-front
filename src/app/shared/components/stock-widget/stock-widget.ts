import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-widget.html',
  styleUrls: ['./stock-widget.scss']
})
export class StockWidgetComponent {
  @Input() title = 'Ações';
  @Input() stocks: { symbol: string, value: string, change: string, positive: boolean }[] = [];
}
