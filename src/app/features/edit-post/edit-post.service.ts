import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(private _httpClient:HttpClient) { }

  getPostById(id:string):Observable<any>{
    return this._httpClient.get(`https://apit.gitnasr.com/api/Posts/${id}`)
  }

  updatePost(id:string,postData:any):Observable<any>{
    return this._httpClient.put(`https://apit.gitnasr.com/api/Posts/${id}`,postData)
  }
}
