import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { SearchNews } from '../../../../shared/components/search-news/search-news';
import { ManageNavbar } from '../../../../shared/components/manage-navbar/manage-navbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../../../core/@types/Article';
import { ArticleService } from '../../../../core/services/article.service'; 

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

  articleList: Article[] = [];
  filteredArticles: Article[] = [];
  articles$ = combineLatest([
    this.search.valueChanges.pipe(startWith('')),
    this.tag.valueChanges.pipe(startWith('')),
    this.author.valueChanges.pipe(startWith('')),
    this.pageState$.asObservable()
  ]).pipe(
    switchMap(([search, tag, author, pageState]) =>
      this.articleService.getPublishedArticlesByAuthor(
        pageState.page - 1,
        pageState.pageSize,
        tag ?? undefined,
        tag ? [tag] : undefined,
        search ?? undefined,
        author ?? undefined
      )
    )
  );
  
  private router = inject(Router);
  private articleService = inject(ArticleService);

  ngOnInit(): void {
    this.articleService.getPublishedArticles(0, 1000).subscribe(page => {
      this.articleList = page.content ?? [];
      this.filteredArticles = [...this.articleList];
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

  delete(articleId: number) {
    const confirmed = window.confirm('Deseja realmente excluir este artigo?');
    if (!confirmed) return;

    this.articleService.deleteArticle(articleId.toString()).subscribe(() => {
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
    this.filteredArticles = this.articleList.filter(article => {
      return (
        (!filters.search || article.title?.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.tag || article.tagNames?.some(t => t.name.toLowerCase().includes(filters.tag?.toLowerCase() ?? ''))) &&
        (!filters.author || article.authorName?.name?.toLowerCase().includes(filters.author?.toLowerCase() ?? ''))
      );
    });
  }
}
