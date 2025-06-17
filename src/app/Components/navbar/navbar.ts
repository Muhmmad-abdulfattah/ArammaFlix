import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 wishlistCount: number = 0;
  searchQuery: string = '';
  constructor(private router: Router) { }
  loadWishlistCount() {
    const wishlist = localStorage.getItem('wishlist');
    this.wishlistCount = wishlist ? JSON.parse(wishlist).length : 0;
  }

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/']);
    }
  }
}
