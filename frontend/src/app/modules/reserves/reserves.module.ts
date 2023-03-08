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
import { ReserveCalendarComponent } from './reserve-calendar/reserve-calendar.component';
import { ReserveDetailComponent } from './reserve-detail/reserve-detail.component';

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
    path: 'reserve-calendar',
    component: ReserveCalendarComponent,
  },
  {
    path: 'reserve-detail/:reserveId/:startStr/:endStr',
    component: ReserveDetailComponent,
  },
]

@NgModule({
  declarations: [HomeComponent,JsonFormComponent, ReserveCalendarComponent, ReserveDetailComponent,],
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
export class ReservesModule { }
