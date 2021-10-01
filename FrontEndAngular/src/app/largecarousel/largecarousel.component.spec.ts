import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargecarouselComponent } from './largecarousel.component';

describe('LargecarouselComponent', () => {
  let component: LargecarouselComponent;
  let fixture: ComponentFixture<LargecarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargecarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargecarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
