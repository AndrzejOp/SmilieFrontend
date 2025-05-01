import { Component, OnInit } from '@angular/core';
import { JokesService } from '../jokes.service';
import { Joke } from '../joke.model';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css'],
    standalone: false
})
export class TabsComponent implements OnInit {
  activeTab: 'new' | 'liked' | 'unliked' = 'new';
  newJoke: Joke | null = null;
  likedJokes: Joke[] = [];
  unlikedJoke: Joke | null = null;

  constructor(
    private jokesService: JokesService,
    public auth: AuthService 
  ) {}

  ngOnInit() {
    this.loadNewJoke();
    this.loadLikedJokes();
  }

  setTab(tab: 'new' | 'liked' | 'unliked') {
    this.activeTab = tab;

    if (tab === 'new') {
      this.loadNewJoke();
    } else if (tab === 'liked') {
      this.loadLikedJokes();
    } else if (tab === 'unliked') {
      this.loadUnlikedJoke();
    }
  }

  loadNewJoke() {
    this.jokesService.getNewJoke().subscribe(joke => this.newJoke = joke);
  }

  loadLikedJokes() {
    this.jokesService.getLikedJokes().subscribe(jokes => this.likedJokes = jokes);
  }

  loadUnlikedJoke() {
    this.jokesService.getRandomUnlikedJoke().subscribe(joke => this.unlikedJoke = joke);
  }

  onLike(joke: Joke) {
    this.jokesService.likeJoke(joke.id).subscribe(() => {
      joke.likeCount++;
      this.loadLikedJokes(); 
      if (this.activeTab === 'unliked') {
        this.loadUnlikedJoke(); 
      }
    });
  }
}
