import { TestBed } from '@angular/core/testing';

import { ItemdetailsService } from './itemdetails.service';

describe('ItemdetailsService', () => {
  let service: ItemdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
