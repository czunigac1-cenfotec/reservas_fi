import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'simple-datatables';
import { ResourceService } from 'src/app/core/services/resource.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: RoomService) { }

  roomsDataTable: any;
  
  ngOnInit(): void {
    this.initTable();
    this.getList();
  }

  initTable(): void{
    this.roomsDataTable = new DataTable('#roomsDataTable', {
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

    var room: any;

    this.service.getAll().subscribe({
      next:(data)=>{

        console.log(data);   

        if (data.length >= 1) {
          for (const room of data) {
            dataTableRows.push([
              room.code,
              room.name,
              room.location,
              String(room.state),
              String(room.capacity),
              `<a href="/admin/room-detail/${room.roomUuid}">Ver Detalles</a>`
            ]);
          }

          this.roomsDataTable.rows().add(dataTableRows);
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

  new(): void{
    this.router.navigate(['/admin/room-detail/-1']);
  }

}
