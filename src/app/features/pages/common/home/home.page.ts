import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { LatestNewsSection } from '../../../../shared/sections/latest-news-section/latest-news-section';
import { AllNewsSection } from '../../../../shared/sections/all-news-section/all-news-section';
import { NewsCarouselComponent } from '../../../../shared/components/news-carousel/news-carousel.component';
import { StocksSidebar } from '../../../../shared/components/stocks-sidebar/stocks-sidebar';
import { Article } from '../../../../core/@types/Article';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LatestNewsSection,
    AllNewsSection,
    NewsCarouselComponent,
    StocksSidebar
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  selectedCategory: string | null = null;
  private articleService = inject(ArticleService);

  combinedState$!: Observable<{
    loading: boolean;
    recent: Article[] | null;
    popular: Article[] | null;
  }>;

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(category?: string): void {
    const recentNewsState$ = (category
      ? this.articleService.getArticlesByCategory(category, 0, 5)
      : this.articleService.getPublishedArticles(0, 5)
    ).pipe(
      map(page => ({ loading: false, news: page.content })),
      startWith({ loading: true, news: null }),
      catchError(() => of({ loading: false, news: null }))
    );

    const popularNewsState$ = this.articleService.getPublishedArticles(0, 5).pipe(
      map(page => ({ loading: false, news: page.content })),
      startWith({ loading: true, news: null }),
      catchError(() => of({ loading: false, news: null }))
    );

    this.combinedState$ = combineLatest([recentNewsState$, popularNewsState$]).pipe(
      map(([recent, popular]) => ({
        loading: recent.loading || popular.loading,
        recent: recent.news,
        popular: popular.news
      }))
    );
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.loadArticles(category);
  }
}
