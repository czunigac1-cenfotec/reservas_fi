import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-reserve-calendar',
  templateUrl: './reserve-calendar.component.html',
  styleUrls: ['./reserve-calendar.component.scss']
})
export class ReservationCalendarComponent implements OnInit {
  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;

  reservations: any = [];

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
    allDaySlot:false,
    slotEventOverlap:false,
    eventMinHeight:30,
    slotMinTime:"06:00:00",
    slotMaxTime:"23:00:00",
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
              private route: ActivatedRoute,
              private reservationService: ReservationService) { }

  ngOnInit(): void 
  { 
    this.getResevations();
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

    this.router.navigate([`/reservation/reservation-detail/-1/${selectInfo.startStr}/${selectInfo.endStr}`])
   // this.router.navigate([`/reservation/reservation-detail/"-1"/${selectInfo.startStr}/${selectInfo.endStr}`]);
  }

  handleEventClick(clickInfo: EventClickArg) {
    
    this.router.navigate([`/reservation/reservation-detail/${clickInfo.event.id}/${clickInfo.event.startStr}/${clickInfo.event.endStr}`])

    /*if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }*/
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  getResevations(): void {

    this.reservationService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data.length >= 1) {
          for (const reservation of data) {
            console.log(JSON.stringify(reservation));
            
            var event = {
              id: reservation.reservationUuid,
              start: reservation.startDateTime,
              end: reservation.endDateTime,
              title: 'Reserva ' ,
              backgroundColor: 'rgba(241,0,117,.25)',
              borderColor: '#f10075'
            }

            this.reservations.push(event);
          }
          debugger;

          this.calendarOptions.events = this.reservations;
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
}
