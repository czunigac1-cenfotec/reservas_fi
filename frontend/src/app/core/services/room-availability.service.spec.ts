import { TestBed } from '@angular/core/testing';

import { RoomAvailabilityService } from './room-availability.service';

describe('RoomAvailabilityService', () => {
  let service: RoomAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
