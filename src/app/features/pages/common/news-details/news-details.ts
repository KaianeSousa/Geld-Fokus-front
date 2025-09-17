import {Observable } from 'rxjs';
import {Component, inject, } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Article } from '../../../../core/@types/Article';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import { TitleSectionComponent } from '../../../../shared/components/title-section/title-section.component';
import { ArticleService } from '../../../../core/services/article.service';

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
export class NewsDetails {
   private route = inject(ActivatedRoute);
   private articleService = inject(ArticleService);

   newsState$!: Observable<{
      loading: boolean;
      news: Article | null;
      error: Error | null;
   }>;

  /* ngOnInit(): void {
      this.newsState$ = this.route.paramMap.pipe(
         switchMap(params => {
            const slug = params.get('slug');
            if (!slug) {
               return of({ loading: false, news: null, error: 'Notícia não encontrada' });
            }

            return this.articleService.getNewsBySlug(slug).pipe(
               map(newsData => ({ loading: false, news: newsData ?? null, error: null })),
               catchError(err => of({ loading: false, news: null, error: err }))
            );
         }),
         startWith({ loading: true, news: null, error: null })
      );
   } */
}
