import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApprobalStatusList } from 'src/app/core/dummy-datas/approval_status.data';
import { RoomList } from 'src/app/core/dummy-datas/room.data';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reserveId: string;
  isUpdate: boolean = true; 

  reservation = {
    code:0,
    beginDateTime:{hour: 13, minute: 30},
    endDateTime:{hour: 13, minute: 30},
    beginDate: {"year": 2023,"month": 3,"day": 5} ,
    endDate: {"year": 2023,"month": 3,"day": 5} ,
    groupId:"",
    motive:"",
    approvalState:"",
    note:"",
    userId: "",
    creationDate:""
  }

  approvalStatus: ApprobalStatusList[] = [];
  rooms: RoomList[] = [];

  time = {};
  defaultTimepickerCode: any;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    
    this.activeRoute.params.subscribe((params: Params) => {

      this.reserveId = params.reserveId; 
      this.reservation.beginDateTime = {
                  hour: parseInt(params.startStr.split("T")[1].split(":")[0]), 
                  minute: parseInt(params.startStr.split("T")[1].split(":")[1])
                };
      this.reservation.beginDate =  {"year": parseInt(params.startStr.split("T")[0].split("-")[0]),
                                 "month": parseInt(params.startStr.split("T")[0].split("-")[1]),
                                 "day": parseInt(params.startStr.split("T")[0].split("-")[2])
                                }; 

      this.reservation.endDateTime = {
        hour: parseInt(params.endStr.split("T")[1].split(":")[0]), 
        minute: parseInt(params.endStr.split("T")[1].split(":")[1])
      };
      this.reservation.endDate = {"year": parseInt(params.startStr.split("T")[0].split("-")[0]),
                              "month": parseInt(params.startStr.split("T")[0].split("-")[1]),
                              "day": parseInt(params.startStr.split("T")[0].split("-")[2])
                             };   
    });

    if (this.reserveId === '-1') {
      this.isUpdate = false;
    }else{
      this.getReserveInfo();
    }

    this.approvalStatus = ApprobalStatusList.status;
    this.rooms = RoomList.status;
  }

  getReserveInfo():void{
    console.log("get info");  
  }

  navigateToCalendar(): void {
    this.router.navigate(['/reservation/reservation-calendar']);
  }
  
}
