import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 private apiUrl = 'https://apit.gitnasr.com/api/Users/me';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('accessToken'); 

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
  getUserPosts():Observable<any>{
    const token = localStorage.getItem('accessToken'); 

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`https://apit.gitnasr.com/api/Posts/`, { headers });
  }
}
