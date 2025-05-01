import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joke } from './joke.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getNewJoke() {
    return this.http.get<Joke>(`${this.apiUrl}/joke`, { headers: this.getHeaders() });
  }

  likeJoke(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/like`, {}, { headers: this.getHeaders() });
  }

  getLikedJokes() {
    return this.http.get<Joke[]>(`${this.apiUrl}/jokes`, { headers: this.getHeaders() });
  }

  getRandomUnlikedJoke() {
    return this.http.get<Joke>(`${this.apiUrl}/random-unliked`, { headers: this.getHeaders() });
  }
}
