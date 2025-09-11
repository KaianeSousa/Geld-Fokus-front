import { Routes } from '@angular/router';
import { NewsDetails } from './features/pages/news-details/news-details';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/home/home.page').then(m => m.HomePage),
    title: 'Geld Fokus - Home'
  },
  {
    path: 'news/:slug',
    component: NewsDetails,
    title: 'Detalhes da Notícia'
  },
  {
    path: '**',
    redirectTo: '',
  }
];
