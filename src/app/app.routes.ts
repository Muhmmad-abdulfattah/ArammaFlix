import { Routes } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { MovieDetails } from './Components/movie-details/movie-details';

export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'movies', component: Movies },
  {path: 'movie/:id', component: MovieDetails },
 
];
