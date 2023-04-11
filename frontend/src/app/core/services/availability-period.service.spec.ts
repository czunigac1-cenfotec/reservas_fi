import { TestBed } from '@angular/core/testing';

import { AvailabilityPeriodService } from './availability-period.service';

describe('AvailabilityPeriodService', () => {
  let service: AvailabilityPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
