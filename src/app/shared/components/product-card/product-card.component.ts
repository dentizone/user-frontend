import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Posts } from '../../../core/models/posts';
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule,QuillModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: any;
  onSelectFav(e:string){

  }
  getFirstLines(html: string, lines = 2): string {
  const plainText = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
  return plainText.split('.').slice(0, lines).join('.');
}
}
