import {CanActivateFn, Routes} from '@angular/router';
import {inject} from "@angular/core";
import {Router} from '@angular/router';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  return !!token || router.createUrlTree(['/auth']);
};

const isLoggedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  return !token || router.createUrlTree(['/cats-gallery']);
}


export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
    canActivate: [isLoggedGuard],
  },
  {
    path: 'cats-gallery',
    loadComponent: () => import('./cats-gallery/cats-gallery.component').then(m => m.CatsGalleryComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'cats-gallery',
  }
];
