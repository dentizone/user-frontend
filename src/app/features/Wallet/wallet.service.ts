import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient : HttpClient) { }
  getBalance(): Observable<any>
  {
    return this.httpClient.get("https://apit.gitnasr.com/api/Wallet/balance")
  }
  withdarawalRequest(amount:any): Observable<any>
  {
      return this.httpClient.post("https://apit.gitnasr.com/api/Wallet/withdraw", amount)
  }
}
