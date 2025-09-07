// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NewsDetails } from './pages/news-details/news-details';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Geld Fokus - Home'
  },
  {
    path: 'noticia/:slug', // Rota de exemplo para uma notícia
    component: NewsDetails,
    title: 'Detalhes da Notícia'
  },
  {
    path: '**', // Rota coringa para redirecionar para a home
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }