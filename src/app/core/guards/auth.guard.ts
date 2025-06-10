import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();
    const isAuthRoute = route.routeConfig?.path?.startsWith('auth');
    const isMailVerifyRoute = route.routeConfig?.path === 'auth/mail-verify';

    if (!isAuthenticated) {
      // If user is not authenticated, redirect to login
      return this.router.createUrlTree(['/auth/login']);
    }

    if (isAuthenticated && isAuthRoute && !isMailVerifyRoute) {
      // If user is authenticated and trying to access auth routes (login, register, etc.)
      // but not the mail verification route
      return this.router.createUrlTree(['/']);
    }

    return true;
  }
} 