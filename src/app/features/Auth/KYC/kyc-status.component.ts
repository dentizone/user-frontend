import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { KycStatus, User } from '../../../core/models/auth.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kyc-status',
  templateUrl: './kyc-status.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class KycStatusComponent implements OnInit {
  user: User | null = null;
  kycStatus: KycStatus | null = null;
  loading = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.fetchCurrentUserForGuard().subscribe({
      next: (user) => {
        this.user = user;
        this.kycStatus = user?.kycStatus ?? null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.user = null;
        this.kycStatus = null;
      }
    });
  }

  startKyc() {
    this.router.navigate(['/auth/kyc']);
  }

  contactSupport() {
    // Replace with actual support route or mailto
    window.open('mailto:admin@gitnasr.com', '_blank');
  }

  backToProfile() {
    this.router.navigate(['/auth/profile']);    
  }
} 