import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';
import { Utility } from 'src/app/shared/utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-availability-period',
  templateUrl: './room-availability-period.component.html',
  styleUrls: ['./room-availability-period.component.scss']
})
export class RoomAvailabilityPeriodComponent implements OnInit {

  @Input() roomAvailabilityId: any;
  @Output() availabilityPeriodEmitter = new EventEmitter<any>();

  constructor(private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) { }

  selectedDay = 0;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  dataTableRows: any = [];

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
      startDateTime: { hour: 7, minute: 0, second: 0 },
      endDateTime: { hour: 20, minute: 0, second: 0 }
    }

  ngOnInit(): void {
    this.availabilityPeriodLocal.beginDate = this.formatter.format(this.calendar.getToday());
    this.availabilityPeriodLocal.endDate = this.formatter.format(this.calendar.getNext(this.calendar.getToday(), 'd', 1));
  }

  addAvailabilityPeriod() {

    if (!this.alreadyAdded()) {
      var message = this.validateFields();

      if (message != '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: message,
          showConfirmButton: false,
          timer: 1500
        })
      } else {

        this.availabilityPeriod.endTimeHour = this.availabilityPeriodLocal.endDateTime.hour;
        this.availabilityPeriod.startTimeHour = this.availabilityPeriodLocal.startDateTime.hour;
        this.availabilityPeriod.endTimeMinutes = this.availabilityPeriodLocal.endDateTime.minute;
        this.availabilityPeriod.startTimeMinutes = this.availabilityPeriodLocal.startDateTime.minute;
        this.availabilityPeriod.weekday = this.selectedDay;
        this.availabilityPeriod.roomAvailabilityUuid = this.roomAvailabilityId;

        this.availabilityPeriodEmitter.emit(this.availabilityPeriod);
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique el día y rango de fechas agregadas previamente.',
        showConfirmButton: false,
        timer: 1500
      })
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

  updateDataTable(dataTableRows: any) {
    this.dataTableRows = dataTableRows;
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

  validateFields(): string {
    var message = '';

    if (this.availabilityPeriodLocal.beginDate == undefined || this.availabilityPeriodLocal.endDate == undefined) {
      message = 'Debe seleccionar un rango de fechas válido';
    } else if (this.availabilityPeriodLocal.endDateTime.hour <= this.availabilityPeriodLocal.startDateTime.hour) {
      message = 'La hora de inicio debe ser menor a la hora fin';
    }

    return message;
  }

  clearForm() {

    this.availabilityPeriod.weekday = 0;
    this.availabilityPeriod.startTimeHour = 7;
    this.availabilityPeriod.startTimeMinutes = 0;
    this.availabilityPeriod.endTimeHour = 20;
    this.availabilityPeriod.endTimeMinutes = 0;

    this.availabilityPeriodLocal.startDateTime = { hour: 7, minute: 0, second: 0 };
    this.availabilityPeriodLocal.endDateTime = { hour: 20, minute: 0, second: 0 };

  }

  alreadyAdded(): boolean {
    var vItemAlreadyAdded = false;

    debugger;
    for (let index = 0; index < this.dataTableRows.length; index++) {
      const element = this.dataTableRows[index];

      var dayName = element[0];
      var startTime = element[1];
      var endtime = element[2];

      if (dayName == Utility.getWeekDayName(this.availabilityPeriod.weekday) &&
        startTime == Utility.getTime(this.availabilityPeriod.startTimeHour?.toString(), this.availabilityPeriod.startTimeMinutes?.toString()) &&
        endtime == Utility.getTime(this.availabilityPeriod.endTimeHour?.toString(), this.availabilityPeriod.endTimeMinutes?.toString())) {

        vItemAlreadyAdded = true;
      }
    }

    return vItemAlreadyAdded;
  }
}
