import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { isValidDate } from '@fullcalendar/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';

@Component({
  selector: 'app-room-availability-period',
  templateUrl: './room-availability-period.component.html',
  styleUrls: ['./room-availability-period.component.scss']
})
export class RoomAvailabilityPeriodComponent implements OnInit {

  @Output() objectEmitter = new EventEmitter<any>();

  constructor(private calendar: NgbCalendar, 
              public formatter: NgbDateParserFormatter) { }

  selectedDay = 0;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  defaultTime: NgbTimeStruct = { hour: 7, minute: 0, second: 0 };

  availabilityPeriod: AvailabilityPeriod =
  {
    availabilityPeriodUuid: '',
    roomAvailabilityUuid: '',
    weekday: 0,
    startTimeHour: 0,
    startTimeMinutes: 0,
    endTimeHour: 0,
    endTimeMinutes: 0
  } 

  availabilityPeriodLocal =
  {
    beginDate: '',
    endDate: '',
    startDateTime:{ hour: 7, minute: 0, second: 0 },
    endDateTime: { hour: 20, minute: 0, second: 0 }
  } 

  ngOnInit(): void {
    this.availabilityPeriodLocal.beginDate = this.formatter.format(this.calendar.getToday());
    this.availabilityPeriodLocal.endDate = this.formatter.format(this.calendar.getNext(this.calendar.getToday(), 'd', 1));
  }

  addAvailabilityPeriod() {
    
    var message = this.validateFields();

    if(message != ''){
      //TODO: error message
    }else {

      this.availabilityPeriod.endTimeHour = this.availabilityPeriodLocal.endDateTime.hour;
      this.availabilityPeriod.startTimeHour = this.availabilityPeriodLocal.startDateTime.hour;
      this.availabilityPeriod.endTimeMinutes = this.availabilityPeriodLocal.endDateTime.minute;
      this.availabilityPeriod.startTimeMinutes= this.availabilityPeriodLocal.startDateTime.minute;
      this.availabilityPeriod.weekday = this.selectedDay;

      this.objectEmitter.emit(this.availabilityPeriod);
    }
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

  validateFields() :string{
    var message = '';

    if(this.availabilityPeriodLocal.beginDate == undefined || this.availabilityPeriodLocal.endDate == undefined){
      message = 'Debe seleccionar un rango de fechas válido';
    }else if(this.availabilityPeriodLocal.endDateTime.hour <= this.availabilityPeriodLocal.startDateTime.hour){
      message = 'La hora de inicio debe ser menor a la hora fin';
    }

    return message;
  }

}
