import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ProfileService } from '../../Profile/service/profile.service';

@Injectable({
  providedIn: 'root',
})
export class QAService {
  private baseUrl = 'https://apit.gitnasr.com/api/Qa/questions';

  token;
  headers;
  constructor(
    private readonly http: HttpClient,
    private readonly profileService: ProfileService
  ) {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  getQaByPostId(postId: string): Observable<any> {
    const url = `${this.baseUrl}/${postId}`;

    return this.http.get(url, { headers: this.headers });
  }

  addNewQuestion(postId: string, text: string): Observable<any> {
    const url = 'https://apit.gitnasr.com/api/Qa';
    const body = {
      postId: postId,
      text: text,
    };
    return this.http.post(url, body, { headers: this.headers });
  }
  addAnswer(questionId: string, text: string): Observable<any> {
    const url = `https://apit.gitnasr.com/api/Qa/answer/${questionId}`;
    const body = {
      text: text,
    };
    return this.http.post(url, body, { headers: this.headers });
  }
}
