import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Posts } from '../../core/models/posts';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(private _httpClient:HttpClient) { }

  getPostById(id:string):Observable<any>{
    return this._httpClient.get(`https://localhost:7258/api/Posts/${id}`)
  }

  updatePost(id: string, postData: any): Observable<any> {
    return this._httpClient.put(`https://localhost:7258/api/Posts/${id}`, postData)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
