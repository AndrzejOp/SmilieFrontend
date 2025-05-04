import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokePreviewComponent } from './joke-preview.component';

describe('JokePreviewComponent', () => {
  let component: JokePreviewComponent;
  let fixture: ComponentFixture<JokePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
