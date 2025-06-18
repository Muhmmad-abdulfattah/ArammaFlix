import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../Services/movie-service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, RouterModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie: any = null;
  recommendations: any[] = [];
  loading: boolean = true;
  loadingRecommendations: boolean = false;
  error: string = '';
  imagePath: string;
  returnQueryParams: { search?: string; page?: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.imagePath = this.movieService.path;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnQueryParams = {
        search: params['search'] || undefined,
        page: params['page'] || undefined
      };
      console.log('Captured return query params:', this.returnQueryParams);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.loadMovieDetails(id);
    } else {
      this.error = 'Invalid movie ID';
      this.toggleLoading(false);
      this.snackBar.open(this.error, 'Close', { duration: 3000 });
      this.router.navigate(['/']);
      this.changeDetectorRef.detectChanges();
    }
  }

  loadMovieDetails(id: string): void {
    console.log('Loading movie details for ID:', id);
    this.toggleLoading(true);
    this.movieService.getMovieById(id).subscribe({
      next: (response: any) => {
        this.movie = response;
        this.toggleLoading(false);
        this.loadRecommendations(id);
        this.changeDetectorRef.detectChanges();
      },
      error: (err: any) => {
        console.error('API error:', err);
        this.error = err.status === 401 ? 'Invalid API key' :
                     err.status === 404 ? 'Movie not found' :
                     'Error loading movie details';
        this.toggleLoading(false);
        this.snackBar.open(this.error, 'Close', { duration: 3000 });
        this.router.navigate(['/']);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  loadRecommendations(id: string): void {
    console.log('Loading recommendations for movie ID:', id);
    this.loadingRecommendations = true;
    this.movieService.getRecommendations(id).subscribe({
      next: (response: any) => {
        this.recommendations = response.results.slice(0, 4) || [];
        this.loadingRecommendations = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err: any) => {
        console.error('Recommendations API error:', err);
        this.recommendations = [];
        this.loadingRecommendations = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  getGenres(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || 'N/A';
  }

  toggleLoading(state?: boolean): void {
    this.loading = state !== undefined ? state : !this.loading;
    console.log('Loading state:', this.loading);
    this.changeDetectorRef.detectChanges();
  }

  goBackToMovies(): void {
    console.log('Attempting to navigate back to movies with params:', this.returnQueryParams);
    if (window.history.length > 1) {
      console.log('Using history.back()');
      window.history.back();
    } else {
      console.log('Using router.navigate');
      this.router.navigate(['/', { queryParams: this.returnQueryParams }]);
    }
  }
}