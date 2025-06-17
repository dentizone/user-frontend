import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Posts } from '../../../core/models/posts';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: Posts;
  onSelectFav(e:string){

  }
}
