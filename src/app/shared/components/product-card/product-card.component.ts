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
  @Output() showToastEvent=new EventEmitter<boolean>();
  showToast=false;

  constructor(private cartService:CartService,private favService:FavsService){}
  
  
  getFirstLines(html: string, lines = 2): string {
  const plainText = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
  return plainText.split('.').slice(0, lines).join('.');
}
  onAddToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:()=>
        console.log("added to cart")
      ,error:(err)=>{
        console.log("failed to add to cart",err);
      }
    });
  }
   onSelectFav(id:string) {
    this.favService.addToFavs(id).subscribe({
      next:()=>{
        console.log("added to favorites")
        this.showToast = true;
        this.showToastEvent.emit(this.showToast);
        setTimeout(() => {
          this.showToast = false;
          this.showToastEvent.emit(this.showToast);
        }, 3000);
      }
      ,error:(err)=>{
        console.log("failed to add to favorits",err);
      }
    });
}
}
