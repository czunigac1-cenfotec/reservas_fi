import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationGroupComponent } from './reservation-group.component';

describe('ReservationGroupComponent', () => {
  let component: ReservationGroupComponent;
  let fixture: ComponentFixture<ReservationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
