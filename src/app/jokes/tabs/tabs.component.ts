import { Component, OnInit } from '@angular/core';
import { JokesService } from '../jokes.service';
import { Joke } from '../joke.model';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { JokeCardComponent } from '../joke-card/joke-card.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  imports: [CommonModule, JokeCardComponent],
  styleUrls: ['./tabs.component.css'],
  standalone: true
})
export class TabsComponent implements OnInit {
  activeTab: 'new' | 'all' | 'unliked' = 'new';
  newJoke: Joke | null = null;
  unlikedJoke: Joke | null = null;
  allJokes: Joke[] = [];
  currentPage: number = 0;

  constructor(
    private jokesService: JokesService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadNewJoke();
    this.loadAllJokes(this.currentPage); 
  }

  setTab(tab: 'new' | 'all' | 'unliked') {
    this.activeTab = tab;

    if (tab === 'new') {
      this.loadNewJoke();
    } else if (tab === 'all') {
      this.loadAllJokes(this.currentPage);
    } else if (tab === 'unliked') {
      this.loadUnlikedJoke();
    }
  }

  loadNewJoke() {
    const tryLoad = () => {
      this.jokesService.getNewJoke().subscribe(joke => {
        if (joke.likeCount === 0) {
          this.newJoke = joke;
        } else {
          tryLoad(); 
        }
      });
    };
  
    tryLoad();
  }
  

  loadUnlikedJoke() {
    this.jokesService.getRandomUnlikedJoke().subscribe(joke => {
      this.unlikedJoke = joke;
    });
  }

  loadAllJokes(page: number) {
    this.jokesService.getAllJokes(page).subscribe(jokes => {
      this.allJokes = jokes;
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadAllJokes(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAllJokes(this.currentPage);
    }
  }

  onLikeNew(joke: Joke) {
    this.jokesService.likeJoke(joke.id).subscribe({
      next: () => {
        joke.likeCount++; 
      },
      error: (err) => {
        if (err.status === 409 && this.activeTab === 'unliked') {
          this.loadUnlikedJoke();
        }
      }
    });
  }  

  onLikeUnliked(joke: Joke) {
    this.jokesService.likeJoke(joke.id).subscribe({
      next: () => {
        joke.likeCount++; 
        this.loadUnlikedJoke(); 
      },
      error: (err) => {
        if (err.status === 409 && this.activeTab === 'unliked') {
          this.loadUnlikedJoke();
        }
      }
    });
  } 
}
