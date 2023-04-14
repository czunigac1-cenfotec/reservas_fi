import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ApprobalStatusList } from 'src/app/core/dummy-datas/approval_status.data';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { RoomService } from 'src/app/core/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reserveId: string;
  isUpdate: boolean = true;

  formatter: NgbDateParserFormatter;

  reservation = {
    reservationUuid:"",
    reservationGroupUuid: "1aff8563-1391-4a79-8919-7ec05ee14b44",
    roomUuid: "",
    startDateTime: { hour: 13, minute: 30 },
    endDateTime: { hour: 13, minute: 30 },
    beginDate: { "year": 2023, "month": 3, "day": 5 },
    endDate: { "year": 2023, "month": 3, "day": 5 },
    groupId: "",
    motive: "",
    approvalState: false,
    notes: "",
    userId: "",
    creationDate: ""
  }

  approvalStatus: ApprobalStatusList[] = [];
  rooms: [];
  resources: [];
  selectedResources: any = null;
  selectedRoom: string = '';
  selectedState: string = '';
  time = {};
  defaultTimepickerCode: any;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private reservationService: ReservationService) { }

    
  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {

      this.reserveId = params.reserveId;

      this.reservation.startDateTime = {
        hour: parseInt(params.startStr.split("T")[1].split(":")[0]),
        minute: parseInt(params.startStr.split("T")[1].split(":")[1])
      };

      this.reservation.beginDate = {
        "year": parseInt(params.startStr.split("T")[0].split("-")[0]),
        "month": parseInt(params.startStr.split("T")[0].split("-")[1]),
        "day": parseInt(params.startStr.split("T")[0].split("-")[2])
      };

      this.reservation.endDateTime = {
        hour: parseInt(params.endStr.split("T")[1].split(":")[0]),
        minute: parseInt(params.endStr.split("T")[1].split(":")[1])
      };

      this.reservation.endDate = {
        "year": parseInt(params.startStr.split("T")[0].split("-")[0]),
        "month": parseInt(params.startStr.split("T")[0].split("-")[1]),
        "day": parseInt(params.startStr.split("T")[0].split("-")[2])
      };
    });

    this.approvalStatus = ApprobalStatusList.status;
    this.getRoomsList();
    this.getResourceList();

    if (this.reserveId === '-1') {
      this.isUpdate = false;
    } else {
      this.getReserveInfo();
    }
  }

  getReserveInfo(): void {
    console.log("get info");

    this.reservationService.get(this.reserveId).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        
        this.reservation.startDateTime = {
          hour: parseInt(data.startDateTime.split("T")[1].split(":")[0]),
          minute: parseInt(data.startDateTime.split("T")[1].split(":")[1])
        };
  
        this.reservation.beginDate = {
          "year": parseInt(data.startDateTime.split("T")[0].split("-")[0]),
          "month": parseInt(data.startDateTime.split("T")[0].split("-")[1]),
          "day": parseInt(data.startDateTime.split("T")[0].split("-")[2])
        };
  
        this.reservation.endDateTime = {
          hour: parseInt(data.endDateTime.split("T")[1].split(":")[0]),
          minute: parseInt(data.endDateTime.split("T")[1].split(":")[1])
        };
  
        this.reservation.endDate = {
          "year": parseInt(data.endDateTime.split("T")[0].split("-")[0]),
          "month": parseInt(data.endDateTime.split("T")[0].split("-")[1]),
          "day": parseInt(data.endDateTime.split("T")[0].split("-")[2])
        };
        
        this.reservation.reservationUuid = data.reservationUuid;
        this.reservation.reservationGroupUuid = data.reservationGroupUuid;
        this.reservation.roomUuid = data.roomUuid;
        //this.reservation.resourceUuids = data.resourceUuids;
        this.reservation.groupId = data.groupId;
        this.reservation.motive = data.motive;
        this.reservation.approvalState = data.approvalState;
        this.reservation.notes = data.notes;
        this.reservation.userId = data.userId;
        this.reservation.creationDate = data.creationDate;
  
        this.selectedResources = data.resourceUuids;
        this.selectedRoom = data.roomUuid;
        this.selectedState = data.approvalState;
      
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
      }
    })
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

  getResourceList(): void {

    this.resourceService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data.length >= 1) {
          for (const resource of data) {
            console.log(resource.resourceUuid);
            this.resources = data;
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

  save(): void {
    console.log('save');
    console.log(this.getReservation());
    this.reservationService.create(this.getReservation()).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToCalendar();
        })
      },
      error:(e)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Se ha producido un error: ' + e.status + '\n| Detalles:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  update(): void {
    console.log('update');

    this.resourceService.update(this.getReservation(), this.reserveId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error:(e)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error:' + e.status + '| Detalle:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  showDeleteConfirmation() : void {
    Swal.fire({
      title: '¿Desea eliminar el recurso?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText:'',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.delete();
      }
    })
  }

  delete(): void {
    this.resourceService.delete(this.getReservation()).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToCalendar();
        })
      },
      error:(e)=>{
        console.log(e);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Code:' + e.status + '| Detail:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  saveOrUpdate():void{
    if(this.isUpdate){
      this.update();
    }else{
      this.save();
    }
  }

  getReservation(): any{
    var newReservation = {
      reservationGroupUuid:this.reservation.reservationGroupUuid,
      startDateTime: this.getFormattedDate(this.reservation.beginDate)+"T"+
                     this.getFormattedTime(this.reservation.startDateTime),
      endDateTime: this.getFormattedDate(this.reservation.endDate)+"T"+
                   this.getFormattedTime(this.reservation.endDateTime),
      approvalState:this.reservation.approvalState,
      motive: this.reservation.motive,
      notes: this.reservation.notes,
      roomUuid: this.selectedRoom,
      //TODO: Get it from local storage
      userUuid:"3afd91e5-ebcd-468a-b03e-5b63266d21d7",
      resourceUuids:this.selectedResources,
      reservationUuid:this.reservation.reservationUuid
    }

    return newReservation;
  }

  getFormattedDate(date:any):string
  {
    let year = date.year;
    let month = date.month <= 9 ? '0' + date.month : date.month;
    let day = date.day <= 9 ? '0' + date.day : date.day;
    let formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  getFormattedTime(time:any):string
  {
    let hour = time.hour <= 9 ? '0' + time.hour : time.hour;
    let minute = time.minute <= 9 ? '0' + time.minute : time.minute;
    let formattedDate = hour + ":" + minute + ":00";

    return formattedDate;
  }

  navigateToCalendar(): void {
    this.router.navigate(['/reservation/reservation-calendar']);
  }

}
