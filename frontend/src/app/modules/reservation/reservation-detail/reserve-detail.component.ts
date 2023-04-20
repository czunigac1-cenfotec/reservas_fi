import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprobalStatusList } from 'src/app/core/dummy-datas/approval_status.data';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { RoomService } from 'src/app/core/services/room.service';
import { DataTable } from 'simple-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reserveId: string;
  isUpdate: boolean = true;
  scheduleModalCloseResult: string = '';
  scheduleDataTable: any;

  formatter: NgbDateParserFormatter;

  reservation = {
    reservationUuid: "",
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
  schedules: any[] = [];
  selectedResources: any = null;
  selectedRoom: string = '';
  selectedState: string = '';
  selectedDay = 0;
  time = {};
  defaultTimepickerCode: any;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private reservationService: ReservationService,
    private modalService: NgbModal) { }


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
      next: (result) => {
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

  update(): void {
    console.log('update');

    this.reservationService.update(this.getReservationForUpdate(), this.reserveId).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso actualizado correctamente',
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
      title: '¿Desea eliminar el recurso?',
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
          title: 'Recurso eliminado correctamente',
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
      this.update();
    } else {
      this.save();
    }
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
      resourceUuids: this.selectedResources
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
    this.getDaysSelected();
    this.modalService.dismissAll();
  }

  addNewSchedule(): void {

    const dataTableRows: any = [];

    if (this.scheduleDataTable == undefined) {
      this.initTable();
    }

    var dayOfWeekLetters = this.getDayInLetters(this.selectedDay);

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

  getDayInLetters(code: any): any {

    var dayInLetters = '';

    switch (code) {
      case 0:
        dayInLetters = 'Lunes';
        break;
      case 1:
        dayInLetters = 'Martes';
        break;
      case 2:
        dayInLetters = 'Miércoles';
        break;
      case 3:
        dayInLetters = 'Jueves';
        break;
      case 4:
        dayInLetters = 'Viernes';
        break;
      case 5:
        dayInLetters = 'Sábado';
        break;
      case 6:
        dayInLetters = 'Domingo';
        break;
    }

    return dayInLetters;
  }

  getDaysSelected(): any {

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

        debugger;

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

  }
}
