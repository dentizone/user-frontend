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
    return this._httpClient.get(`https://apit.gitnasr.com/api/Posts/${id}`)
  }

  updatePost(id:string,postData:Posts):Observable<Posts>{
    return this._httpClient.put<Posts>(`https://apit.gitnasr.com/api/Posts/${id}`,postData)
      .pipe(
        catchError((error) => {
          // Optionally log or transform the error here
          return throwError(() => error);
        })
      );
  }
}
