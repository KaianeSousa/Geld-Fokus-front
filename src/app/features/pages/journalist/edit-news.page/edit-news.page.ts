import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateArticle } from '../../../../core/@types/Article/create.article';
import { ArticleStatus } from '../../../../core/enumeration/ArticleStatus';
import { ArticleService } from '../../../../core/services/article.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/@types/Tag';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/@types/Category';
import { Article } from '../../../../core/@types/Article';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgSelectModule, DatePipe, NgOptimizedImage],
  templateUrl: './edit-news.page.html',
  styleUrl: './edit-news.page.scss'
})
export class EditNewsPage implements OnInit {
  private articleService = inject(ArticleService);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);
  private tagService = inject(TagService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  article: CreateArticle = {
    title: '',
    subtitle: '',
    content: '',
    articleStatus: ArticleStatus.PUBLISHED,
    categoryName: '',
    tagNames: []
  };

  selectedFile: File | null = null;
  newsState$!: Observable<{ loading: boolean; availableTags: Tag[] | null; total: number }>;
  articleState$!: Observable<{
    loading: boolean;
    article: Article | null;
    error: Error | null;
  }>;
  
  categoryState$!: Observable<{ loading: boolean; availableCategories: Category[] | null; total: number }>;
  dropdownOpen = false;

  slug!: string;
  article$!: Observable<Article | null>;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          return of(null);
        }
        this.slug = slug; 
        return this.articleService.getArticleBySlug(slug);
      }),
      catchError(err => {
        this.toastService.showError('Erro ao carregar notícia', err);
        return of(null);
      })
    ).subscribe(articleData => {
      if (articleData) {
        this.article = { 
          title: articleData.title,
          subtitle: articleData.subtitle,
          content: articleData.content,
          articleStatus: articleData.articleStatus,
          categoryName: articleData.category?.toString() || '',
          tagNames: Array.isArray(articleData.tagNames)
          ? articleData.tagNames.map(tag => 
              typeof tag === 'string' ? tag : tag.name
            )
          : (articleData.tagNames as string)?.split(',') || []
        };
      }
    });
  
    this.getAllTags();
    this.getAllCategories();
  }
  

  getAllTags(page = 0, size = 10): void {
    this.newsState$ = this.tagService
      .getAllTags(page, size, 'name')
      .pipe(
        map((response: { content: Tag[]; totalElements: number }) => ({
          loading: false,
          availableTags: response.content,
          total: response.totalElements
        })),
        startWith({ loading: true, availableTags: [], total: 0 }),
        catchError(() => of({ loading: false, availableTags: [], total: 0 }))
      );
  }

  getAllCategories(page = 0, size = 10): void {
    this.categoryState$ = this.categoryService
      .getAllCategories(page, size, 'name')
      .pipe(
        map((response: { content: Category[]; totalElements: number }) => ({
          loading: false,
          availableCategories: response.content,
          total: response.totalElements
        })),
        startWith({ loading: true, availableCategories: [], total: 0 }),
        catchError(() => of({ loading: false, availableCategories: [], total: 0 }))
      );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.toastService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const dto = {
      title: this.article.title,
      subtitle: this.article.subtitle,
      content: this.article.content,
    };
  
    this.articleService.updateArticleBySlug(this.slug, dto).subscribe({
      next: () => {
        this.toastService.showSuccess('Notícia atualizada com sucesso!');
        this.router.navigate(['/manage-news']);
      },
      error: (error) => {
        this.toastService.showError('Erro ao atualizar a notícia, tente novamente!', error);
      }
    });
  }
  
  
  /*onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.toastService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('article', new Blob([JSON.stringify(this.article)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile);
    }

    this.articleService.updateArticleBySlug(this.slug, formData).subscribe({
      next: () => {
        this.toastService.showSuccess('Notícia atualizada com sucesso!');
        this.router.navigate(['/manage-news']);
      },
      error: () => {
        this.toastService.showError('Erro ao atualizar a notícia, tente novamente!');
      }
    });
  }*/

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 200);
  }

  selectOption(tagName: string, event: Event): void {
    event.stopPropagation();
    if (!this.article.tagNames.includes(tagName)) {
      this.article.tagNames.push(tagName);
    }
    this.dropdownOpen = false;
  }

  removeTag(tagName: string, event: Event): void {
    event.stopPropagation();
    this.article.tagNames = this.article.tagNames.filter(t => t !== tagName);
  }
}
