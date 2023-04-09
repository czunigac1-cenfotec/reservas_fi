import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCalendarComponent } from './reserve-calendar.component';

describe('ReserveCalendarComponent', () => {
  let component: ReserveCalendarComponent;
  let fixture: ComponentFixture<ReserveCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
