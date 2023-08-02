import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { AvailabilityPeriodService } from 'src/app/core/services/availability-period.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import { RoomAvailabilityPeriodComponent } from '../room-availability-period/room-availability-period.component';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';
import { Utility } from 'src/app/shared/utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-availability-period-list',
  templateUrl: './room-availability-period-list.component.html',
  styleUrls: ['./room-availability-period-list.component.scss']
})
export class RoomAvailabilityPeriodListComponent implements OnInit {

  @ViewChild(RoomAvailabilityPeriodComponent) roomAvailabilityPeriodComponent: RoomAvailabilityPeriodComponent
  @Input() roomAvailabilityId: any;
  @Input() roomId: any;
  @Input() roomAvailability: any;

  dataTableRows: any = [];

  /**
  * ChildView callback
  *
  * @param {object} availabilityPeriod - AvailabilityPeriod Object
  */
  savePeriod(availabilityPeriod: object): void {

    if(availabilityPeriod!=null){
      console.log(JSON.stringify(availabilityPeriod));
      this.saveInService(availabilityPeriod);
    }
    
  }

  constructor(private service: AvailabilityPeriodService,
    private availabilityService: RoomAvailabilityService,
    private elementRef: ElementRef) { }

  availabilityPeriodDataTable: any;
  isDelete = false;

  ngOnInit(): void {
    this.initTable();
    this.getList();
  }

  initTable(): void {
    this.availabilityPeriodDataTable = new DataTable('#availabilityPeriodDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  saveAvailabilityPeriod() {
    this.roomAvailabilityPeriodComponent.addAvailabilityPeriod();
  }

  saveInService(availabilityPeriod: AvailabilityPeriod) {

    var serviceResponse: any;
    const newAvailabilityPeriod = { ...availabilityPeriod };
    delete newAvailabilityPeriod.availabilityPeriodUuid;

    this.service.create(newAvailabilityPeriod).subscribe({
      next: (data) => {
        console.log(data);
        serviceResponse = data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.updateRoomAvailability(serviceResponse.availabilityPeriodUuid, false);
      }
    })
  }

  getList(): void {

    this.availabilityService.getAvailabilityPeriods(this.roomId).subscribe({
      next: (data) => {

        console.log(data);

        if (data != null) {
          if (data.hasOwnProperty('availabilityPeriods')) {

            for (const availabilityPeriod of data.availabilityPeriods.sort((a: { weekday: number; }, b: { weekday: number; }) => a.weekday - b.weekday)) {
              this.dataTableRows.push(this.getRow(availabilityPeriod));
            }

          } else {
            this.dataTableRows.push(this.getRow(data));
          }

          if (data.availabilityPeriods.length > 0) {
            this.roomAvailabilityPeriodComponent.updateDataTable(this.dataTableRows);
            this.availabilityPeriodDataTable.rows().add(this.dataTableRows);
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.addRowEvents();
      }
    })
  }

  updateRoomAvailability(availabilityPeriodUuid: any, isDelete: boolean) {

    console.log('update');

    var availabilityPeriods: any = [];
    var roomAvailabilityLocal: any;
    this.isDelete = isDelete;

    if (!isDelete) {
      availabilityPeriods.push(availabilityPeriodUuid);
    }

    for (let availabilityPeriod of this.dataTableRows) {
      if (isDelete) {

        if (availabilityPeriod[4] != availabilityPeriodUuid) {
          availabilityPeriods.push(availabilityPeriod[4]);
        }
      } else {
        availabilityPeriods.push(availabilityPeriod[4]);
      }
    }

    var roomAvailabilityLocal:any = 
    {
        roomAvailabilityUuid:this.roomAvailabilityId,
        roomUuid: this.roomId,
        //TODO:Get admin UUID from user security
        administratorUuid: "9cff8d97-1a50-49fe-b173-93797d29c03b",
        minReservationTime: this.roomAvailability.minReservationTime,
        maxReservationTime: this.roomAvailability.maxReservationTime,
        approvalRequired: this.roomAvailability.approvalRequired,
        privateReservationEnabled: this.roomAvailability.privateReservationEnabled,
        startDateTime: Utility.getStringFormattedDate(this.roomAvailability.startDateTime),
        endDateTime: Utility.getStringFormattedDate(this.roomAvailability.endDateTime),
        availabilityPeriods: availabilityPeriods
    }    

    this.availabilityService.update(roomAvailabilityLocal, this.roomAvailabilityId).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Disponibilidad actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        if (isDelete) {
          this.deleteInService(availabilityPeriodUuid);
        }
      },
      error: (e: any) => {
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
        if(!isDelete){
          this.reloadAfterChange();
          this.getList();
        }else{
          isDelete = false;
        }
      }
    })
  }

  delete(periodId: string): void {
    this.updateRoomAvailability(periodId, true);
  }

  deleteInService(periodId: string) {
    console.log("delete " + periodId);
    this.service.delete(periodId).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Disponibilidad eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          console.log(result);
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
        this.reloadAfterChange();
        this.getList();
      }
    })
  }

  getRow(availabilityPeriod: any) {

    var period = {
      id: availabilityPeriod.availabilityPeriodUuid,
      weekday: Utility.getWeekDayName(availabilityPeriod.weekday),
      startTime: Utility.getTime(availabilityPeriod.startTimeHour, availabilityPeriod.startTimeMinutes),
      endTime: Utility.getTime(availabilityPeriod.endTimeHour, availabilityPeriod.endTimeMinutes)
    }

    const button = `<button class="btn btn-danger btn-icon" id="btn${period.id}">  <i class="mdi mdi-delete"></i></button>`;

    return ([
      period.weekday,
      period.startTime,
      period.endTime,
      button,
      period.id
    ]);

  }

  addRowEvents() {
    for (const item of this.dataTableRows) {
      this.elementRef.nativeElement.querySelector('#btn' + item[4]).addEventListener('click', () => {
        this.delete(item[4]);
      });
    }
  }

  reloadAfterChange() {
    this.dataTableRows = [];

    const rowCount = this.availabilityPeriodDataTable.activeRows.length - 1;
    var rows: any = [];

    for (let i = 0; i <= rowCount; i++) {
      rows.push(i);
    }

    if (rows.length > 0) {
      this.availabilityPeriodDataTable.rows().remove(rows);
    }

    this.roomAvailabilityPeriodComponent.clearForm();
  }
}
