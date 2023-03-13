import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

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

    room = {
      code:'100',
      name:'Auditorio #1',
      description:'Auditorio de Ingeniería',
      location:'Edificio A, Piso 2',
      state:1,
      capacity:'150',
      creationDate:'',
      roomUuid:"10000000-0000-0000-0000-0000000000"
    }

    dataTableRows.push([
      room.code,
      room.name,
      room.location,
      room.state,
      room.capacity,
      `<a href="/admin/room-detail/${room.roomUuid}">Ver Detalles</a>`
    ]);


    room = {
      code:'101',
      name:'Biblioteca',
      description:'Biblioteca de Ingeniería',
      location:'Edificio C, Piso 1',
      state:1,
      capacity:'110',
      creationDate:'',
      roomUuid:"12000000-0000-0000-0000-0000000000"
    }

    dataTableRows.push([
      room.code,
      room.name,
      room.location,
      room.state,
      room.capacity,
      `<a href="/admin/room-detail/${room.roomUuid}">Ver Detalles</a>`
    ]);

    this.roomsDataTable.rows().add(dataTableRows);
  }

  new(): void{
    this.router.navigate(['/admin/room-detail/-1']);
  }

}
