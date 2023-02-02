import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { UserListComponent } from './user/user-list/user-list.component';

import { UserDetailComponent } from './user/user-detail/user-detail.component';

import {NgxMaskModule} from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'user-detail/:userInfoId',
    component: UserDetailComponent,
  }
]

@NgModule({
  declarations: [UserListComponent,UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AdminModule { }
