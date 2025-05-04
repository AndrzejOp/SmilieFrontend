import { Component } from '@angular/core';
import { Joke } from '../joke.model';
import { JokeCardComponent } from '../joke-card/joke-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-joke-preview',
  imports: [CommonModule, JokeCardComponent], 
  templateUrl: './joke-preview.component.html',
  styleUrls: ['./joke-preview.component.css']
})
export class JokePreviewComponent {
  joke: Joke = {
    id: 1,
    setup: 'Dlaczego programista nie lubi natury?',
    delivery: 'Bo ma za dużo błędów.',
    likeCount: 7
  };
}
