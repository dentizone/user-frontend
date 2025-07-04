import { Component, HostListener, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../features/Profile/service/profile.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: any;
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.profileService.getUserProfile().subscribe({
        next: (data) => {
          this.user = data;

          this.UserName = this.user.fullName.split(' ')[0];
          this.UserEmail = this.user.username;
        },
        error: (err) => console.error('Failed to load profile', err),
      });
    }
  }

  opened = false;
  mobileMenuOpened = false;
  UserName = 'User';
  UserEmail = 'User@Email.com';

  constructor(
    private readonly router: Router,
    public profileService: ProfileService,
    public authService: AuthService
  ) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  opendropdown() {
    this.opened = !this.opened;
  }

  toggleMobileMenu() {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const inside =
      target.closest('#user-menu-button') || target.closest('#user-dropdown');
    if (!inside) this.opened = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
