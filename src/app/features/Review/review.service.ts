import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://apit.gitnasr.com/api/Review';

  constructor(private http: HttpClient) {}
  
  token = 'YOUR_SECRET_TOKEN'; 
  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  postNewReview(orderID:string,stars:number,comment:string){
    const body = {
      orderID,
      stars,
      comment
    };

    return this.http.post(this.apiUrl, body, { headers:this.headers });
  }
}
