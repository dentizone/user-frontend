import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  opened = false;
  mobileMenuOpened = false;
  UserName = 'Nourhane';
  UserEmail = 'nourhane@gmail.com';
  
  constructor(private readonly router: Router) {}

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
}
