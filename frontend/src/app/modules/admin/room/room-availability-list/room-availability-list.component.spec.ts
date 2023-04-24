import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabilityListComponent } from './room-availability-list.component';

describe('RoomAvailabilityListComponent', () => {
  let component: RoomAvailabilityListComponent;
  let fixture: ComponentFixture<RoomAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAvailabilityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
