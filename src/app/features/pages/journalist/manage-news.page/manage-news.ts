import { Component, ChangeDetectionStrategy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { startWith, switchMap, catchError, debounceTime, tap } from 'rxjs/operators';
import { SearchNews } from '../../../../shared/components/search-news/search-news';
import { ManageNavbar } from '../../../../shared/components/manage-navbar/manage-navbar';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Article } from '../../../../core/@types/Article';
import { ArticleService } from '../../../../core/services/article.service';
import { Page } from '../../../../core/@types/Pagination';

@Component({
  selector: 'app-manage-news',
  standalone: true,
  templateUrl: './manage-news.html',
  styleUrls: ['./manage-news.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SearchNews, ManageNavbar, NgOptimizedImage]
})
export class ManageNews implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private articleService = inject(ArticleService);

  search = new FormControl<string | null>('');
  tag = new FormControl<string | null>('');
  author = new FormControl<string | null>(''); 
  showDeleteModal = false;
  articleToDeleteSlug: string | null = null;

  private pageState$ = new BehaviorSubject<{ page: number; pageSize: number }>({ page: 1, pageSize: 10 });
  pageState = this.pageState$;

  private getEmptyPage(): Page<Article> {
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0
    };
  }

  articles$ = combineLatest([
    this.search.valueChanges.pipe(startWith(''), debounceTime(300)),
    this.tag.valueChanges.pipe(startWith(''), debounceTime(300)),
    this.author.valueChanges.pipe(startWith(''), debounceTime(300)),
    this.pageState$.asObservable()
  ]).pipe(
    tap(() => this.cdr.markForCheck()),
    switchMap(([search, tag, author, pageState]) =>
      this.articleService.getPublishedArticlesForUser(
        pageState.page - 1,
        pageState.pageSize,
        search ?? undefined,
        tag ? [tag] : undefined,
        author ?? undefined
      ).pipe(
        catchError(error => {
          return of(this.getEmptyPage(), error);
        })
      )
    )
  );

  articleList: Article[] = [];
  filteredArticles: Article[] = [];

  ngOnInit(): void {
    this.articleService.getPublishedArticles(0, 1000).subscribe(page => {
      this.articleList = page.content ?? [];
      this.filteredArticles = [...this.articleList];
      this.cdr.markForCheck();
    });    
  }

  changePage(page: number) {
    if (page < 1) return;
    const prev = this.pageState$.value;
    this.pageState$.next({ ...prev, page });
  }

  edit(slug: string) {
    this.router.navigate(['/edit-news', slug]);
  }

  delete(slug: string) {
    this.articleToDeleteSlug = slug;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.articleToDeleteSlug = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.articleToDeleteSlug) {
      this.articleService.deleteArticle(this.articleToDeleteSlug).subscribe(() => {
        this.pageState$.next({ ...this.pageState$.value });
        this.cancelDelete();
      });
    }
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.setPageSize(target.value);
    }
  }

  setPageSize(size: string) {
    this.pageState$.next({ page: 1, pageSize: +size });
  }

  clearFilters(): void {
    this.search.reset();
    this.tag.reset();
    this.author.reset();
  }

  applyFilters(filters: { search?: string; tag?: string; author?: string }) {
    this.filteredArticles = this.articleList.filter(article => {
      return (
        (!filters.search || article.title?.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.tag || article.tagNames?.some(t => t.name.toLowerCase().includes(filters.tag?.toLowerCase() ?? ''))) &&
        (!filters.author || article.authorName?.name?.toLowerCase().includes(filters.author?.toLowerCase() ?? ''))
      );
    });
  }
}