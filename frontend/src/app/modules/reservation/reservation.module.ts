import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import {NgxMaskModule} from 'ngx-mask'

import { HomeComponent } from './home/home.component';  
import { JsonFormComponent } from 'src/app/core/components/json-form/json-form.component';
import { ReservationCalendarComponent } from './reservation-calendar/reserve-calendar.component';
import { ReservationDetailComponent } from './reservation-detail/reserve-detail.component';
import { ReservationGroupComponent } from './reservation-group/reservation-group.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'reservation-calendar',
    component: ReservationCalendarComponent,
  },
  {
    path: 'reservation-detail/:reserveId/:roomUuid/:startStr/:endStr',
    component: ReservationDetailComponent,
  },
]

@NgModule({
  declarations: [HomeComponent,JsonFormComponent,ReservationCalendarComponent,ReservationDetailComponent, ReservationGroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ReservationModule { }
