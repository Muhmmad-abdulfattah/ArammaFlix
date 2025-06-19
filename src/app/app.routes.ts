import { Routes } from '@angular/router';
import { Movies } from './Components/movies/movies';

export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'movies', component: Movies },
  {path: 'wishlist', loadComponent: () => import('./Components/wishlist/wishlist').then(m => m.Wishlist) },

];
