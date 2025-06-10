import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _httpClient: HttpClient,
    private _apiConfig: ApiConfigService
  ) { }

 getCategories(): Observable<Category[]> {
  return this._httpClient.get<Category[]>(this._apiConfig.buildUrl('Catalog/categories'));
}

}
