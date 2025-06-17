import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  return this._httpClient.get<Category[]>(this._apiConfig.buildUrl('Catalog/categories'))
    .pipe(
      catchError(error => {
        // Optionally log the error here
        return throwError(() => new Error('Unable to fetch categories'));
      })
    );
}

}
