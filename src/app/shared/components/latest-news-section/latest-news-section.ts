import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import {TitleSectionComponent} from '../title-section/title-section.component';
import {Article} from '../../../core/@types/Article';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {NewsService} from '../../../core/services/news.service';

Swiper.use([Navigation]);

@Component({
   selector: 'app-latest-news-section',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, TitleSectionComponent],
   templateUrl: './latest-news-section.html',
   styleUrls: ['./latest-news-section.scss']
})
export class LatestNewsSectionComponent implements OnInit {
   private newsService = inject(NewsService);
   newsState$!: Observable<{
      loading: boolean;
      news: Article | null;
   }>;

   ngOnInit() {
      this.getLatestNews();
   }

   getLatestNews() {
      this.newsState$ = this.newsService.getLatestNews().pipe(
         map(newsData => ({ loading: false, news: newsData })),
         startWith({ loading: true, news: null }),
         catchError(() => of({ loading: false, news: null }))
      );
    }
}
