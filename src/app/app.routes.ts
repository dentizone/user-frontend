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
    path: 'auth/kyc',
    loadComponent: () =>
      import('./features/Auth/KYC/kyc.component').then((m) => m.KycComponent),
  },
  // {
  //   path: 'profile',
  //   loadComponent: () =>
  //     import('./features/Profile/profile-container.component').then((m) => m.ProfileContainerComponent),
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
