import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface University {
  id: string;
  name: string;
  domain: string;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private readonly API_URL = `${environment.apiUrl}/api/Universities`;

  constructor(private http: HttpClient) {}

  getSupportedUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.API_URL}/supported`);
  }
} 