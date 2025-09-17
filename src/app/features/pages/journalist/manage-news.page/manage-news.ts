import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { NewsService } from '../../../../core/services/news.service';
import { News } from '../../../../core/models/news.model';
import { SearchNews } from '../../../../shared/components/search-news/search-news';
import { ManageNavbar } from '../../../../shared/components/manage-navbar/manage-navbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-news',
  standalone: true,
  templateUrl: './manage-news.html',
  styleUrls: ['./manage-news.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SearchNews, ManageNavbar]
})
export class ManageNews implements OnInit {

  search = new FormControl<string | null>('');
  tag = new FormControl<string | null>('');
  author = new FormControl<string | null>('');

  private pageState$ = new BehaviorSubject<{ page: number; pageSize: number }>({ page: 1, pageSize: 10 });
  pageState = this.pageState$;

  newsList: News[] = [];
  filteredNews: News[] = [];

  news$ = combineLatest([
    this.search.valueChanges.pipe(startWith('')),
    this.tag.valueChanges.pipe(startWith('')),
    this.author.valueChanges.pipe(startWith('')),
    this.pageState$.asObservable()
  ]).pipe(
    switchMap(([search, tag, author, pageState]) =>
      this.newsService.getNews({
        search: search ?? undefined,
        tag: tag ?? undefined,
        author: author ?? undefined,
        page: pageState.page,
        pageSize: pageState.pageSize
      })
    )
  );

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
 
    this.newsService.getNews({ page: 1, pageSize: 1000 }).subscribe(news => {
      this.newsList = news.items;
      this.filteredNews = [...this.newsList];
    });
  }

  changePage(page: number) {
    if (page < 1) return;
    const prev = this.pageState$.value;
    this.pageState$.next({ ...prev, page });
  }

  edit(newsId: string) {
    this.router.navigate(['/noticias', newsId, 'editar']);
  }

  delete(newsId: string) {
    const confirmed = window.confirm('Deseja realmente excluir esta notícia?');
    if (!confirmed) return;

    this.newsService.deleteNews(newsId).subscribe(() => {
      const current = this.pageState$.value;
      this.pageState$.next({ ...current });
    });
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target) return;
    this.setPageSize(target.value);
  }

  setPageSize(size: string) {
    this.pageState$.next({ page: 1, pageSize: +size });
  }

  applyFilters(filters: { search?: string; tag?: string; author?: string }) {
    this.filteredNews = this.newsList.filter(news => {
      return (
        (!filters.search || news.title?.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.tag || news.tags?.some(t => t.name.toLowerCase().includes(filters.tag?.toLowerCase() ?? ''))) &&
        (!filters.author || news.author?.toLowerCase().includes(filters.author?.toLowerCase() ?? ''))
      );
    });
  }
}
