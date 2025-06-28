import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-review',
  imports: [RatingModule,CommonModule,FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  userComment='';
  userPointOfView='';      //nininnininnin
  value = 5;
  hovered = 0;
  stars = Array(5).fill(0);

  rate(star: number) {
    this.value = star;
  }

  hover(star: number) {
    this.hovered = star;
  }
  SubmitReview(){
    let body={
      comment:"User comment is "+this.userComment+" User improvement is "+this.userPointOfView,
      stars:this.value
    }
  }
}
