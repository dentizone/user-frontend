import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../service/profile.service';

@Component({
  standalone: true,
  selector: 'app-profile-container',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css',
})
export class ProfileContainerComponent implements OnInit {
  selectedView: string = 'personal-info';
  user: any;
  userName: string = 'User';
  generatedName = 'User-1234';
  userEmail: string = 'UserEmail';
  userStateBadgeColor: string = 'bg-gray-300 text-gray-700';
  userStateBadgeText: string = 'Unknown';
  academicYear: string = '';
  userUniversity: string = '';
  userPhoneNumber = '';
  avatarSrc = '/assets/avatar/tooth-extraction.png';
  userAddress = '';

  constructor(private profileService: ProfileService) {}

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
        this.setUserStateBadge(this.user.status);
      },
      error: (err) => console.error('Failed to load profile', err),
    });
  }

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
}
