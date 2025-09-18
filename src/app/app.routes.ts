import { Routes } from '@angular/router';
import { NewsDetails } from './features/pages/common/news-details/news-details';
import { authGuard } from './core/guards/auth.guard';

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
      import('./features/pages/journalist/register-news.page/register-news.page')
        .then((m) => m.RegisterNewsPage),
    title: 'Register news - Geld Fokus',
    canActivate: [authGuard]
  },
  {
    path: 'edit-news/:slug', 
    loadComponent: () =>
      import('./features/pages/journalist/edit-news.page/edit-news.page')
        .then((m) => m.EditNewsPage),
    title: 'Edit news - Geld Fokus',
    canActivate: [authGuard]
  },  
  {
    path: 'manage-news',
    loadComponent: () =>
      import('./features/pages/journalist/manage-news.page/manage-news').then((m) => m.ManageNews),
    title: 'Manage news - Geld Fokus',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
