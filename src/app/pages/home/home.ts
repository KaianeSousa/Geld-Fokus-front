import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockWidgetComponent } from '../../components/stock-widget/stock-widget';
import { LatestNewsSectionComponent } from '../../components/latest-news-section/latest-news-section';
import { AllNewsSectionComponent } from '../../components/all-news-section/all-news-section';
import { NewsCarouselComponent } from "../../components/news-carousel/news-carousel";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    StockWidgetComponent,
    LatestNewsSectionComponent,
    AllNewsSectionComponent,
    NewsCarouselComponent
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  allNews = [
    {
      img: 'https://placehold.co/150x100?text=Notícia',
      title: 'Mercados se preparam para volatilidade em meio às manobras de Trump no Fed',
      source: 'Por Saiba Todas',
      time: '28 minutos atrás',
      description: 'Os mercados financeiros podem enfrentar outro surto de volatilidade esta...'
    },
    {
      img: 'https://placehold.co/150x100?text=Balança',
      title: 'Balança comercial brasileira tem superávit de US$4,132 bi em agosto, diz ministério',
      source: 'Por Saiba Todas',
      time: '28 minutos atrás',
      description: 'Conforme pesquisa da Reuters com economistas, que se referia aos dados de julho (Reuters)...'
    },
    {
      img: 'https://placehold.co/150x100?text=Balança',
      title: 'Balança comercial brasileira tem superávit de US$4,132 bi em agosto, diz ministério',
      source: 'Por Saiba Todas',
      time: '58 minutos atrás',
      description: 'Conforme pesquisa da Reuters com economistas, que se referia aos dados de julho (Reuters)...'
    },
    {
      img: 'https://placehold.co/150x100?text=Balança',
      title: 'Balança comercial brasileira tem superávit de US$4,132 bi em agosto, diz ministério',
      source: 'Por Saiba Todas',
      time: '58 minutos atrás',
      description: 'Conforme pesquisa da Reuters com economistas, que se referia aos dados de julho (Reuters)...'
    }
  ];
  
  acoes = [
    { symbol: 'PETR3', value: '32,76', change: '+0.49%', positive: true },
    { symbol: 'VALE3', value: '61,20', change: '-1.27%', positive: false },
    { symbol: 'MGLU3', value: '1,97', change: '+2.07%', positive: true },
    { symbol: 'ITUB4', value: '23,28', change: '-0.17%', positive: false },
    { symbol: 'BBDC4', value: '14,48', change: '+0.21%', positive: true }
  ];
  
  acoesBaratas = [
    { symbol: 'COGN3', value: '2,20', change: '+1.38%', positive: true },
    { symbol: 'IRBR3', value: '42,14', change: '-2.56%', positive: false },
    { symbol: 'CIEL3', value: '4,78', change: '+1.49%', positive: true }
  ];
  
  acoesDestaque = [
    { symbol: 'EMBR3', value: '21,08', change: '+3.24%', positive: true },
    { symbol: 'AZUL4', value: '13,10', change: '-1.50%', positive: false },
    { symbol: 'GOLL4', value: '7,79', change: '+2.50%', positive: true }
  ];
}
