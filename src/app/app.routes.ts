import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/Auth/Login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [NoAuthGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/Auth/Register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canActivate: [NoAuthGuard],
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            './features/Auth/forget-password/forget-password.component'
          ).then((m) => m.ForgetPasswordComponent),
        canActivate: [NoAuthGuard],
      },
      {
        path: 'mail-verify',
        loadComponent: () =>
          import(
            './features/Auth/MailVerification/verification.component'
          ).then((m) => m.VerificationComponent),
        canActivate: [AuthGuard],
      },

      {
        path: 'kyc',
        loadComponent: () =>
          import('./features/Auth/KYC/kyc.component').then(
            (m) => m.KycComponent
          ),
      },
      {
        path: 'kyc/status',
        loadComponent: () =>
          import('./features/Auth/KYC/kyc-status.component').then(
            (m) => m.KycStatusComponent
          ),
      },
    ],
  },
  {
    path: 'post/:slug',
    loadComponent: () =>
      import('./features/PostView/post-view-page.component').then(
        (m) => m.PostViewPageComponent
      ),
  },
  {
    path: 'marketplace',
    loadComponent: () =>
      import('./features/ListingPage/listing-page.component').then(
        (m) => m.ListingPageComponent
      ),
  },

  {
    path: 'catalog',
    loadComponent: () =>
      import('./features/Categories/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },

  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/Home/home-container.component').then(
            (m) => m.HomeContainerComponent
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './features/Profile/components/profile-container/profile-container.component'
          ).then((m) => m.ProfileContainerComponent),
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            loadComponent: () =>
              import(
                './features/Profile/components/personal-info/personal-info.component'
              ).then((m) => m.PersonalInfoComponent),
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./features/Profile/order-list/order.component').then(
                (m) => m.OrderComponent
              ),
          },
          {
            path: 'orders/:id',
            loadComponent: () =>
              import(
                './features/Profile/order-details/order-details.component'
              ).then((m) => m.OrderDetailsComponent),
          },

          {
            path: 'fav-list',
            loadComponent: () =>
              import('./features/FavList/fav-list/fav-list.component').then(
                (m) => m.FavListComponent
              ),
          },

          {
            path: 'wallet',
            loadComponent: () =>
              import('./features/Wallet/wallet/wallet.component').then(
                (m) => m.WalletComponent
              ),
          },
        ],
      },
      {
        path: 'add-new-post',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/add-new-post/add-new-post.component').then(
            (m) => m.AddNewPostComponent
          ),
      },
      {
        path: 'edit-post/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/edit-post/edit-post/edit-post.component').then(
            (m) => m.EditPostComponent
          ),
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/Cart/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'review',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/Review/review/review.component').then(
            (m) => m.ReviewComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/About/about.component').then(
            (m) => m.AboutComponent
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
