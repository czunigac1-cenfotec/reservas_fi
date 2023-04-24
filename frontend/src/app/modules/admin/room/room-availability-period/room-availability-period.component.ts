import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';

@Component({
  selector: 'app-room-availability-period',
  templateUrl: './room-availability-period.component.html',
  styleUrls: ['./room-availability-period.component.scss']
})
export class RoomAvailabilityPeriodComponent implements OnInit {

  constructor(private calendar: NgbCalendar, 
              public formatter: NgbDateParserFormatter) { }

  selectedDay = 0;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  availabilityPeriod: AvailabilityPeriod =
  {
    availabilityPeriodUuid: '',
    roomAvailabilityUuid: '',
    weekday: 0,
    startTimeHour: 0,
    startTimeMinutes: 0,
    endTimeHour: '',
    endTimeMinutes: ''
  } 

  availabilityPeriodLocal =
  {
    beginDate: '',
    endDate: '',
    startDateTime:'',
    endDateTime:''
  } 

  ngOnInit(): void {
    this.availabilityPeriodLocal.beginDate = this.formatter.format(this.calendar.getToday());
    this.availabilityPeriodLocal.endDate = this.formatter.format(this.calendar.getNext(this.calendar.getToday(), 'd', 1));
  }

  addAvailabilityPeriod() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
