import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-kyc',
  imports: [],
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.css',
})
export class KycComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
