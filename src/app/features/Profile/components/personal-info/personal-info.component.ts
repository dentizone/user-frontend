import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { UserPostsComponent } from '../user-posts/user-posts.component';

@Component({
  standalone: true,
  selector: 'app-personal-info',
  imports: [CommonModule, UserPostsComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}
  user: any;
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.userName = this.user.fullName || this.user.username || 'User';
        this.generatedName =
          this.user.username ||
          'user-' + (this.user.id ? this.user.id.slice(-4) : 'xxxx');
        this.userEmail = this.user.email || this.user.username || '';
        this.academicYear = this.user.academicYear
          ? 'Year ' + this.user.academicYear
          : '';
        this.userUniversity =
          this.user.universityName || this.user.unversityName || '';
        this.userPhoneNumber = this.user.phoneNumber || '';
        this.avatarSrc =
          this.user.avatarUrl || '/assets/avatar/tooth-extraction.png';
        this.userAddress = this.user.address || '';
        // Badge logic
        this.setVerificationBadge(this.user.kycStatus);
      },
      error: (err) => console.error('Failed to load profile', err),
    });
  }

  userName: string = 'User';
  generatedName = 'User-1234';
  userEmail: string = 'UserEmail';
  verificationStatus: string = '';
  verificationBadgeColor: string = 'bg-gray-300 text-gray-700';
  verificationBadgeText: string = 'Unverified';
  academicYear: string = '';
  userUniversity: string = '';
  userPhoneNumber = '+201210082921';
  avatarSrc = '/assets/avatar/tooth-extraction.png';
  userAddress = 'Smouha, Alexanria';

  userPosts = [];

  setVerificationBadge(kycStatus: string) {
    // kycStatus is now a string: 'Pending', 'InProgress', 'Approved', 'Rejected', 'Expired', 'Cancelled', 'Suspended'
    switch (kycStatus) {
      case 'Pending':
        this.verificationBadgeColor = 'bg-gray-200 text-gray-700';
        this.verificationBadgeText = 'Unverified';
        break;
      case 'InProgress':
        this.verificationBadgeColor = 'bg-yellow-100 text-yellow-700';
        this.verificationBadgeText = 'Verification In Progress';
        break;
      case 'Approved':
        this.verificationBadgeColor = 'bg-emerald-100 text-emerald-700';
        this.verificationBadgeText = 'Verified';
        break;
      case 'Rejected':
        this.verificationBadgeColor = 'bg-red-100 text-red-700';
        this.verificationBadgeText = 'Rejected';
        break;
      case 'Expired':
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Verification Expired';
        break;
      case 'Cancelled':
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Verification Cancelled';
        break;
      case 'Suspended':
        this.verificationBadgeColor = 'bg-orange-100 text-orange-700';
        this.verificationBadgeText = 'Suspended';
        break;
      default:
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Unverified';
    }
  }

  get verificationDescription(): string {
    if (!this.user) return '';
    // UserState: 'Active', 'Inactive', 'Blocked', 'Deleted', 'Pending', 'Suspended', 'PendingVerification'
    // kycStatus: 'Pending', 'InProgress', 'Approved', 'Rejected', 'Expired', 'Cancelled', 'Suspended'
    switch (this.user.status) {
      case 'Deleted':
        return 'This account has been permanently banned.';
      case 'Suspended':
        return 'Account suspended due to violation of terms. Contact support.';
      case 'Blocked':
        return 'Account blocked. Please contact support.';
      case 'Pending':
      case 'Inactive':
        return 'Account not active. Please complete registration.';
      case 'PendingVerification':
        return 'Unverified: Please verify your email to activate your account.';
      default:
        // Active
        switch (this.user.kycStatus) {
          case 'Pending':
            return 'Unverified: Please verify your email to activate your account.';
          case 'InProgress':
            return 'KYC in progress. Please complete KYC to order or post for sale.';
          case 'Approved':
            return 'Verified: You have full access to all features.';
          case 'Rejected':
            return 'KYC rejected. Please resubmit your documents.';
          default:
            return 'Please complete your profile verification.';
        }
    }
  }

  goToKycIfNotVerified() {
    if (!this.user) return;
    const unverifiedStatuses = [
      'Pending',
      'InProgress',
      'Rejected',
      'Expired',
      'Cancelled',
      'Suspended',
    ];
    if (unverifiedStatuses.includes(this.user.kycStatus)) {
      this.router.navigate(['/auth/kyc']);
    }
  }
}
