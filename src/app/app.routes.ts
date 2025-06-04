import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/Home/home-container.component').then(
        (m) => m.HomeContainerComponent
      ),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import(
        './features/Auth/Register/Component/register/register.component'
      ).then((m) => m.RegisterComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/Auth/Login/components/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'auth/mail-verification',
    loadComponent: () =>
      import(
        './features/Auth/MailVerification/components/verification.component'
      ).then((m) => m.VerificationComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
