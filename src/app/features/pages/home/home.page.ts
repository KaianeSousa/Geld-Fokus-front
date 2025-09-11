import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestNewsSectionComponent } from '../../../shared/components/latest-news-section/latest-news-section';
import { AllNewsSectionComponent } from '../../../shared/components/all-news-section/all-news-section';
import { NewsCarouselComponent } from '../../../shared/components/news-carousel/news-carousel';
import { Article } from '../../../core/@types/Article';
import { ArticleService } from '../../../core/services/article.service';
import { Observable, combineLatest, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LatestNewsSectionComponent,
    AllNewsSectionComponent,
    NewsCarouselComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  private articleService = inject(ArticleService);

  combinedState$!: Observable<{
    loading: boolean;
    recent: Article[] | null;
    popular: Article[] | null;
  }>;

  ngOnInit(): void {
    const recentNewsState$ = this.articleService.getPublishedArticles(0, 5).pipe(
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
}
