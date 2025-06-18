
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishListService } from '../../Services/wish-list-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  wishlistCount: number = 0;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private wishListService: WishListService
  ) { }

  ngOnInit(): void {
    this.wishListService.getWishList().subscribe(wishlist => {
      this.wishlistCount = wishlist.length;
    });
  }

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/']);
    }
  }
}