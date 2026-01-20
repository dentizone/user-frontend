import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http : HttpClient) 
  {}
  private token = 'YOUR_SECRET_TOKEN';
headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  GetAllOrders(): Observable<any> {
    return this.http.get<any>('https://api.dentizone.store/api/Order/my-orders', {headers: this.headers})
  }
    GetOrderDetails(id:string ): Observable<any> {
    return this.http.get<any>(`https://api.dentizone.store/api/Order/${id}`, {headers: this.headers})
  }
}
