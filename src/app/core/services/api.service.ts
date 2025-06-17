import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://apit.gitnasr.com/api'; 

  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string, options: object = {}): Observable<T> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    return this.http.get<T>(`${this.baseUrl}/${normalizedEndpoint}`, options);
  }

  post<T>(endpoint: string, body: any, options: object = {}): Observable<T> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    return this.http.post<T>(`${this.baseUrl}/${normalizedEndpoint}`, body, options);
  }

  put<T>(endpoint: string, body: any, options: object = {}): Observable<T> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    return this.http.put<T>(`${this.baseUrl}/${normalizedEndpoint}`, body, options);
  }

  delete<T>(endpoint: string, options: object = {}): Observable<T> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    return this.http.delete<T>(`${this.baseUrl}/${normalizedEndpoint}`, options);
  }
}
