import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<any>(null);

  const accessToken = authService.getAccessToken();
  
  if (accessToken) {
    req = addToken(req, accessToken);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh')) {
        return handle401Error(req, next, authService, router, isRefreshing, refreshTokenSubject);
      }
      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
  isRefreshing: boolean,
  refreshTokenSubject: BehaviorSubject<any>
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authService.getRefreshToken();
    if (!refreshToken) {
      authService.clearAuthData();
      router.navigate(['/auth/login']);
      return throwError(() => new Error('No refresh token available'));
    }

    return authService.refreshToken({
      refreshToken,
      accessToken: authService.getAccessToken() || ''
    }).pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.accessToken);
        return next(addToken(request, response.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.clearAuthData();
        router.navigate(['/auth/login']);
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token != null),
    take(1),
    switchMap(token => {
      return next(addToken(request, token));
    })
  );
} 