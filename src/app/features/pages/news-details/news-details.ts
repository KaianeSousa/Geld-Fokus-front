// news-details.ts (continuação)
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Article } from '../../../core/@types/Article';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import { TitleSectionComponent } from '../../../shared/components/title-section/title-section.component';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../core/services/news.service';

@Component({
   selector: 'app-news-details',
   imports: [
      TitleSectionComponent,
      AsyncPipe,
      DatePipe,
      NgOptimizedImage,
   ],
   templateUrl: './news-details.html',
   styleUrl: './news-details.scss'
})
export class NewsDetails implements OnInit {
   private route = inject(ActivatedRoute);
   private newsService = inject(NewsService);

   newsState$!: Observable<{
      loading: boolean;
      news: Article | null;
      error: Error | null;
   }>;

   ngOnInit(): void {
      this.newsState$ = this.route.paramMap.pipe(
         switchMap(params => {
            const slug = params.get('slug');
            if (!slug) {
               return of({ loading: false, news: null, error: 'Notícia não encontrada' });
            }

            return this.newsService.getNewsBySlug(slug).pipe(
               map(newsData => ({ loading: false, news: newsData ?? null, error: null })),
               catchError(err => of({ loading: false, news: null, error: err }))
            );
         }),
         startWith({ loading: true, news: null, error: null })
      );
   }
}
