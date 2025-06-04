import { HomeContainerComponent } from './features/Home/home-container.component';
import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', 
loadComponent: () =>
        import('./features/Home/home-container.component').then(
            (m) => m.HomeContainerComponent
        ),
    },
    {
 },
  {
    path: 'auth/register',
    loadComponent: () =>
      import(
        './features/Auth/Register/Component/register/register.component'
      ).then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
