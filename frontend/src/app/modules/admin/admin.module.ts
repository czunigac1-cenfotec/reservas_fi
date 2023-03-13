import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { NgxMaskModule } from 'ngx-mask';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { RoomAvailabilityComponent } from './room/room-availability/room-availability.component';
import { RoomAvailabilityPeriodComponent } from './room/room-availability-period/room-availability-period.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail/resource-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'user-detail/:userInfoId',
    component: UserDetailComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'room-list',
    component: RoomListComponent,
  },
  {
    path: 'room-detail/:roomId',
    component: RoomDetailComponent,
  },
  {
    path: 'room-availability/:roomAvailabilityId',
    component: RoomAvailabilityComponent,
  },
  {
    path: 'room-availability-period',
    component: RoomAvailabilityPeriodComponent,
  },
  {
    path: 'resource-list',
    component: ResourceListComponent,
  },
  {
    path: 'resource-detail',
    component: ResourceDetailComponent,
  } 
]

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [UserListComponent,UserDetailComponent, RoomListComponent, RoomDetailComponent, 
                RoomAvailabilityComponent, RoomAvailabilityPeriodComponent, ResourceListComponent, ResourceDetailComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    FullCalendarModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AdminModule { }
