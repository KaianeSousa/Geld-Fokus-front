import { Component } from '@angular/core';
import {StockWidgetComponent} from "../stock-widget/stock-widget";

@Component({
  selector: 'app-stocks-sidebar',
    imports: [
        StockWidgetComponent
    ],
  templateUrl: './stocks-sidebar.html',
  styleUrl: './stocks-sidebar.scss'
})
export class StocksSidebar {

   acoes = [
      {symbol: 'PETR3', value: '32,76', change: '+0.49%', positive: true},
      {symbol: 'VALE3', value: '61,20', change: '-1.27%', positive: false},
      {symbol: 'MGLU3', value: '1,97', change: '+2.07%', positive: true},
      {symbol: 'ITUB4', value: '23,28', change: '-0.17%', positive: false},
      {symbol: 'BBDC4', value: '14,48', change: '+0.21%', positive: true}
   ];

   acoesBaratas = [
      {symbol: 'COGN3', value: '2,20', change: '+1.38%', positive: true},
      {symbol: 'IRBR3', value: '42,14', change: '-2.56%', positive: false},
      {symbol: 'CIEL3', value: '4,78', change: '+1.49%', positive: true}
   ];

   acoesDestaque = [
      {symbol: 'EMBR3', value: '21,08', change: '+3.24%', positive: true},
      {symbol: 'AZUL4', value: '13,10', change: '-1.50%', positive: false},
      {symbol: 'GOLL4', value: '7,79', change: '+2.50%', positive: true}
   ]; 
}
