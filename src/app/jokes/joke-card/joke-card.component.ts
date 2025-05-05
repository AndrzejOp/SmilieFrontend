import { Component, Input } from '@angular/core';
import { Joke } from '../joke.model';
import { JokesService } from '../jokes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-joke-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.css']
})
export class JokeCardComponent {
  @Input() joke!: Joke;
  @Input() showLikeButton: boolean = false;

  loading = false;
  likeMessage = '';

  constructor(private jokesService: JokesService) {}

  likeJoke() {
    if (this.loading || !this.joke?.id) return;
  
    this.loading = true;
    this.jokesService.likeJoke(this.joke.id).subscribe({
      next: () => {
        this.joke.likeCount++;
        this.likeMessage = '🎉 Żart został polubiony!';
        this.loading = false;
  
        setTimeout(() => {
          this.likeMessage = '';
          this.joke = { ...this.joke }; 
        }, 1500);
       },
      error: (err) => {
        if (err.status === 409) {
          this.likeMessage = '⚠️ Już polubiłeś ten żart.';
        } else {
          this.likeMessage = '❌ Wystąpił błąd.';
        }
        this.loading = false;
        setTimeout(() => this.likeMessage = '', 1500);
      }
    });
  }
  

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.likeMessage = '';
    }, 2500);
  }
}
