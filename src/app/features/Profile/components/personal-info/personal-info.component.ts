import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// No need to import enums, status is a string
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
        this.setUserStateBadge(this.user.status);
      },
      error: (err) => console.error('Failed to load profile', err),
    });
  }

  userName: string = 'User';
  generatedName = 'User-1234';
  userEmail: string = 'UserEmail';
  userStateBadgeColor: string = 'bg-gray-300 text-gray-700';
  userStateBadgeText: string = 'Unknown';
  academicYear: string = '';
  userUniversity: string = '';
  userPhoneNumber = '+201210082921';
  avatarSrc = '/assets/avatar/tooth-extraction.png';
  userAddress = 'Smouha, Alexanria';

  userPosts = [];

  setUserStateBadge(userState: string) {
    switch (userState) {
      case 'PendingVerification':
        this.userStateBadgeColor = 'bg-gray-200 text-gray-700';
        this.userStateBadgeText = 'Pending Verification';
        break;
      case 'EmailVerified':
        this.userStateBadgeColor = 'bg-blue-100 text-blue-700';
        this.userStateBadgeText = 'Email Verified';
        break;
      case 'Active':
        this.userStateBadgeColor = 'bg-green-100 text-green-700';
        this.userStateBadgeText = 'Active';
        break;
      case 'Blacklisted':
        this.userStateBadgeColor = 'bg-red-100 text-red-700';
        this.userStateBadgeText = 'Blacklisted';
        break;
      case 'Deleted':
        this.userStateBadgeColor = 'bg-gray-400 text-gray-800';
        this.userStateBadgeText = 'Deleted';
        break;
      default:
        this.userStateBadgeColor = 'bg-gray-300 text-gray-700';
        this.userStateBadgeText = 'Unknown';
    }
  }

  // No KYC navigation logic needed

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
        // No KYC status to check here, so return a generic message
        return 'Please complete your profile verification.';
    }
  }
}
