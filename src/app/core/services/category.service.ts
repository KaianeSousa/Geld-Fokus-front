import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../@types/Category';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private readonly baseUrl = 'http://localhost:8080/category'; 

  private http = inject(HttpClient);

  createCategory(tagName: string, categoryDto: Category): Observable<string> {
    return this.http.post(`${this.baseUrl}/create-category/${tagName}`, categoryDto, { responseType: 'text' });
  }

  getAllCategories(page = 0, size = 10, sort= 'name'): Observable<{ content: Category[], totalElements: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<{ content: Category[], totalElements: number }>(`${this.baseUrl}/find-all-categories`, { params });
  }

  updateCategory(id: string, categoryDto: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/update-category/${id}`, categoryDto);
  }

  deleteCategory(categoryName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-category/${categoryName}`);
  }
}
