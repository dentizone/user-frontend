import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { AddressFormComponent } from './address-form.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  
  cartItems:Cart[]=[]
  total:number=0
  address: string = '';
  city: string = '';
   
  constructor(private readonly _cartService:CartService){}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart():void{
    this._cartService.getCart().subscribe({
      next:(data:Cart[])=>{
        this.cartItems=data;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
    }});
  }

  removeItem(cartId:string){
    this._cartService.removeFromCart(cartId).subscribe({
      next:()=>{
        console.log("item removed");
        this.loadCart();
      },
      error: (err) => {
        console.error('Failed to remove item', err);
    }});
  }

  clearCart(){
    this._cartService.clearCart().subscribe({
      next:()=>{
        console.log("cart cleared");
        this.loadCart();
      },
      error:(err)=>console.error("failed to clear cart",err)
    });
  }

  calculateTotal():void{
    this.total= this.cartItems.reduce((sum, item) => sum + item.price, 0);

  }

}
