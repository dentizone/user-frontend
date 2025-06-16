import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  
  selector: 'app-post-under-review',
  imports: [],
  templateUrl: './post-under-review.component.html',
  standalone: true
})
export class PostUnderReviewComponent {
  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate(['/home']);
  }
}
