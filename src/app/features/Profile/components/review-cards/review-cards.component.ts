import { Component,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-review-cards',
  imports: [RatingModule,FormsModule],
  templateUrl: './review-cards.component.html',
  styleUrl: './review-cards.component.css'
})
export class ReviewCardsComponent {
  @Input() reviews=[{
    username:'',
    avatarSrc:'',
    rate:0,
    purchasedItemTitle:'',
    comment:''
  }]
}
