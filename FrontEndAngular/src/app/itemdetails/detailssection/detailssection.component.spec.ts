import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailssectionComponent } from './detailssection.component';

describe('DetailssectionComponent', () => {
  let component: DetailssectionComponent;
  let fixture: ComponentFixture<DetailssectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailssectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
