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
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { RoomAvailability } from 'src/app/interfaces/room-availability.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { WeekdayEventsMap } from 'src/app/interfaces/weekday-events-map';
import { WeekdayEvents } from 'src/app/interfaces/weekday-events';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  userInfo:any;

  reservations: any = [];
  availability: any = [];
  availabilityPeriod: any = [];
  
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
    
  roomAvailability: RoomAvailability ={
    roomAvailabilityUuid: '',
    administratorUuid: '',
    roomUuid: '',
    minReservationTime: 0,
    maxReservationTime: 0,
    approvalRequired: false,
    startDateTime: '',
    endDateTime: '',
    privateReservationEnabled: false,
    availabilityPeriods: []
  }
  
  room: Room = {
    roomUuid: '',
    roomAvailabilityUuid: '',
    inactive: false,
    code: '',
    name: '',
    description: '',
    location: '',
    capacity: 0,
    creationDateTime: '',
    administratorUuid: '',
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
    private modalService: NgbModal,
    private $localStorage: LocalStorageService, 
    private $sessionStorage: SessionStorageService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {

      this.reserveId = params.reserveId;
      this.selectedRoom = params.roomUuid;
      
      this.scheduleStartDate = params.startStr;
      this.scheduleEndDate = params.endStr;

      this.reservation.roomUuid = this.selectedRoom;

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
    this.getRoomInfo();

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
    var isValid = true;
    var isInRange = true;
    var isOrdered = true;

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
      
    }else if(beginDate>endDate){
      isOrdered = false;
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique la hora de inicio y hora de fin',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      
      this.reservations.forEach((element: any) => {
      
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
    }

    return (isInRange && isValid && isOrdered);
  }

  validateGroupReservation():boolean{

    this.getAvailabilityByRoom();
    var isValid = true;
    var isDateInRange = false;
    var isTimeInRange = false;
    var isDatetimeBlocked = false;
    var dateTimeBlocked = ''

    var dayOfWeekLetters = Utility.getWeekDayName(this.selectedDay);
    var beginDate = new Date(this.getFormattedDate(this.reservation.beginDate) + "T" + this.getFormattedTime(this.reservation.startDateTime));
    var endDate = new Date(this.getFormattedDate(this.reservation.endDate) + "T" + this.getFormattedTime(this.reservation.endDateTime));

    if(beginDate>endDate){
      isValid = false;

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique el rango de fecha',
        showConfirmButton: false,
        timer: 1500
      })

    }else if(this.isValidTimeRange(beginDate,endDate) ){

      isValid = false;
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique el rango de horas',
        showConfirmButton: false,
        timer: 1500
      })

    }else{
      
        if(( new Date(beginDate) >=  new Date(this.roomAvailability.startDateTime) && 
          new Date(endDate) <= new Date(this.roomAvailability.endDateTime)))
        {
          isDateInRange = true;
        }

        if(!isDateInRange){
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Fecha seleccionada fuera de rango de disponibilidad',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.availabilityPeriod.forEach((element: any) => {
   
            if(this.selectedDay === element.weekday){

              if ((Number(this.reservation.startDateTime.hour) >= Number(element.startTimeHour) && Number(this.reservation.endDateTime.hour) <= Number(element.endTimeHour))) 
              {
                if((Number(this.reservation.startDateTime.minute) >= Number(element.startTimeMinutes) && Number(this.reservation.endDateTime.minute) <= Number(element.endTimeMinutes))){
                  isTimeInRange = true;
                }
              }
            }
          });

          if(!isTimeInRange){
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'La hora seleccionada no se encuentra en el rango habilitado para el salón.',
              showConfirmButton: false,
              timer: 1500
            })
          }else{

            const currentDate = new Date(beginDate);

            while (currentDate <= endDate) {
              if (currentDate.getDay() === this.selectedDay) {
       
                if(this.reservations != null && this.reservations.length>0){
                  this.reservations.forEach((reservation:any) => {
                   
                    if((new Date(reservation.startDateTime).getDay())===this.selectedDay){
                        if(new Date(reservation.startDateTime).setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0) ){

                          if ((Number(this.reservation.startDateTime.hour) >= Number(new Date(reservation.startDateTime).getHours() && Number(this.reservation.endDateTime.hour) <= Number(new Date(reservation.endDateTime).getHours())))) 
                          {
                            if((Number(this.reservation.startDateTime.minute) >= Number(new Date(reservation.startDateTime).getMinutes()) && Number(this.reservation.endDateTime.minute) <= Number(new Date(reservation.endDateTime).getMinutes()))){
                              isDatetimeBlocked = true;
                              dateTimeBlocked = reservation.startDateTime + ' | ' + reservation.endDateTime
                            }
                          }
                        }

                        if(isDatetimeBlocked){
                          Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'El horario ya ha sido reservado previamente: ' + dateTimeBlocked,
                            showConfirmButton: false,
                            timer: 1500
                          })
                        }
                    }
                  });
                }

              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
      }
    }

    return (isValid && isDateInRange && isTimeInRange && !isDatetimeBlocked);
  }

  getReservation(): any {
    
    this.getUserInfo();

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
      userUuid: this.userInfo.userInfoUuid,
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
      userUuid: this.userInfo.userInfoUuid,
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

    if(this.validateGroupReservation()){

      if(!this.isDateOverlapping(this.schedules)){
        this.schedules.push(schedule);

        dataTableRows.push([
          schedule.dayInWeek,
          schedule.startDateTime,
          schedule.endDateTime
        ]);

        this.scheduleDataTable.rows().add(dataTableRows);
      }
    }
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
    this.getUserInfo();
  
    const weekdayEventsMap: WeekdayEventsMap = {};
  
    if (this.schedules.length > 0) {
      this.schedules.forEach(item => {
        const dayNumber = this.getDayNumber(item.dayInWeek);
        if (dayNumber !== undefined) {
          if (!weekdayEventsMap[dayNumber]) {
            weekdayEventsMap[dayNumber] = [];
          }

          debugger;

          const currentDate = new Date(item.startDateTime);
          const today = new Date();
          const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
          var lastDayOfInterval = new Date();

          if(this.areDatesEqual(currentDate,new Date(item.endDateTime))){
            lastDayOfInterval = lastDay;
          }else{
            lastDayOfInterval = item.endDateTime;
          }

          while (currentDate <= new Date(lastDayOfInterval)) {
            
            if (currentDate.getDay() === dayNumber) {	
            
              var startDateTime = currentDate.setHours(new Date(item.startDateTime).getHours(),new Date(item.startDateTime).getMinutes());
              var endDateTime = currentDate.setHours(new Date(item.endDateTime).getHours(),new Date(item.endDateTime).getMinutes());

              var startDateTimeFormatted : string = <string> new DatePipe('en-US').transform(startDateTime, 'yyyy-MM-ddTHH:mm:ss');
              var endDateTimeFormatted : string = <string> new DatePipe('en-US').transform(endDateTime, 'yyyy-MM-ddTHH:mm:ss');

              debugger;

                const newItem: WeekdayEvents = {
                startDateTime: startDateTimeFormatted,
                endDateTime: endDateTimeFormatted,
                motive: this.reservation.motive,
                notes: this.reservation.notes,
                roomUuid: this.reservation.roomUuid
                };
  
                weekdayEventsMap[dayNumber].push(newItem);
            }

            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
    }
  
    const weekdays: { dayNumber: number; weekdayEvents: WeekdayEvents[] }[] = [];
    
    // Convert weekdayEventsMap to the desired weekdays array format
    for (let dayNumber in weekdayEventsMap) {
      if (weekdayEventsMap.hasOwnProperty(dayNumber)) {
        weekdays.push({
          dayNumber: parseInt(dayNumber),
          weekdayEvents: weekdayEventsMap[dayNumber]
        });
      }
    }
  
    const newData = {
      userUuid: this.userInfo.userInfoUuid,
      weekdays: weekdays
    };
  
    const jsonString = JSON.stringify(newData);
    debugger;
    console.log(jsonString);
    this.saveResevationGroup(jsonString);
  }  

  getDayNumber(dayInWeek: string): number | undefined {
    const dayIndexes: { [key: string]: number } = {
      "Lunes": 1,
      "Martes": 2,
      "Miércoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sábado": 6,
      "Domingo": 7
    };
    return dayIndexes[dayInWeek];
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
    
      this.availabilityPeriod.push(period);

    });
  }

  getResevations(): void {

    this.reservationService.getAll().subscribe({
      next: (data) => {

        console.log(data);

        if (data !== null) {
          if (data.length >= 1) {
            for (const reservation of data) {
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

  getRoomAvailability(roomAvailabilityId:any){
    this.roomAvailabilityService.get(roomAvailabilityId).subscribe({
      next:(data)=>{
        console.log(data);
        this.roomAvailability = data;
        this.roomAvailability.startDateTime = Utility.getOnlyDateString(data.startDateTime);
        this.roomAvailability.endDateTime = Utility.getOnlyDateString(data.endDateTime);

      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  getRoomInfo():void{
    this.roomService.get(this.selectedRoom).subscribe({
      next:(data)=>{

        console.log(data);
        this.room = data;
      
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
        this.getRoomAvailability(this.room.roomAvailabilityUuid);
      } 
    })
  }

  getUserInfo(){
    try {
      this.userInfo  = this.$localStorage.retrieve('userInfo')

      if (this.userInfo === null) {
        this.userInfo = this.$sessionStorage.retrieve('userInfo')
      }
    }catch(exception){
      console.error(exception);
    }
  }

  areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  isDateOverlapping(dataTableRows:any): boolean {

    var overlapsExistingReservation = false;

    // Convert reservation start and end times to Date objects
    const newReservationStart = new Date(this.getFormattedDate(this.reservation.beginDate) + "T" + this.getFormattedTime(this.reservation.startDateTime));
    const newReservationEnd = new Date(this.getFormattedDate(this.reservation.endDate) + "T" + this.getFormattedTime(this.reservation.endDateTime));

    // Iterate through the existing reservations and check for overlaps
    for (let i = 0; i < dataTableRows.length; i++) {
        const existingReservationStart = new Date(dataTableRows[i].startDateTime);
        const existingReservationEnd = new Date(dataTableRows[i].endDateTime);

        // Check for overlap
        if (
            (newReservationStart >= existingReservationStart && newReservationStart <= existingReservationEnd) ||
            (newReservationEnd >= existingReservationStart && newReservationEnd <= existingReservationEnd) ||
            (existingReservationStart >= newReservationStart && existingReservationStart <= newReservationEnd) ||
            (existingReservationEnd >= newReservationStart && existingReservationEnd <= newReservationEnd)
        ) {
            overlapsExistingReservation = true;
            break; // Exit the loop if an overlap is found
        }
    }

    if (overlapsExistingReservation) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'La reserva se superpone con una reserva existente.',
            showConfirmButton: false,
            timer: 1500
        });
    }

    return overlapsExistingReservation;
  }

  isValidTimeRange(beginDate: Date, endDate: Date): boolean {
    return beginDate <= endDate && beginDate.getHours() === endDate.getHours() && beginDate.getMinutes() === endDate.getMinutes();
  }
}
