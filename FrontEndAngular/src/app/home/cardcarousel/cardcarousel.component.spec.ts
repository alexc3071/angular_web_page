import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcarouselComponent } from './cardcarousel.component';

describe('CardcarouselComponent', () => {
  let component: CardcarouselComponent;
  let fixture: ComponentFixture<CardcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardcarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
