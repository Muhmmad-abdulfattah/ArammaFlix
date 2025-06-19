import { Routes } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { MovieDetails } from './Components/movie-details/movie-details';
import { Search } from './Components/search/search';


export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'movies', component: Movies },
  {path: 'movie/:id', component: MovieDetails },
  { path: 'search', component: Search },

];
