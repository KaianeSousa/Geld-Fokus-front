import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Page } from '../@types/Pagination';
import {Article} from '../@types/Article';
import { CreateArticle } from '../@types/Article/create.article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

   private readonly endpoint = 'http://localhost:8080/articles'
    private http = inject(HttpClient);

    createArticle(formData: FormData): Observable<Article> {
      return this.http.post<Article>(`${this.endpoint}/create-article`, formData);
    }
  
    updateArticle(id: string, dto: CreateArticle): Observable<Article> {
      return this.http.put<Article>(`${this.endpoint}/update-article/${id}`, dto);
    }

    updateArticleBySlug(
      slug: string, 
      dto: { title: string; subtitle: string; content: string }
    ): Observable<Article> {
      return this.http.put<Article>(`${this.endpoint}/update-article/${slug}`, dto);
    }
    
    deleteArticle(id: string): Observable<void> {
      return this.http.delete<void>(`${this.endpoint}/delete-article/${id}`);
    }
  
    getUserArticles(authorId: string, page = 0, size = 10): Observable<Article> {
      const params = new HttpParams()
        .set('page', page)
        .set('size', size);
      return this.http.get<Article>(`${this.endpoint}/search-by-author/${authorId}`, { params });
    }
  
    searchPublishedArticles(searchTerm: string, page = 0, size = 10): Observable<Article> {
      const params = new HttpParams()
        .set('searchTerm', searchTerm)
        .set('page', page)
        .set('size', size);
      return this.http.get<Article>(`${this.endpoint}/search`, { params });
    }
  
    getPublishedArticles(
      page = 0,
      size = 10,
      category?: string,
      tags?: string[]
    ): Observable<Page<Article>> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    
      if (category) {
        params = params.set('category', category);
      }
    
      if (tags && tags.length) {
        params = params.set('tags', tags.join(','));
      }
    
      return this.http.get<Page<Article>>(`${this.endpoint}/get-all-published`, { params });
    }
    
    getPublishedArticlesByAuthor(
      page = 0,
      size = 10,
      category?: string,
      tags?: string[],
      searchTerm?: string,
      authorName?: string
    ): Observable<Page<Article>> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    
      if (category) params = params.set('category', category);
      if (tags?.length) params = params.set('tags', tags.join(','));
      if (searchTerm) params = params.set('search', searchTerm);
      if (authorName) params = params.set('author', authorName);
    
      return this.http.get<Page<Article>>(`${this.endpoint}/get-all-published`, { params });
    }
    
    getArticlesByCategory(category: string, page = 0, size = 10): Observable<Page<Article>> {
      const params = new HttpParams()
        .set('category', category)
        .set('page', page)
        .set('size', size);
  
      return this.http.get<Page<Article>>(`${this.endpoint}/get-by-category`, { params });
    }
  
    getArticleBySlug(slug: string): Observable<Article> {
      return this.http.get<Article>(`${this.endpoint}/get-by-slug/${slug}`);
    }
  
    incrementViewCount(articleId: string): Observable<void> {
      return this.http.post<void>(`${this.endpoint}/increment-view-count/${articleId}/views`, {});
    }
}
