import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabilityPeriodListComponent } from './room-availability-period-list.component';

describe('RoomAvailabilityPeriodListComponent', () => {
  let component: RoomAvailabilityPeriodListComponent;
  let fixture: ComponentFixture<RoomAvailabilityPeriodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAvailabilityPeriodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailabilityPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
