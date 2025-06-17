import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../Services/movie-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WishListService } from '../../Services/wish-list-service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule,RouterModule,MatPaginatorModule,MatSnackBarModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {
movies: any[] = [];
  error: string = '';
  loading: boolean = true;
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;
  showToast: boolean = false;
  toastMessage: string = '';
  constructor(
    private movieService: MovieService,
    private wishListService: WishListService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loadMovies();
    console.log(this.movies);
  }
  loadMovies(): void {
    this.loading = true;
    this.movieService.getMovies(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.movies = response.results;
        this.totalResults = response.total_results;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err: Error) => {
        this.error = 'Error loading movies';
        this.loading = false;
        console.error('Error loading movies:', err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMovies();
   
  }
  addToWishList(movie: any): void {
    if (this.isInWishList(movie.id)) {
      this.wishListService.removeFromWishList(movie.id).subscribe({
        next: () => {
            this.showCustomToast('Movie removed from wishlist');
        },
        error: (err: Error) => {
          console.error('Error removing from wishlist:', err);
          this.showCustomToast('Error removing from wishlist');
        }
      });
    } else {
      this.wishListService.addToWishList(movie).subscribe({
        next: () => {
          this.showCustomToast('Movie added to wishlist');
        },
        error: (err: Error) => {
          console.error('Error adding to wishlist:', err);
          this.showCustomToast('Error adding to wishlist');
        }
      });
    }
  }

  isInWishList(movieId: number): boolean {
    return this.wishListService.isInWishList(movieId);
  }

  showCustomToast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}
