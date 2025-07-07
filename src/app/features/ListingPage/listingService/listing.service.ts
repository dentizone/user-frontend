import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsResponse } from '../../../core/models/posts';
@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private readonly apiUrl = 'https://apit.gitnasr.com/api/Posts/search';
  private readonly token = 'YOUR_SECRET_TOKEN';
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  constructor(private readonly http: HttpClient) {}

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`https://apit.gitnasr.com/api/Posts/${id}`, {
      headers: this.headers,
    });
  }

  getPostsByCategory(params: any): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.apiUrl, {
      headers: this.headers,
      params,
    });
  }

  getPostBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`https://apit.gitnasr.com/api/Posts/by/${slug}`, {
      headers: this.headers,
    });
  }
}
