// src/app/core/services/news.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { News, Tag } from '../models/news.model';

export interface NewsQueryParams {
  search?: string;
  tag?: string;
  author?: string;
  date?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

const MOCK_DATA: News[] = Array.from({ length: 34 }).map((_, i) => {
  const tags: Tag[] = i % 4 === 0 ? [{ id: '1', name: 'Ibovespa' }] : [{ id: '2', name: 'Provimentos' }, { id: '3', name: 'Mercado Imobiliário' }];
  return {
    id: `${i + 1}`,
    title: `Ibovespa tem oscilação discreta ${i + 1}`,
    description: `Ibovespa tinha oscilações discretas nesta quinta-feira, buscando se sustentar... (${i + 1})`,
    imageUrl: 'assets/mock/thumbnail.jpg',
    author: i % 3 === 0 ? 'Douglas Holanda' : 'Equipe Editorial',
    date: new Date(Date.now() - i * 86400000).toISOString(),
    tags
  };
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor() {}

  getNews(params: NewsQueryParams = {}): Observable<PagedResult<News>> {
    const search = (params.search || '').toLowerCase();
    const tag = (params.tag || '').toLowerCase();
    const author = (params.author || '').toLowerCase();

    const filtered = MOCK_DATA.filter((n) => {
      const matchesSearch = !search || (n.title + n.description).toLowerCase().includes(search);
      const matchesTag = !tag || (n.tags || []).some((t: Tag) => t.name.toLowerCase().includes(tag));
      const matchesAuthor = !author || (n.author || '').toLowerCase().includes(author);
      return matchesSearch && matchesTag && matchesAuthor;
    });

    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({ items, total: filtered.length }).pipe(delay(250));
  }

  deleteNews(id: string): Observable<void> {
    // Em produção chamar API; aqui apenas simula
    return of(void 0).pipe(delay(200));
  }
}
