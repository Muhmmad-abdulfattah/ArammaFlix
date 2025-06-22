import { Routes } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { MovieDetails } from './Components/movie-details/movie-details';
import { NotFoundPage } from './Components/not-found-page/not-found-page';
import { Search } from './Components/search/search';

export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'movies', component: Movies },
  { path: 'search', component: Search },
  { path: 'wishlist', loadComponent: () => import('./Components/wishlist/wishlist').then(m => m.Wishlist) },
  { path: 'movie/:id', component: MovieDetails },
  { path: '**', component: NotFoundPage },
];
