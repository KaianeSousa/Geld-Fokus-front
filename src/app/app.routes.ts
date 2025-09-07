import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NewsDetails } from './pages/news-details/news-details';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    pathMatch: 'full'
  }
];
