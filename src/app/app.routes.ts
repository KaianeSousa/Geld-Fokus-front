import { Routes } from '@angular/router';
import { NewsDetails } from './features/pages/common/news-details/news-details';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/common/home/home.page').then(m => m.HomePage),
    title: 'Geld Fokus - Home'
  },
  {
    path: 'news/:slug',
    component: NewsDetails,
    title: 'Detalhes da Notícia'
  },
  {
    path: 'login/:role',
    loadComponent: () =>
      import('./features/pages/authentication/login/login.page').then((m) => m.LoginPage),
    title: 'Login'
  },
  {
    path: 'register-news',
    loadComponent: () =>
      import('./features/pages/journalist/register-news.page/register-news.page').then((m) => m.RegisterNewsPage),
    title: 'Register news - Geld Fokus'
  },
  {
    path: '**',
    redirectTo: '',
  }
];
