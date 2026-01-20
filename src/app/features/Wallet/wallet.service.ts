import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private readonly httpClient: HttpClient) {}
  getBalance(): Observable<any> {
    return this.httpClient.get('https://api.dentizone.store/api/Wallet/balance');
  }
  withdarawalRequest(amount: any): Observable<any> {
    return this.httpClient.post(
      'https://api.dentizone.store/api/Wallet/withdraw',
      amount
    );
  }
}
