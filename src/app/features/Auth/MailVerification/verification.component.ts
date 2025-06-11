import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class VerificationComponent implements OnInit {
  isVerified = false;
  errorMessage = '';
  isResending = false;
  isLoading = true;
  showResendButton = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verifyEmail();
  }

  verifyEmail() {
    this.isLoading = true;
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isVerified = false;
      this.errorMessage = 'Invalid verification link';
      this.isLoading = false;
      this.showResendButton = true;
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.isVerified = true;
        this.isLoading = false;
        this.showResendButton = false;
      },
      error: (error: { error?: { Message?: string; Details?: string; StatusCode?: number } }) => {
        this.isVerified = false;
        this.errorMessage = error.error?.Message || 'Failed to verify email';
        if (this.errorMessage === 'Email is already confirmed') {
          this.showResendButton = false;
        } else {
          this.showResendButton = true;
        }
        this.isLoading = false;
      }
    });
  }

  resendVerificationEmail() {
    this.isResending = true;
    this.authService.sendVerificationEmail().subscribe({
      next: () => {
        this.isResending = false;
      },
      error: (error: { error?: { Message?: string; Details?: string; StatusCode?: number } }) => {
        this.errorMessage = error.error?.Message || 'Failed to resend verification email';
        if (error.error?.Details) {
          this.errorMessage += `\nDetails: ${error.error.Details}`;
        }
        this.isResending = false;
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
