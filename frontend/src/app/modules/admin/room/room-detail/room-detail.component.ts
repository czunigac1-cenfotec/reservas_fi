import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoomAvailabilityComponent } from '../room-availability/room-availability.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  @ViewChild(RoomAvailabilityComponent) roomAvailabilityComponent: RoomAvailabilityComponent

  roomId: string;
  isUpdate: boolean = true; 
  roomAvailabilityId: string = '-1';

  room = {
    code:'',
    name:'',
    description:'',
    location:'',
    state:0,
    capacity:'',
    creationDate:'',
    roomUuid:"00000000-0000-0000-0000-0000000000",
    roomAvailabilityId: ''
  }

  constructor( private activeRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
      this.activeRoute.params.subscribe((params: Params) => this.roomId = params.roomId );

      if (this.roomId === '-1') {
        this.isUpdate = false;
      }else{
        this.getInfo();
      }
  }

  getInfo():void{
    
  }

  saveOrUpdate():void{
    if(this.isUpdate){
      this.update();
    }else{
      this.save();
    }
  }

  showDeleteConfirmation() : void {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
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
    console.log('delete');
  }

  save(): void {
    console.log('save');
    this.roomAvailabilityComponent.save();
  }

  update(): void {
    console.log('update');
    this.roomAvailabilityComponent.update();
  }

  navigateToList(): void {
    this.router.navigate(['admin/room-list']);
  }
}
