import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabilityPeriodComponent } from './room-availability-period.component';

describe('RoomAvailabilityPeriodComponent', () => {
  let component: RoomAvailabilityPeriodComponent;
  let fixture: ComponentFixture<RoomAvailabilityPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAvailabilityPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailabilityPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
