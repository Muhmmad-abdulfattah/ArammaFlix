import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { raceWith } from 'rxjs';
import { WishListService } from '../../Services/wish-list-service';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule , SlicePipe,RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  // Component logic goes here
  // For example, you can define properties and methods to manage the wishlist items
  wishlist: any[] = [];
 showToast = false;
  toastMessage = '';
  wishlistcount=0;
   constructor(private wishListService: WishListService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  private loadWishlist() {
    this.wishListService.getWishList().subscribe(wishlist => {
      this.wishlist = wishlist;
      if (this.wishlist.length === 0) {
        this.showEmptyWishlistMessage();
      }
    });
  }

  removeFromWishlist(movieId: number) {
    this.wishListService.removeFromWishList(movieId).subscribe(() => {
      this.loadWishlist();
      this.showToast = true;
      this.toastMessage = 'Movie removed from wishlist.';
    });
  }

  private showEmptyWishlistMessage() {
    this.showToast = true;
    this.toastMessage = 'Your wishlist is currently empty.';
  }

}
