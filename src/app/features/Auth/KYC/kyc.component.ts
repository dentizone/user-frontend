import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { KycStatus } from '../../../core/models/auth.models';

@Component({
  selector: 'app-kyc',
  imports: [],
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.css',
})
export class KycComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    if (user?.kycStatus !== KycStatus.Pending) {
      this.router.navigate(['/auth/kyc/status']);
    }
  }

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

  startVerification() {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      // Optionally handle missing token (e.g., redirect to login)
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    this.http.post<any>(`${environment.apiUrl}/api/Verification/create`, {}, { headers }).subscribe({
      next: (response) => {
        if (response && response.url) {
          window.location.href = response.url;
        }
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'KYC verification failed. Please try again.');
      }
    });
  }
}
