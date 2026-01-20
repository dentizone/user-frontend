import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavsService {
private token = 'YOUR_SECRET_TOKEN';
  headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  constructor(private readonly _httpClient: HttpClient) { }
  addToFavs(postId:string):Observable<any>{
      return this._httpClient.post<any>('https://api.dentizone.store/api/Favorites',{postId});
    }
    getAllFav():Observable<any>{
    return this._httpClient.get<any>(`https://api.dentizone.store/api/Favorites`,{headers:this.headers});
    }
    removeFavByID(FavItemID:string):Observable<any>{
      return this._httpClient.delete<any>(`https://api.dentizone.store/api/Favorites/${FavItemID}`)
    }
}
