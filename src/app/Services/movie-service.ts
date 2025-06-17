import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmYxYjYwZmQzMzVkNDgwZmJiNGFjMWQxNDRkNDZkNyIsIm5iZiI6MTc0OTMxOTE1OS4xMzc5OTk4LCJzdWIiOiI2ODQ0N2RmNzI0NzljMjQwNzMyOTI2MmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Bnsh4lAljqguoGyx6f8sAD5J-MsZEBmRku5ITnMH2aU';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`,
    'accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getMovies(page: number = 1, pageSize: number = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?page=${page}&language=en-US`, { headers: this.headers });
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?query=${query}&page=${page}&language=en-US`, { headers: this.headers });
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?language=en-US`, { headers: this.headers });
  }
}
