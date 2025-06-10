import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule, PasswordModule, IftaLabelModule, FloatLabelModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  userEmail = '';
  activeTab = 0;
  password = '';
  confirmPassword = '';
  passwordInvalid = false;
  emailInvalid = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  enterEmail(email: string) {
    this.userEmail = email;
    if (!this.userEmail || !this.isValidEmail(this.userEmail)) {
      this.emailInvalid = true;
    } else {
      this.emailInvalid = false;
      this.authService.sendForgetPasswordEmail(this.userEmail).subscribe({
        next: () => {
          this.activeTab = 1;
        },
        error: (error) => {
          console.error('Failed to send reset email:', error);
          this.errorMessage = 'Failed to send reset email. Please try again.';
        }
      });
    }
  }

  resendMail() {
    this.activeTab = 2;
    this.authService.sendForgetPasswordEmail(this.userEmail).subscribe({
      next: () => {
        this.activeTab = 1;
      },
      error: (error) => {
        console.error('Failed to resend reset email:', error);
        this.errorMessage = 'Failed to resend reset email. Please try again.';
      }
    });
  }

  submitResetPassword(pass: string, confirmPass: string) {
    this.password = pass;
    this.confirmPassword = confirmPass;
    if (this.password === this.confirmPassword && this.password !== '') {
      const resetData = {
        newPassword: this.password,
        email: this.userEmail,
        token: '' // This should be obtained from the URL or state
      };

      this.authService.resetPassword(resetData).subscribe({
        next: () => {
          this.activeTab = 3;
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Failed to reset password:', error);
          this.errorMessage = 'Failed to reset password. Please try again.';
          this.passwordInvalid = true;
        }
      });
    } else {
      this.passwordInvalid = true;
    }
  }
}
