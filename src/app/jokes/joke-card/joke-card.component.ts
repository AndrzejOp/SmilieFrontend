import { Component, Input } from '@angular/core';
import { Joke } from '../joke.model';
import { JokesService } from '../jokes.service';

@Component({
    selector: 'app-joke-card',
    templateUrl: './joke-card.component.html',
    styleUrls: ['./joke-card.component.css'],
    standalone: true
})
export class JokeCardComponent {
  @Input() joke!: Joke;
  @Input() showLikeButton: boolean = false;
  liked: boolean = false;
  loading: boolean = false;

  constructor(private jokesService: JokesService) {}

  likeJoke() {
    if (this.liked || !this.joke?.id) return;

    this.loading = true;
    this.jokesService.likeJoke(this.joke.id).subscribe({
      next: () => {
        this.liked = true;
        this.joke.likeCount++;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to like joke', err);
        this.loading = false;
      }
    });
  }
}
