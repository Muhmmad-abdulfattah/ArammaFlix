import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey: string = environment.apiKey; 
  public path = 'https://image.tmdb.org/t/p/w500';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`,
    'accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getMovies(lang: string = 'en-US', page: number = 1, pageSize: number = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie?with_genres=16`, {
      params: {
        api_key: this.apiKey, 
        page: page.toString(),
        language: lang
      }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=en-US`); 
  }

  getMovieById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
}
}
