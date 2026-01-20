import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EditPostService {
  constructor(private readonly _httpClient: HttpClient) {}

  getPostById(id: string): Observable<any> {
    return this._httpClient.get(`https://api.dentizone.store/api/Posts/${id}`);
  }

  updatePost(id: string, postData: any): Observable<any> {
    return this._httpClient
      .put(`https://api.dentizone.store/api/Posts/${id}`, postData)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
