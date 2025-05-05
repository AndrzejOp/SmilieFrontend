import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joke } from './joke.model';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getNewJoke(): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/joke`, { headers: this.getHeaders() });
  }

  likeJoke(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/like`, {}, { headers: this.getHeaders(), responseType: 'text'});}  

  getRandomUnlikedJoke(): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/random-unliked`, { headers: this.getHeaders() });
  }

  getJokeLikes(id: number): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/jokes/${id}/likes`, { headers: this.getHeaders() });
  }
  getAllJokes(page: number) {
    return this.http.get<Joke[]>(`${this.apiUrl}/jokes?page=${page}`, { headers: this.getHeaders() });
  }
  
}
