import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishListService } from '../../Services/wish-list-service';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../Services/language';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  wishlistCount: number = 0;
  searchQuery: string = '';
  selectedLanguage = 'en';
  apiKey = 'b9c973ce2442d6a467879cc2a0a55a5e';
  movies: any[] = [];
  constructor(
    private router: Router,
    private wishListService: WishListService,
    private http: HttpClient,
    private languageService: LanguageService
  ) {}
  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
  ngOnInit(): void {
    this.wishListService.getWishList().subscribe((wishlist) => {
      this.wishlistCount = wishlist.length;
      console.log('Movies:', this.movies);
    });
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('selectedLanguage') || 'en';
      this.changeLanguage(savedLang);
      this.wishListService.getWishList().subscribe((wishlist) => {
        this.wishlistCount = wishlist.length;
      });
    }
  }
  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery.trim() },
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
