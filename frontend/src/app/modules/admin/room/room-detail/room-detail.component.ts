import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoomAvailabilityComponent } from '../room-availability/room-availability.component';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/interfaces/room.interface';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  /**
  * ChildView callback
  *
  * @param {object} roomAvailability - roomAvailability Object
  */
 
  saveRoomAvailability(roomAvailability: any): void {
    if(roomAvailability!=null){
      console.log(JSON.stringify(roomAvailability));
      var item = roomAvailability.roomAvailability;
      this.roomAvailabilityId = item.roomAvailabilityUuid == undefined ? "" : item.roomAvailabilityUuid;
      this.room.roomAvailabilityUuid = this.roomAvailabilityId;
      //this.update();
    }
  }

  @ViewChild(RoomAvailabilityComponent) roomAvailabilityComponent: RoomAvailabilityComponent

  roomId: string;
  isUpdate: boolean = true; 
  roomAvailabilityId: string = '-1';

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

  constructor( private activeRoute: ActivatedRoute,
               private roomService: RoomService,
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
    this.roomService.get(this.roomId).subscribe({
      next:(data)=>{
        console.log(data);
        this.room = data;
        this.roomId = data.roomUuid;
  
        this.roomAvailabilityId = data.roomAvailabilityUuid == null ? "-1" : data.roomAvailabilityUuid;
      
        if(this.roomAvailabilityId != "-1")
        {
          this.roomAvailabilityComponent.roomAvailabilityId = this.roomAvailabilityId;
          this.roomAvailabilityComponent.loadData();
          this.roomAvailabilityComponent.availabilityPeriodDisabled = false;
          this.roomAvailabilityComponent.customAttributesDisabled = false;
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

  saveOrUpdate():void{
    if(this.isUpdate){
      this.update();
    }else{
      this.save();
    }
  }

  showDeleteConfirmation() : void {
    Swal.fire({
      title: '¿Desea eliminar la sala?',
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
    this.roomService.delete(this.roomId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sala eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToList();
        })
      },
      error:(e)=>{
        console.log(e);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Code:' + e.status + '| Detail:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  save(): void {
    console.log('save');

    const newRoom = { ...this.room };
    delete newRoom.roomUuid;
    console.log(newRoom);

    this.roomService.create(newRoom).subscribe({
      next:(result)=>{
        
        this.roomId = result.roomUuid;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sala registrada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          console.log(result);
        })
      },
      error:(e)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Se ha producido un error: ' + e.status + '\n| Detalles:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
        this.roomAvailabilityComponent.saveOrUpdate(this.roomId,this.roomAvailabilityId);
        this.getInfo();
      } 
    })
  }

  update(): void {
    this.roomService.update(this.room, this.roomId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sala actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error:(e)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error:' + e.status + '| Detalle:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete:()=>{
        console.log("done");
        this.roomAvailabilityComponent.saveOrUpdate(this.roomId,this.roomAvailabilityId);
      } 
    })
  }

  updateRoomAvailabilityId(roomAvailabilityId:string): void {

    const newRoom = { ...this.room };
    newRoom.roomAvailabilityUuid = roomAvailabilityId;
    console.log(newRoom);

    this.roomService.update(newRoom, this.roomId).subscribe({
      next:(result)=>{
        console.log(result);
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  navigateToList(): void {
    this.router.navigate(['admin/room-list']);
  }
}
