import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart';
import { OrderRequest } from './order-request';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly _httpClient: HttpClient) { }

  getCart():Observable<Cart[]>{
    return this._httpClient.get<Cart[]>('https://api.dentizone.store/api/Cart');
  }
  addToCart(postId:string):Observable<Cart>{
    return this._httpClient.post<Cart>('https://api.dentizone.store/api/Cart',{postId});
  }
  removeFromCart(cartId:string):Observable<void>{
    return this._httpClient.delete<void>(`https://api.dentizone.store/api/Cart/${cartId}`)
  }
  clearCart():Observable<void>{
    return this._httpClient.delete<void>('https://api.dentizone.store/api/Cart/clear')
  }

  checkOut(order: OrderRequest): Observable<any> {
    return this._httpClient.post('https://api.dentizone.store/api/Order', order);
 }
}
