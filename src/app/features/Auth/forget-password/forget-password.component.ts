import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth.service';
import { CheckEmailCardComponent } from './components/check-email-card.component';
import { EmailInputCardComponent } from './components/email-input-card.component';
import { ResetPasswordCardComponent } from './components/reset-password-card.component';
import { SuccessCardComponent } from './components/success-card.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PasswordModule,
    IftaLabelModule,
    FloatLabelModule,
    EmailInputCardComponent,
    CheckEmailCardComponent,
    ResetPasswordCardComponent,
    SuccessCardComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  userEmail = '';
  activeTab = 0;
  password = '';
  confirmPassword = '';
  passwordInvalid = false;
  emailInvalid = false;  emailErrorMessage = '';
  passwordErrorMessage = '';
  resendErrorMessage = '';
  resendSuccessMessage = '';
  resetToken: string | null = null;
  isLoading = {
    email: false,
    resend: false,
    reset: false,
  };
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['token'] && params['email']) {
        // Decode the token to handle URL encoding issues
        this.resetToken = decodeURIComponent(params['token']);
        this.userEmail = decodeURIComponent(params['email']);
        this.activeTab = 2;
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }  enterEmail(email: string) {
    this.userEmail = email;
    if (!this.userEmail || !this.isValidEmail(this.userEmail)) {
      this.emailInvalid = true;
      this.emailErrorMessage = 'Please enter a valid email address';
      return;
    }

    this.emailInvalid = false;
    this.emailErrorMessage = '';
    this.isLoading.email = true;

    this.authService.sendForgetPasswordEmail(this.userEmail).subscribe({
      next: () => {
        this.activeTab = 1;
        this.isLoading.email = false;
      },
      error: (error) => {
        console.error('Failed to send reset email:', error);
        this.emailInvalid = true;
        this.emailErrorMessage =
          (error?.error?.Message ??
          error?.error?.Details) ??
          'Failed to send reset email. Please try again.';
        this.isLoading.email = false; // Clear loading state immediately on error
      }
    });
  }  resendMail() {
    this.isLoading.resend = true;
    this.resendErrorMessage = ''; // Clear any previous error
    this.resendSuccessMessage = ''; // Clear any previous success message
    
    this.authService.sendForgetPasswordEmail(this.userEmail).subscribe({
      next: () => {
        // Email resent successfully
        this.resendErrorMessage = ''; // Ensure error is cleared on success
        this.resendSuccessMessage = 'Email has been resent successfully!';
        this.isLoading.resend = false;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.resendSuccessMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Failed to resend reset email:', error);
        this.resendSuccessMessage = ''; // Clear success message on error
        this.resendErrorMessage =
          (error?.error?.Message ??
          error?.error?.Details) ??
          'Failed to resend email. Please try again.';
        this.isLoading.resend = false; // Clear loading state immediately on error
      }
    });
  }
  submitResetPassword(pass: string, confirmPass: string) {
    this.password = pass;
    this.confirmPassword = confirmPass;

    // Reset error state and start loading
    this.passwordInvalid = false;
    this.passwordErrorMessage = '';

    if (this.password === this.confirmPassword && this.password !== '') {
      if (this.password.length < 8) {
        this.passwordInvalid = true;
        this.passwordErrorMessage =
          'Password must be at least 8 characters long';
        return;
      }

      if (!this.resetToken) {
        this.passwordInvalid = true;
        this.passwordErrorMessage =
          'Invalid or missing reset token. Please request a new password reset';
        return;
      }

      this.isLoading.reset = true;
      const resetData = {
        newPassword: this.password,
        email: this.userEmail,
        token: this.resetToken,
      };      this.authService.resetPassword(resetData).subscribe({
        next: () => {
          this.activeTab = 3;
          this.isLoading.reset = false; // Clear loading state on success
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Failed to reset password:', error);
          this.passwordInvalid = true;
          this.passwordErrorMessage =
            error?.error?.Message ??
            error?.error?.Details ??
            'Failed to reset password. Please try again.';
          this.isLoading.reset = false; // Clear loading state immediately on error
        }
      });
    } else {
      this.passwordInvalid = true;
      this.passwordErrorMessage = 'Passwords do not match';
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
