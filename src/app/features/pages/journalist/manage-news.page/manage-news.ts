import {Component, ChangeDetectionStrategy, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, startWith, switchMap, catchError, debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ArticleService} from '../../../../core/services/article.service';
import {Page} from '../../../../core/@types/Pagination';
import {Article} from '../../../../core/@types/Article';


interface ArticleState {
   loading: boolean;
   response: Page<Article> | null;
   error: Error | null;
}

@Component({
   selector: 'app-manage-news',
   standalone: true, templateUrl: './manage-news.html',
   styleUrls: ['./manage-news.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage]
})
export class ManageNews implements OnInit {
   private pageState$ = new BehaviorSubject<{ page: number; pageSize: number }>({page: 1, pageSize: 5});
   state$!: Observable<ArticleState>;

   private router = inject(Router);
   private articleService = inject(ArticleService);

   searchTerm = new FormControl<string>('', {nonNullable: true});


   ngOnInit(): void {
      const triggers$ = combineLatest([
         this.searchTerm.valueChanges.pipe(startWith(this.searchTerm.value)),
         this.pageState$
      ]);

      this.state$ = triggers$.pipe(
         debounceTime(300),
         switchMap(([searchTerm, pageState]) =>
            this.articleService.getPublishedArticlesByAuthor(
               pageState.page - 1,
               pageState.pageSize,
               searchTerm || undefined
            ).pipe(
               map(response => ({loading: false, response: response, error: null})),
               startWith({loading: true, response: null, error: null}),
               catchError(error => of({loading: false, response: null, error: error}))
            )
         )
      );
   }

   changePage(page: number) {
      const currentState = this.pageState$.value;
      this.pageState$.next({...currentState, page});
   }

   edit(slug: string) {
      return this.router.navigate(['/artigos/editar', slug]);
   }

   delete(articleId: number) {
      if (!confirm('Deseja realmente excluir este artigo?')) return;

      this.articleService.deleteArticle(articleId).subscribe(() => {
         this.pageState$.next(this.pageState$.value);
      });
   }

   onPageSizeChange(event: Event) {
      const size = (event.target as HTMLSelectElement)?.value;
      if (size) {
         this.pageState$.next({page: 1, pageSize: +size});
      }
   }

   clearFilters(): void {
      this.searchTerm.reset();
   }
}
