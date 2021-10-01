import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastsectionComponent } from './castsection.component';

describe('CastsectionComponent', () => {
  let component: CastsectionComponent;
  let fixture: ComponentFixture<CastsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastsectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
