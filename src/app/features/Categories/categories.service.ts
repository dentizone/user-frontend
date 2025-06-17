import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _apiService: ApiService
  ) { }

 getCategories(): Observable<Category[]> {
  return this._apiService.get<Category[]>('Catalog/categories')
    .pipe(
      catchError(error => {
        // Optionally log the error here
        return throwError(() => new Error('Unable to fetch categories'));
      })
    );
}

}
