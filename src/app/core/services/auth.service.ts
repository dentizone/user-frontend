import {
  AuthResponse,
  LoginRequestDto,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequestDto,
  ResetPasswordDto,
  User
} from '../models/auth.models';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequestDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  register(userData: RegisterRequestDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  confirmEmail(token: string): Observable<void> {
    return this.http.get<void>(`${this.API_URL}/confirm-email`, { params: { token } });
  }

  sendVerificationEmail(): Observable<void> {
    return this.http.get<void>(`${this.API_URL}/send-verification-email`);
  }

  sendForgetPasswordEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-forget-password-email`, null, {
      params: { email }
    });
  }

  resetPassword(resetData: ResetPasswordDto): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/reset-password`, resetData);
  }

  refreshToken(refreshData: RefreshTokenRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, refreshData).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  logout(): Observable<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const logoutRequest: LogoutRequest = { refreshToken };
      return this.http.post<void>(`${this.API_URL}/logout`, logoutRequest).pipe(
        tap(() => this.clearAuthData())
      );
    }
    this.clearAuthData();
    return new Observable(subscriber => {
      subscriber.next();
      subscriber.complete();
    });
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    // Fetch and store user data
    this.fetchCurrentUser();
  }

  private fetchCurrentUser(): void {
    this.http.get<User>(`${environment.apiUrl}/api/Users/me`).subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      error: () => this.clearAuthData()
    });
  }

  clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  verifyEmail( token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/confirm-email`, {
      params: {  token }
    });
  }
} 