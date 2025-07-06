import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    UrlTree,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();

    const fullPath = route.pathFromRoot
      .map((s) => s.routeConfig?.path)
      .filter(Boolean)
      .join('/');

    const isAuthRoute = fullPath.startsWith('auth/');
    const isMailVerifyRoute = fullPath === 'auth/mail-verify';
    if (!isAuthenticated) {
      return this.router.createUrlTree(['/auth/login']);
    }

    if (isAuthenticated && isAuthRoute && !isMailVerifyRoute) {
      // If user is authenticated and trying to access auth routes (login, register, etc.)
      // but not the mail verification route
      return this.router.createUrlTree(['/']);
    }

    // Fetch current user on every guarded route
    return this.authService.fetchCurrentUserForGuard().pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }),
      catchError(() => of(this.router.createUrlTree(['/auth/login'])))
    );
  }
}
