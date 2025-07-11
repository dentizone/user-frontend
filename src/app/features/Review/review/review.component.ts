import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ReviewService } from '../review.service';
@Component({
  selector: 'app-review',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  orderId = '';
  showToast = false;
  isSuccess = true;
  message: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationRoute: Router,
    private readonly service: ReviewService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];
    });
  }

  Toast(message: string) {
    this.message = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      if (this.isSuccess) {
        this.navigationRoute.navigate(['/home']);
      } else {
        this.isSuccess = true;
      }
    }, 2000);
  }

  userComment = '';
  userPointOfView = ''; //nininnininnin
  value = 0; // Start with 0 stars selected
  hovered = 0;
  stars = Array(5).fill(0);

  rate(star: number) {
    console.log('Star clicked:', star);
    this.value = star;
    console.log('Value updated to:', this.value);
  }

  hover(star: number) {
    this.hovered = star;
  }
  SubmitReview() {
    console.log('Submitting review with star value:', this.value);
    if (!this.orderId) {
      this.isSuccess = false;
      this.Toast('order ID not found');
      return;
    }
    
    if (this.value === 0) {
      this.isSuccess = false;
      this.Toast('Please select a star rating');
      return;
    }
    
    let comment =
      'User comment is ' +
      this.userComment +
      ' User improvement is ' +
      this.userPointOfView;
    console.log('Sending to backend - orderID:', this.orderId, 'stars:', this.value, 'comment:', comment);
    this.service.postNewReview(this.orderId, this.value, comment).subscribe({
      next: () => this.Toast('Review Submited Successfully'),
      error: (err) => {
        console.log('review failed', err);
        this.isSuccess = false;
        if (err.status == 403) {
          this.Toast('You are not authorized to do this action');
        } else {
          this.Toast(err.error.Message);
        }
      },
    });
  }
}
