import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = 'https://api.dentizone.store/api/Review';

  constructor(private readonly http: HttpClient) {}
  
  postNewReview(orderID:string,stars:number,comment:string){
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
    const body = {
      orderID,
      stars,
      comment
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
