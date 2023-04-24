import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { AvailabilityPeriodService } from 'src/app/core/services/availability-period.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';

@Component({
  selector: 'app-room-availability-period-list',
  templateUrl: './room-availability-period-list.component.html',
  styleUrls: ['./room-availability-period-list.component.scss']
})
export class RoomAvailabilityPeriodListComponent implements OnInit {

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
