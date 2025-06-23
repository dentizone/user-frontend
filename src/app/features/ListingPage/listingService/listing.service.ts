import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'https://apit.gitnasr.com/api/Posts/search';
  private token = 'YOUR_SECRET_TOKEN';
  headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  constructor(private http: HttpClient) { }
  
  
  getPostById(id:string):Observable<any>{
    return this.http.get<any>(`https://apit.gitnasr.com/api/Posts/${id}`,{headers:this.headers});
  }

  getPostsByCategory(category: string): Observable<any> {
    

    const body = {
      category: category 
    };

    return this.http.get<any>(this.apiUrl,{headers: this.headers,params:body });
  }
}
