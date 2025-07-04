import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KycStatus } from '../../../../core/models/auth.models';
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
  constructor(private profileService: ProfileService) {}
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

  setVerificationBadge(kycStatus: KycStatus) {
    switch (kycStatus) {
      case KycStatus.Pending:
        this.verificationBadgeColor = 'bg-gray-200 text-gray-700';
        this.verificationBadgeText = 'Pending Verification';
        break;
      case KycStatus.InProgress:
        this.verificationBadgeColor = 'bg-yellow-100 text-yellow-700';
        this.verificationBadgeText = 'Verification In Progress';
        break;
      case KycStatus.Approved:
        this.verificationBadgeColor = 'bg-emerald-100 text-emerald-700';
        this.verificationBadgeText = 'Verified';
        break;
      case KycStatus.Rejected:
        this.verificationBadgeColor = 'bg-red-100 text-red-700';
        this.verificationBadgeText = 'Rejected';
        break;
      case KycStatus.Expired:
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Verification Expired';
        break;
      case KycStatus.Cancelled:
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Verification Cancelled';
        break;
      case KycStatus.Suspended:
        this.verificationBadgeColor = 'bg-orange-100 text-orange-700';
        this.verificationBadgeText = 'Suspended';
        break;
      default:
        this.verificationBadgeColor = 'bg-gray-300 text-gray-700';
        this.verificationBadgeText = 'Unverified';
    }
  }
}
