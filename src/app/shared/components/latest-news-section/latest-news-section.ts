import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import {TitleSectionComponent} from '../title-section/title-section.component';
import {Article} from '../../../core/@types/Article';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {ArticleService} from '../../../core/services/article.service';

Swiper.use([Navigation]);

@Component({
   selector: 'app-latest-news-section',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, TitleSectionComponent],
   templateUrl: './latest-news-section.html',
   styleUrls: ['./latest-news-section.scss']
})
export class LatestNewsSectionComponent implements OnInit {
   private articleService = inject(ArticleService);
   newsState$!: Observable<{ loading: boolean; news: Article[] | null }>;


   ngOnInit() {
      this.getNews();
   }

   getNews(page = 0, size = 10): void {
      this.newsState$ = this.articleService
        .getPublishedArticles(page, size)
        .pipe(
          map(pageData => ({
            loading: false,
            news: pageData.content, 
          })),
          startWith({ loading: true, news: null }),
          catchError(() => of({ loading: false, news: null }))
        );
    }
}
