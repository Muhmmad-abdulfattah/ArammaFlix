import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

   private wishList: any[] = [];

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        const savedWishList = localStorage.getItem('wishlist');
        if (savedWishList) {
          this.wishList = JSON.parse(savedWishList);
        }
      }
    }

    getWishList(): Observable<any[]> {
      return of(this.wishList);
    }

    addToWishList(movie: any): Observable<void> {
      this.wishList.push(movie);
      this.saveWishList();
      return of(void 0);
    }

    removeFromWishList(movieId: number): Observable<void> {
      this.wishList = this.wishList.filter(movie => movie.id !== movieId);
      this.saveWishList();
      return of(void 0);
    }

    isInWishList(movieId: number): boolean {
      return this.wishList.some(movie => movie.id === movieId);
    }

    private saveWishList(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('wishlist', JSON.stringify(this.wishList));
      }
    }
}
