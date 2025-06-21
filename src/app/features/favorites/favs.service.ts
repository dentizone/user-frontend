import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavsService {

  constructor(private readonly _httpClient: HttpClient) { }
  addToFavs(postId:string):Observable<any>{
      return this._httpClient.post<any>('https://apit.gitnasr.com/api/Favorites',{postId});
    }
}
