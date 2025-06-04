import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/register',
    loadComponent: () =>
      import(
        './features/Auth/Register/Component/register/register.component'
      ).then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: 'auth/register',
    pathMatch: 'full',
  },
];
