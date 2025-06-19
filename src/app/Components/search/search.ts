import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../Services/movie-service';
import { WishListService } from '../../Services/wish-list-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { retry } from 'rxjs/operators';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule,MatPaginatorModule, MatSnackBarModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  movies: any[] = [];
  query: string = '';
  imagePath: string;
  error: string = '';
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 20;
  totalResults: number = 0;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishListService: WishListService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {
    this.imagePath = this.movieService.path;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.currentPage = 1;
      if (this.query) this.searchMovies();
    });
  }
  searchMovies(): void {
    this.loading = true;
    this.movieService.searchMovies(this.query, this.currentPage)
      .pipe(retry(2))
      .subscribe({
        next: res => {
          this.movies = res.results || [];
          this.totalResults = res.total_results || 0;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        error: err => {
          this.error = 'Failed to load search results';
          this.loading = false;
          this.snackBar.open(this.error, 'Close', { duration: 3000 });
        }
      });
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.searchMovies();
  }

  isInWishList(id: number): boolean {
    return this.wishListService.isInWishList(id);
  }

  addToWishList(movie: any): void {
    if (this.isInWishList(movie.id)) {
      this.wishListService.removeFromWishList(movie.id).subscribe(() => {
        this.showCustomToast('Removed from wishlist');
      });
    } else {
      this.wishListService.addToWishList(movie).subscribe(() => {
        this.showCustomToast('Added to wishlist');
      });
    }
  }
showCustomToast(msg: string): void {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.cdRef.detectChanges();
    }, 3000);
  }
}
