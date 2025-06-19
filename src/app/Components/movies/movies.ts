import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../Services/movie-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WishListService } from '../../Services/wish-list-service';
import { retry } from 'rxjs/operators';
import { LanguageService } from '../../Services/language';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule, MatSnackBarModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  movies: any[] = [];
  error: string = '';
  loading: boolean = true;
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;
  showToast: boolean = false;
  toastMessage: string = '';
  searchQuery: string = '';
  imagePath: string;

  constructor(
    private languageService: LanguageService,
    private movieService: MovieService,
    private wishListService: WishListService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.imagePath = this.movieService.path;
  }

  ngOnInit(): void {
    this.languageService.movies$.subscribe((data) => {
      this.movies = data;
      this.changeDetectorRef.detectChanges();
    });
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.currentPage =
        params['page'] && !isNaN(+params['page']) ? +params['page'] : 1;
      console.log('Movies loaded with params:', {
        search: this.searchQuery,
        page: this.currentPage,
      });
      this.loadMovies();
    });
    this.wishListService.getWishList().subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  loadMovies(): void {
    this.toggleLoading(true);
    this.movieService
      .getMovies('en-US', this.currentPage, this.pageSize)
      .pipe(retry(2))
      .subscribe({
        next: (response: any) => {
          this.movies = response.results || [];
          this.totalResults = response.total_results || 0;
          this.toggleLoading(false);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              search: this.searchQuery || null,
              page: this.currentPage > 1 ? this.currentPage : null,
            },
            queryParamsHandling: 'merge',
          });
          this.changeDetectorRef.detectChanges();
        },
        error: (err: any) => {
          this.error =
            err.status === 401 ? 'Invalid API key' : 'Error loading movies';
          this.toggleLoading(false);
          this.snackBar.open(this.error, 'Close', { duration: 3000 });
          console.error('Error loading movies:', err);
        },
      });
  }

  toggleLoading(state?: boolean): void {
    this.loading = state !== undefined ? state : !this.loading;
    this.changeDetectorRef.detectChanges();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage > 1 ? this.currentPage : null },
      queryParamsHandling: 'merge',
    });
    this.loadMovies();
  }

  addToWishList(movie: any): void {
    if (this.isInWishList(movie.id)) {
      this.wishListService.removeFromWishList(movie.id).subscribe({
        next: () => {
          this.showCustomToast('Movie removed from wishlist');
          this.changeDetectorRef.detectChanges();
        },
        error: (err: Error) => {
          console.error('Error removing from wishlist:', err);
          this.showCustomToast('Error removing from wishlist');
        },
      });
    } else {
      this.wishListService.addToWishList(movie).subscribe({
        next: () => {
          this.showCustomToast('Movie added to wishlist');
          this.changeDetectorRef.detectChanges();
        },
        error: (err: Error) => {
          console.error('Error adding to wishlist:', err);
          this.showCustomToast('Error adding to wishlist');
        },
      });
    }
  }

  isInWishList(movieId: number): boolean {
    return this.wishListService.isInWishList(movieId);
  }

  showCustomToast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    // Rely on CSS animation for fade-out
    setTimeout(() => {
      this.showToast = false;
      this.changeDetectorRef.detectChanges();
    }, 2000); // Match CSS animation duration
  }
}
