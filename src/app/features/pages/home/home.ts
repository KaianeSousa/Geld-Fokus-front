import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LatestNewsSectionComponent} from '../../../shared/components/latest-news-section/latest-news-section';
import {AllNewsSectionComponent} from '../../../shared/components/all-news-section/all-news-section';
import {NewsCarouselComponent} from "../../../shared/components/news-carousel/news-carousel";
import {Article} from '../../../core/@types/Article';
import {NewsService} from '../../../core/services/news.service';
import {catchError, combineLatest, map, Observable, of, startWith} from 'rxjs';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [
      CommonModule,
      LatestNewsSectionComponent,
      AllNewsSectionComponent,
      NewsCarouselComponent,
   ],
   templateUrl: './home.html',
   styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
   private newsService = inject(NewsService);

   combinedState$!: Observable<{
      loading: boolean;
      recent: Article[] | null;
      popular: Article[] | null;
   }>;

   ngOnInit() {
      const recentNewsState$ = this.newsService.getLatestNewsList().pipe(
         map(newsData => ({loading: false, news: newsData})),
         startWith({loading: true, news: null}),
         catchError(() => of({loading: false, news: null}))
      );

      const popularNewsState$ = this.newsService.getPopularNews().pipe(
         map(newsData => ({loading: false, news: newsData})),
         startWith({loading: true, news: null}),
         catchError(() => of({loading: false, news: null}))
      );

      this.combinedState$ = combineLatest(
         [recentNewsState$, popularNewsState$]
      ).pipe(
         map(([recentState, popularState]) => {
            return {
               loading: recentState.loading || popularState.loading,
               recent: recentState.news,
               popular: popularState.news
            };
         })
      );
   }
}
