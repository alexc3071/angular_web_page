import { TestBed } from '@angular/core/testing';

import { ScarouselService } from './scarousel.service';

describe('ScarouselService', () => {
  let service: ScarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
