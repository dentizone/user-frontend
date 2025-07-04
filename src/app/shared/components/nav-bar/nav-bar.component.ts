import { Component, HostListener, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
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
  opened = false;
  mobileMenuOpened = false;
  UserName = 'User';
  UserEmail = 'User@Email.com';
  private userSub?: Subscription;

  constructor(
    private readonly router: Router,
    public profileService: ProfileService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.userSub = this.authService.currentUser$.subscribe((user) => {
        if (user) {
          this.user = user;
          this.UserName = user.fullName?.split(' ')[0] || 'User';
          this.UserEmail = user.email || user.username || 'User@Email.com';
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  opendropdown() {
    this.opened = !this.opened;
  }

  toggleMobileMenu() {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  closeDropdown() {
    this.opened = false;
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
    window.location.href = '/home';
  }
}
