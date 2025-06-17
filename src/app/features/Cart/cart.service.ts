import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient: HttpClient) { }

  getCart():Observable<Cart[]>{
    return this._httpClient.get<Cart[]>('https://apit.gitnasr.com/api/Cart');
  }
  addToCart(postId:string):Observable<Cart>{
    return this._httpClient.post<Cart>('https://apit.gitnasr.com/api/Cart',{postId});
  }
  removeFromCart(cartId:string):Observable<void>{
    return this._httpClient.delete<void>(`https://apit.gitnasr.com/api/Cart/${cartId}`)
  }
  clearCart():Observable<void>{
    return this._httpClient.delete<void>('https://apit.gitnasr.com/api/Cart/clear')
  }
}
