import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Posts } from '../../../core/models/posts';
import { QuillModule } from 'ngx-quill';
import { CartService } from '../../../features/Cart/cart.service';
import { FavsService } from '../../../features/favorites/favs.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule,QuillModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: any;
  @Output() showToastEvent=new EventEmitter<any>();
  showToast=false;
  message='';
  isSuccess=true;
  constructor(private cartService:CartService,private favService:FavsService){}
  Toast(message:string){
    this.showToast = true;
    this.message=message;
    this.showToastEvent.emit({toast: this.showToast, message: this.message,isSuccess:this.isSuccess});
    setTimeout(() => {
      this.showToast = false;
      this.isSuccess=true;
      this.showToastEvent.emit({toast: this.showToast, message: this.message,isSuccess:this.isSuccess});
    }, 3000);
  }
  
  getFirstLines(html: string, lines = 2): string {
  const plainText = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
  return plainText.split('.').slice(0, lines).join('.');
}
  onAddToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:()=>{
        console.log("added to cart")
        this.Toast('Product Added to Cart!')
      }
      ,error:(err)=>{
        console.log("failed to add to cart",err);
        this.isSuccess=false;
        this.Toast(err.error.Message);
      }
    });
  }
   onSelectFav(id:string) {
    this.favService.addToFavs(id).subscribe({
      next:()=>{
        console.log("added to favorites")
        this.Toast('Product Added to Favorites!')
      }
      ,error:(err)=>{
        console.log("failed to add to favorits",err);
        this.isSuccess=false;
        this.Toast(err.error.Message);
      }
    });
}
}
