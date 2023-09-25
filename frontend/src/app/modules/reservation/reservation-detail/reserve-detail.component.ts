import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprobalStatusList } from 'src/app/core/dummy-datas/approval_status.data';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { RoomService } from 'src/app/core/services/room.service';
import { DataTable } from 'simple-datatables';
import Swal from 'sweetalert2';
import { Utility } from 'src/app/shared/utility';
import { ReservationGroupsService } from 'src/app/core/services/reservation-groups.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reservations: any = [];
  availability: any = [];
  
  reserveId: string;
  isUpdate: boolean = true;
  scheduleModalCloseResult: string = '';
  scheduleDataTable: any;
  isScheduledReservation = false;

  scheduleStartDate = '';
  scheduleEndDate = '';

  formatter: NgbDateParserFormatter;

  reservation = {
    reservationUuid: "",
    reservationGroupUuid: "",
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
  schedules: any[] = [];
  selectedResources: any = null;
  selectedRoom: string = '';
  selectedState: string = '';
  selectedDay = 1;
  time = {};
  defaultTimepickerCode: any;
  reservationGroupId = '';

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private reservationService: ReservationService,
    private roomAvailabilityService: RoomAvailabilityService,
    private reservationGroupService: ReservationGroupsService,
    private modalService: NgbModal) { }


  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {

      this.reserveId = params.reserveId;
      this.selectedRoom = params.roomUuid;
      
      this.scheduleStartDate = params.startStr;
      this.scheduleEndDate = params.endStr;

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

    this.getResevations();
    this.getAvailabilityByRoom();

  }

  initTable(): void {
    this.scheduleDataTable = new DataTable('#scheduleDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
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
        if(data != null){
          if (data.length >= 1) {
            for (const resource of data) {
              console.log(resource.resourceUuid);
              this.resources = data;
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

  save(): void {
    console.log('save');
    console.log(this.getReservation());
    this.reservationService.create(this.getReservation()).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Reserva registrada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToCalendar();
        })
      },
      error: (e) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Se ha producido un error: ' + e.status + '\n| Detalles:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  saveResevationGroup(schedule: string): void {
    console.log('save group');
    console.log(schedule);
    this.reservationGroupService.create(schedule).subscribe({
      next: (result) => {

        if(result[0]!= null){
          this.reservationGroupId = result[0].reservations[0].reservationGroupUuid;
        }

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Reserva registrada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToCalendar();
        })
      },
      error: (e) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Se ha producido un error: ' + e.status + '\n| Detalles:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => {
        console.log("done");
        this.isScheduledReservation = true;
      }
    })
  }

  update(): void {
    console.log('update');

    this.reservationService.update(this.getReservationForUpdate(), this.reserveId).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Reserva actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (e) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error:' + e.status + '| Detalle:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  showDeleteConfirmation(): void {
    Swal.fire({
      title: '¿Desea eliminar la reserva?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: '',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.delete();
      }
    })
  }

  delete(): void {
    this.reservationService.delete(this.reserveId).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Reserva eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToCalendar();
        })
      },
      error: (e) => {
        console.log(e);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Code:' + e.status + '| Detail:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  saveOrUpdate(): void {
    if (this.isUpdate) {
      if(this.validateTime()){
        this.update();
      }
    } else {
      if(this.validateTime()){
        this.save();
      }
    }
  }

  validateTime():boolean{
    var isValid = false;
    var isInRange = true;

    debugger;
    var beginDate = new Date(this.getFormattedDate(this.reservation.beginDate) + "T" +
                                this.getFormattedTime(this.reservation.startDateTime));
    var endDate = new Date(this.getFormattedDate(this.reservation.endDate) + "T" +
                              this.getFormattedTime(this.reservation.endDateTime));

    if(beginDate < new Date(this.scheduleStartDate)  || endDate > new Date(this.scheduleEndDate)){
      isInRange = false;
    }

    if(!isInRange){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Horario seleccionado fuera de rango',
        showConfirmButton: false,
        timer: 1500
      })
    }

    this.reservations.forEach((element: any) => {
      debugger;

      if(beginDate.getDate() == new Date(element.startDateTime).getDate() &&
         endDate.getDate() == new Date(element.endDateTime).getDate() ){

          if(beginDate.getTime() >= new Date(element.startDateTime).getTime()  || endDate.getTime() <= new Date(element.endDateTime).getTime()){
            isValid = false;
          }     
      }
    });

    if(!isValid){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Horario ya ha sido reservado',
        showConfirmButton: false,
        timer: 1500
      })
    }

    return (isInRange && isValid);
  }

  getReservation(): any {
    
    var newReservation = {
      reservationGroupUuid: this.reservation.reservationGroupUuid,
      startDateTime: this.getFormattedDate(this.reservation.beginDate) + "T" +
        this.getFormattedTime(this.reservation.startDateTime),
      endDateTime: this.getFormattedDate(this.reservation.endDate) + "T" +
        this.getFormattedTime(this.reservation.endDateTime),
      approvalState: this.reservation.approvalState,
      motive: this.reservation.motive,
      notes: this.reservation.notes,
      roomUuid: this.selectedRoom,
      //TODO: Get it from local storage
      userUuid: "3afd91e5-ebcd-468a-b03e-5b63266d21d7",
      resourceUuids: this.selectedResources,
    }

    return newReservation;
  }

  getReservationForUpdate(): any {
    var newReservation = {
      reservationGroupUuid: this.reservation.reservationGroupUuid,
      startDateTime: this.getFormattedDate(this.reservation.beginDate) + "T" +
        this.getFormattedTime(this.reservation.startDateTime),
      endDateTime: this.getFormattedDate(this.reservation.endDate) + "T" +
        this.getFormattedTime(this.reservation.endDateTime),
      approvalState: this.reservation.approvalState,
      motive: this.reservation.motive,
      notes: this.reservation.notes,
      roomUuid: this.selectedRoom,
      //TODO: Get it from local storage
      userUuid: "3afd91e5-ebcd-468a-b03e-5b63266d21d7",
      resourceUuids: this.selectedResources,
      reservationUuid: this.reservation.reservationUuid
    }

    return newReservation;
  }

  getFormattedDate(date: any): string {
    let year = date.year;
    let month = date.month <= 9 ? '0' + date.month : date.month;
    let day = date.day <= 9 ? '0' + date.day : date.day;
    let formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  getFormattedTime(time: any): string {
    let hour = time.hour <= 9 ? '0' + time.hour : time.hour;
    let minute = time.minute <= 9 ? '0' + time.minute : time.minute;
    let formattedDate = hour + ":" + minute + ":00";

    return formattedDate;
  }

  navigateToCalendar(): void {
    this.router.navigate(['/reservation/reservation-calendar']);
  }

  openScheduleModel(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  saveSchedules(): void {
    this.saveSelectedDays();
    this.modalService.dismissAll();
  }

  addNewSchedule(): void {

    const dataTableRows: any = [];

    if (this.scheduleDataTable == undefined) {
      this.initTable();
    }

    var dayOfWeekLetters = Utility.getWeekDayName(this.selectedDay);

    var schedule = {
      startDateTime: this.getFormattedDate(this.reservation.beginDate) + "T" +
        this.getFormattedTime(this.reservation.startDateTime),
      endDateTime: this.getFormattedDate(this.reservation.endDate) + "T" +
        this.getFormattedTime(this.reservation.endDateTime),
      dayInWeek: dayOfWeekLetters
    }

    this.schedules.push(schedule);

    dataTableRows.push([
      schedule.dayInWeek,
      schedule.startDateTime,
      schedule.endDateTime
    ]);

    this.scheduleDataTable.rows().add(dataTableRows);

  }

  getReservationGroup(): void {

    this.reservationGroupService.getAll().subscribe({
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

  saveSelectedDays(): any {

    var newData = {
      //TODO:Get User
      userUuid: "b66c689f-717b-43cc-a355-36ce71d58d3f",
      schedule: {
        weekdays: {
          0: [] = ([{}]),
          1: [] = ([{}]),
          2: [] = ([{}]),
          3: [] = ([{}]),
          4: [] = ([{}]),
          5: [] = ([{}]),
          6: [] = ([{}])
        }
      }
    }

    if (this.schedules.length > 0) {
      this.schedules.forEach(item => {

        var newItem = {
          startDateTime: item.startDateTime,
          endDateTime: item.endDateTime,
          motive: this.reservation.motive,
          notes: this.reservation.notes,
          roomUuid: this.reservation.roomUuid
        }

        switch (item.dayInWeek) {
          case "Lunes":
            newData.schedule.weekdays[0].push(newItem);
            break;
          case "Martes":
            newData.schedule.weekdays[1].push(newItem);
            break;

          case "Miércoles":
            newData.schedule.weekdays[2].push(newItem);
            break;

          case "Jueves":
            newData.schedule.weekdays[3].push(newItem);
            break;

          case "Viernes":
            newData.schedule.weekdays[4].push(newItem);
            break;

          case "Sábado":
            newData.schedule.weekdays[5].push(newItem);
            break;

          case "Domingo":
            newData.schedule.weekdays[6].push(newItem);
            break;
          default:
            break;
        }

      });
    }

    console.log(JSON.stringify(newData));
    this.saveResevationGroup(JSON.stringify(newData));

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
      }
    })
  }

  getEventListFromAvailability(availabilityPeriods:any) {

    let startDate  = this.getFormattedTime(this.reservation.startDateTime);
    let endDate = this.getFormattedTime(this.reservation.endDateTime);

    availabilityPeriods.forEach((period: any) => {
      
      var periodStartDate = new Date(startDate);
       periodStartDate.setDate(periodStartDate.getDate() + period.weekday);
       periodStartDate.setHours(period.startTimeHour);
       periodStartDate.setMinutes(period.startTimeMinutes);

      var periodEndDate = new Date(endDate);
      periodEndDate.setDate(periodEndDate.getDate() + period.weekday);
      periodEndDate.setHours(period.endTimeHour);
      periodEndDate.setMinutes(period.endTimeMinutes);

      var schedule = {
        startDate: periodStartDate,
        endDate: periodEndDate
      }

      this.availability.push(schedule);

    });
  }

  getResevations(): void {

    this.reservationService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data !== null) {
          if (data.length >= 1) {
            for (const reservation of data) {
              var roomName = '';
              console.log(JSON.stringify(reservation));
              this.reservations.push(reservation);
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
}
