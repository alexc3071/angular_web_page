import { TestBed } from '@angular/core/testing';

import { LargecarouselService } from './largecarousel.service';

describe('LargecarouselService', () => {
  let service: LargecarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LargecarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
