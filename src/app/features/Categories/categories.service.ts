import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }

 getCategories(): Observable<Category[]> {
  return this._httpClient.get<Category[]>(`/api/api/Catalog/categories`);
}

}
