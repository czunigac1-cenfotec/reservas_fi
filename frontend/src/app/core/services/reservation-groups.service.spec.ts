import { TestBed } from '@angular/core/testing';

import { ReservationGroupsService } from './reservation-groups.service';

describe('ReservationGroupsService', () => {
  let service: ReservationGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
