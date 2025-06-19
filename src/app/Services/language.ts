import { Injectable, inject, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private currentLang = 'en';
  public language$ = new BehaviorSubject<string>('en');
  public movies$ = new BehaviorSubject<any[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang');
      this.currentLang = savedLang || 'en';
      this.language$.next(this.currentLang);
      this.fetchMovies(this.currentLang);
    }
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
      document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    this.language$.next(lang);
    this.fetchMovies(lang);
  }

  getLanguage(): string {
    return this.currentLang;
  }

  private fetchMovies(lang: string) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=${lang}&api_key=b9c973ce2442d6a467879cc2a0a55a5e`;

    this.http.get<any>(url).subscribe({
      next: (res) => this.movies$.next(res.results),
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.movies$.next([]);
      },
    });
  }
}
