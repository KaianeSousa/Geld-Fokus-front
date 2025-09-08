import { Routes } from '@angular/router';
import { NewsDetails } from './pages/news-details/news-details';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Geld Fokus - Home'
  },
  {
    path: 'noticia/:slug',
    component: NewsDetails,
    title: 'Detalhes da Notícia'
  },
  {
    path: '**',
    redirectTo: '',
  }
];
