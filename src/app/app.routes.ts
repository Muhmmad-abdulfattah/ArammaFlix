import { Routes } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { MovieDetails } from './Components/movie-details/movie-details';
import { NotFoundPage } from './Components/not-found-page/not-found-page';

export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'movies', component: Movies },
<<<<<<< HEAD
  {path: 'wishlist', loadComponent: () => import('./Components/wishlist/wishlist').then(m => m.Wishlist) },

=======
  { path: 'movie/:id', component: MovieDetails },
  { path: '**', component: NotFoundPage },
>>>>>>> 0cfef88791a4eb6270760939be53b55a41c005a9
];
