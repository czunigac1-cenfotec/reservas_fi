import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { RoomService } from 'src/app/core/services/room.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-calendar',
  templateUrl: './reserve-calendar.component.html',
  styleUrls: ['./reserve-calendar.component.scss']
})
export class ReservationCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  reservations: any = [];
  selectedRoom: string = '';
  rooms: [];
  showCalendar: boolean = true;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialEvents: '', // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: false,
    slotEventOverlap: false,
    eventMinHeight: 30,
    slotMinTime: "06:00:00",
    slotMaxTime: "23:00:00",
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private router: Router,
    private roomService: RoomService,
    private roomAvailabilityService: RoomAvailabilityService,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    //this.getResevations();
    this.getRoomsList();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log('handleDateSelect');
    /*const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'rgba(0,204,204,.25)',
        borderColor: '#00cccc'
      });
    }*/
    if(this.validateRoomSelected()){
      this.router.navigate([`/reservation/reservation-detail/-1/${this.selectedRoom}/${selectInfo.startStr}/${selectInfo.endStr}`])

    }

    // this.router.navigate([`/reservation/reservation-detail/"-1"/${selectInfo.startStr}/${selectInfo.endStr}`]);
  }

  handleEventClick(clickInfo: EventClickArg) {

    if(this.validateRoomSelected()){
      this.router.navigate([`/reservation/reservation-detail/${clickInfo.event.id}/${this.selectedRoom}/${clickInfo.event.startStr}/${clickInfo.event.endStr}`])

    }
    /*if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }*/
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  getResevationsByRoom(): void {

    let calendarApi = this.calendarComponent.getApi();
    let startDate  = calendarApi.view.activeStart.toISOString().replace('Z','');
    let endDate = calendarApi.view.activeEnd.toISOString().replace('Z','');

    this.reservationService.getReservationsByStartDateEndDate(this.selectedRoom,startDate,endDate).subscribe({
      next: (data) => {

        if (data !== null) {
          console.log(data);

          if (data.length >= 1) {

            for (const reservation of data) {
              var roomName = '';
              console.log(JSON.stringify(reservation));

              var event = {
                id: reservation.reservationUuid,
                start: reservation.startDateTime,
                end: reservation.endDateTime,
                title: reservation.motive,
                backgroundColor: 'rgba(241,0,117,.25)',
                borderColor: '#f10075'
              }

              //this.reservations.push(event);

            }
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.calendarOptions.events = this.reservations;
      }
    })
  }

  getAvailabilityByRoom(): void {

    this.roomAvailabilityService.getAvailabilityPeriods(this.selectedRoom).subscribe({
      next: (data) => {

        console.log(data);

        if (data.availabilityPeriods.length > 0) {

          this.getEventListFromAvailability(data.availabilityPeriods);
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.calendarOptions.events = this.reservations;
      }
    })
  }

  getResevations(): void {

    this.reservationService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data !== null) {
          if (data.availabilityPeriods.length >= 1) {

            for (const reservation of data) {
              var roomName = '';
              console.log(JSON.stringify(reservation));

              let calendarApi = this.calendarComponent.getApi();

              calendarApi.addEvent({
                id: reservation.reservationUuid,
                start: reservation.startDateTime,
                end: reservation.endDateTime,
                title: reservation.motive,
                backgroundColor: 'rgba(241,0,117,.25)',
                borderColor: '#00cc44'
              });
            }
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  getRoomInfo(roomId: string): void {

  }

  insertCalendarEvent() {

  }

  getRoomsList(): void {
    this.roomService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data.length >= 1) {
          for (const room of data) {
            console.log(room.code);
            this.rooms = data;
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  onRoomChange(event: any) {
    // Handle the event here
    console.log('Selected room:', this.selectedRoom);

    if (this.selectedRoom !== null) {
      this.showCalendar = true;

      this.getResevationsByRoom();
      this.getAvailabilityByRoom();
    } else {
      this.showCalendar = false;
    }
  }

  getEventListFromAvailability(availabilityPeriods:any) {

    let calendarApi = this.calendarComponent.getApi();
    let startDate  = calendarApi.view.activeStart.toISOString();
    let endDate = calendarApi.view.activeEnd.toISOString();

    availabilityPeriods.forEach((period: any) => {
      
      const periodStartDate = new Date(startDate);
       periodStartDate.setDate(periodStartDate.getDate() + period.weekday);
       periodStartDate.setHours(period.startTimeHour);
       periodStartDate.setMinutes(period.startTimeMinutes);

      const periodEndDate = new Date(startDate);
      periodEndDate.setDate(periodEndDate.getDate() + period.weekday);
      periodEndDate.setHours(period.endTimeHour);
      periodEndDate.setMinutes(period.endTimeMinutes);

      calendarApi.addEvent({
        id: "-1",
        start: periodStartDate,
        end: periodEndDate,
        title: 'Disponible',
        backgroundColor: 'rgba(0,204,68,.25)',
        borderColor: '#00cc44'
      });
    });

    //this.calendarOptions.events = this.reservations;
  }

  validateRoomSelected(): boolean{

    var isRoomSelected = false;

    if(this.selectedRoom !== null && this.selectedRoom !== "" ){
      isRoomSelected = true;
    }else{
     
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe seleccionar un salón para continuar',
        showConfirmButton: false,
        timer: 1500
      })
    }

    return isRoomSelected;
  }
}
