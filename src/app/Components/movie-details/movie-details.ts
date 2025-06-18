
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../Services/movie-service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie: any = null;
  loading: boolean = true;
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
        console.log('API response:', response);
        this.movie = response;
        this.toggleLoading(false);
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

  getGenres(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || 'N/A';
  }

  toggleLoading(state?: boolean): void {
    this.loading = state !== undefined ? state : !this.loading;
    console.log('Loading state:', this.loading);
    this.changeDetectorRef.detectChanges();
  }

  goBackToMovies(): void {
    
    this.router.navigate(['/'], { queryParams: this.returnQueryParams });
  }
}