import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Article} from '../@types/Article';
import {ARTICLES_MOCK} from '../mock/articles-mock';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

   getLatestNews(): Observable<Article> {
      return of(ARTICLES_MOCK[0]);
   }
   getLatestNewsList(): Observable<Article[]> {
      return of(ARTICLES_MOCK.slice(0, 10));
   }

   getPopularNews(): Observable<Article[]> {
      return of(ARTICLES_MOCK.slice(0, 10).reverse());
   }

   getNewsBySlug(slug: string): Observable<Article | undefined> {
      const foundNews = ARTICLES_MOCK.find(article => article.slug === slug);
      return of(foundNews);
   }

   getAllNews(): Observable<Article[]> {
      return of(ARTICLES_MOCK);
   }

}
