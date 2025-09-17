// search-news.ts
import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-news',
  standalone: true,
  templateUrl: './search-news.html',
  styleUrls: ['./search-news.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SearchNews implements OnInit {
  search = new FormControl<string | null>('');
  tag = new FormControl<string | null>('');
  author = new FormControl<string | null>('');

  private pageState$ = new BehaviorSubject<{ page: number; pageSize: number }>({ page: 1, pageSize: 10 });

  // 🔹 Emite filtros para o pai
  @Output() filtersChanged = new EventEmitter<{ search?: string; tag?: string; author?: string; page?: number; pageSize?: number }>();

  constructor() {}

  ngOnInit(): void {
    combineLatest([
      this.search.valueChanges.pipe(startWith('')),
      this.tag.valueChanges.pipe(startWith('')),
      this.author.valueChanges.pipe(startWith('')),
      this.pageState$.asObservable()
    ]).subscribe(([search, tag, author, pageState]) => {
      this.filtersChanged.emit({
        search: search ?? undefined,
        tag: tag ?? undefined,
        author: author ?? undefined,
        page: pageState.page,
        pageSize: pageState.pageSize
      });
    });
  }

  changePage(page: number) {
    if (page < 1) return;
    const prev = this.pageState$.value;
    this.pageState$.next({ ...prev, page });
  }

  setPageSize(size: number) {
    this.pageState$.next({ page: 1, pageSize: +size });
  }
}
