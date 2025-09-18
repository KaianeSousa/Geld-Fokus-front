import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';

interface StockHistory {
   date: string;
   close: number;
}

@Component({
  selector: 'app-stock-chart',
   imports: [
      BaseChartDirective
   ],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.scss'
})
export class StockChartComponent implements OnChanges {
   @Input() history: StockHistory[] = [];
   @Input() stockSymbol: string = '';

   @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

   public lineChartData: ChartData<'line'> = {
      labels: [],
      datasets: [
         {
            data: [],
            label: 'Preço de Fechamento (R$)',
            borderColor: '#9bbef8',
            backgroundColor: 'rgba(59,130,246,0.11)',
            borderWidth: 2,
            pointStyle: 'circle',
            pointRadius: 1,
            fill: true,
            tension: 0.3
         }
      ]
   } as ChartData<'line'>;

   public lineChartLabels: string[] = [];

   public lineChartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            display: false,
         },
      },
      scales: {
         y: {
            beginAtZero: false,
            border: {
               display: false
            },
            grid: {
               drawTicks: false,
            },
            ticks: {
               count: 3,
               callback: (value) => `R$ ${(value as number).toFixed(2)}`,
               mirror: true,
               crossAlign: 'far',
               padding: 0,
               color: '#666',
            }
         },
         x: {
            ticks: {
               callback: (value, index, ticks) => {
                  const totalLabels = ticks.length;

                  const maxLabels = 4;
                  const interval = Math.ceil(totalLabels / maxLabels);

                  if (index === 0 || index === totalLabels - 1 || index % interval === 0) {

                     const label = this.lineChartLabels[index];
                     const [day, month] = label.split('/');

                     return `${day}/${month}`;
                  }

                  return null;
               },
               maxRotation: 0,
               autoSkip: false,
            }
         }
      }
   };

   public lineChartType = 'line' as const;

   constructor() {
      Chart.register(...registerables);
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['history'] && this.history?.length > 0) {
         this.prepareChartData();
      }
   }

   private prepareChartData(): void {
      const sortedHistory = [...this.history].sort((a, b) =>
         this.parseDate(a.date).getTime() - this.parseDate(b.date).getTime()
      );

      this.lineChartLabels = sortedHistory.map(item => item.date);
      const dataPoints = sortedHistory.map(item => item.close);

      this.lineChartData = {
         labels: this.lineChartLabels,
         datasets: [
            {
               ...this.lineChartData.datasets[0],
               data: dataPoints,
               label: `Fechamento de ${this.stockSymbol}`
            }
         ]
      };

      this.chart?.update();
   }

   private parseDate(dateString: string): Date {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
   }

}
