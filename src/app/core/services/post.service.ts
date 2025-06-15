import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ICategory {
  iconUrl: string;
  id: string;
  name: string;
}

export interface IPost {
  title: string;
  description: string;
  price: number;
  condition: string;
  street: string;
  city: string;
  categoryId: string;
  subCategoryId: string;
  expireDate?: Date;
  assetIds: string[];
}

export interface IImageUploadResponse {
  id: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/Catalog/categories`);
  }

  getSubcategories(categoryId: string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/Catalog/categories/${categoryId}/subcategories`);
  }

  uploadImage(file: File): Observable<IImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IImageUploadResponse>(`${this.API_URL}/Upload/image`, formData);
  }

  deleteImage(imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/Upload/${imageId}`);
  }

  createPost(postData: IPost): Observable<any> {
    return this.http.post(`${this.API_URL}/Posts`, postData);
  }
} 