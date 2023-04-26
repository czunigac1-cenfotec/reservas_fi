import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { AvailabilityPeriodService } from 'src/app/core/services/availability-period.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import { RoomAvailabilityPeriodComponent } from '../room-availability-period/room-availability-period.component';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';

@Component({
  selector: 'app-room-availability-period-list',
  templateUrl: './room-availability-period-list.component.html',
  styleUrls: ['./room-availability-period-list.component.scss']
})
export class RoomAvailabilityPeriodListComponent implements OnInit {

receivedObject:any;
availabilityPeriodList: Array<AvailabilityPeriod> = [];

handleObject(object: object) {
  debugger;
  this.receivedObject = object;
  console.log(JSON.stringify(this.receivedObject));

  this.availabilityPeriodList.push(object);

}

  @ViewChild(RoomAvailabilityPeriodComponent) roomAvailabilityPeriodComponent: RoomAvailabilityPeriodComponent

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private service: AvailabilityPeriodService,
              private modalService: NgbModal) { }

  availabilityPeriodDataTable: any;

  ngOnInit(): void {

  }

  initTable(): void{
    this.availabilityPeriodDataTable = new DataTable('#roomsDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  saveAvailabilityPeriod(){
    this.roomAvailabilityPeriodComponent.addAvailabilityPeriod(); 
  }

  saveInService(availabilityPeriod: AvailabilityPeriod){
    this.service.create(availabilityPeriod).subscribe({
      next:(data)=>{
        console.log(data);   
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })          
  }

  getList(): void{

    const dataTableRows: any = [];

    var availabilityPeriod;
    this.service.getAll().subscribe({
      next:(data)=>{

        console.log(data);   

        if (data.length >0) {
          for (const room of data) {
            dataTableRows.push([
              room.code,
              room.name,
              room.location,
              String(room.inactive),
              String(room.capacity),
              `<a href="/admin/room-detail/${room.roomUuid}">Ver Detalles</a>`
            ]);
          }

          this.availabilityPeriodDataTable.rows().add(dataTableRows);
        } 
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })          
  }
}
