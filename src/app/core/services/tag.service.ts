import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../@types/Pagination';
import { Tag } from '../@types/Tag';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  private readonly baseUrl = 'http://localhost:8080/tags'; 
  private http = inject(HttpClient);

  createTag(tagName: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/create-tag/${tagName}`, null, { responseType: 'text' });
  }

  getAllTags(
    page = 0,
    size = 10,
    sort = 'name'
  ): Observable<Page<Tag>> {  
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
  
    return this.http.get<Page<Tag>>(`${this.baseUrl}/find-all-tags`, { params });
  }

  updateTag(tagName: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/update-tag/${tagName}`, null, { responseType: 'text' });
  }

  deleteTag(tagName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-tag/${tagName}`);
  }
}
