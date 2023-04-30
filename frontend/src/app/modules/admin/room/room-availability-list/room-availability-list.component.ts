import { AfterViewInit, Component, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import { RoomAvailability } from 'src/app/interfaces/room-availability.interface';
import { RoomAvailabilityComponent } from '../room-availability/room-availability.component';

@Component({
  selector: 'app-room-availability-list',
  templateUrl: './room-availability-list.component.html',
  styleUrls: ['./room-availability-list.component.scss'],
  template: `
  <div class="modal-body">
      <app-room-availability [roomAvailabilityId]="roomAvailabilityId" #roomAvailability></app-room-availability>
  </div>
  `
})
export class RoomAvailabilityListComponent implements OnInit,AfterViewInit {

  @ViewChild(RoomAvailabilityComponent) roomAvailability!: RoomAvailabilityComponent;

  @Input() roomAvailabilityId: string;
  
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private service: RoomAvailabilityService,
              private modalService: NgbModal) { }

  ngAfterViewInit(): void {
    
    console.log(this.roomAvailability);
/*
    console.log(this.roomAvailabilityComponent);
    console.log(this.roomAvailabilityComponent.save());*/
  }

  roomAvailabilityDataTable: any;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => this.roomAvailabilityId = params.roomAvailabilityId );
    this.getList();
  }

  initTable(): void{
    this.roomAvailabilityDataTable = new DataTable('#roomsDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  getList(): void{

    const dataTableRows: any = [];

    var roomAvailability: RoomAvailability;

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

          this.roomAvailabilityDataTable.rows().add(dataTableRows);
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

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  saveRoomAvailability():void{
    this.roomAvailability.save();
  }

}
