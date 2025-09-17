import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateArticle } from '../../../../core/@types/Article/create.article';
import { ArticleStatus } from '../../../../core/enumeration/ArticleStatus';
import { ArticleService } from '../../../../core/services/article.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/@types/Tag';

@Component({
  selector: 'app-register-news',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgSelectModule],
  templateUrl: './register-news.page.html',
  styleUrl: './register-news.page.scss'
})
export class RegisterNewsPage implements OnInit {
  private articleService = inject(ArticleService);
  private toastService = inject(ToastService);
  private tagService = inject(TagService);

  register: CreateArticle = {
    title: '',
    subtitle: '',
    content: '',
    slug: '',
    authorName: '',
    articleStatus: ArticleStatus.PUBLISHED,
    categoryName: '',
    tagNames: []
  };

  selectedFile: File | null = null;
  newsState$!: Observable<{ loading: boolean; availableTags: Tag[] | null; total: number }>;
  dropdownOpen = false;

  ngOnInit(): void {
    this.getAllTags();
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: NgForm): void {
    if (!this.selectedFile) {
      this.toastService.showError('Por favor, selecione uma imagem para a capa.');
      return;
    }

    if (form.invalid) {
      this.toastService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    const articleDto = { ...this.register };
    formData.append('article', new Blob([JSON.stringify(articleDto)], { type: 'application/json' }));
    formData.append('picture', this.selectedFile);

    this.articleService.createArticle(formData).subscribe({
      next: () => {
        this.toastService.showSuccess('Registro de notícia criado com sucesso.');
      },
      error: () => {
        this.toastService.showError('Erro no registro de notícia, tente novamente!');
      }
    });
  }

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
    if (!this.register.tagNames.includes(tagName)) {
      this.register.tagNames.push(tagName); 
    }
    this.dropdownOpen = false;
  }

  removeTag(tagName: string, event: Event): void {
    event.stopPropagation(); 
    this.register.tagNames = this.register.tagNames.filter(t => t !== tagName); 
  }
}