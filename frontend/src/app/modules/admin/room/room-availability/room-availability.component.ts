import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import { RoomAvailability } from 'src/app/interfaces/room-availability.interface';
import { Utility } from 'src/app/shared/utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.scss']
})
export class RoomAvailabilityComponent implements OnInit {
  
  @Output() roomAvailabilityEmitter = new EventEmitter<any>();
  @Input() roomAvailabilityId: string;
  @Input() roomId: string;

  isUpdate: boolean = true; 
  availabilityPeriodDisabled = true;
  customAttributesDisabled = true;

  roomAvailability: RoomAvailability ={
    roomAvailabilityUuid: '',
    administratorUuid: '',
    roomUuid: '',
    minReservationTime: 0,
    maxReservationTime: 0,
    approvalRequired: false,
    startDateTime: { hour: 7, minute: 0, second: 0 },
    endDateTime: { hour: 20, minute: 0, second: 0 },
    privateReservationEnabled: false,
    availabilityPeriods: []
  }

  constructor( private service: RoomAvailabilityService) { }
    
  ngOnInit(): void {
    this.loadData();   
  }

  loadData(){
    if (this.roomAvailabilityId === '-1') {
      this.isUpdate = false;
    }else{
      this.getInfo();
    }
  }

  getInfo():void{
    this.service.get(this.roomAvailabilityId).subscribe({
      next:(data)=>{
        console.log(data);

        var startDateTime = Utility.getComponentFormattedTime(data.startDateTime);
        var endDateTime = Utility.getComponentFormattedTime(data.endDateTime);

        this.roomAvailability = data;
        this.roomAvailability.startDateTime = { hour: startDateTime.hour, minute: startDateTime.minute, second: 0 };
        this.roomAvailability.endDateTime = { hour: endDateTime.hour, minute: endDateTime.minute, second: 0 };

      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })
  }

  saveOrUpdate(roomUuid:string, roomAvailabilityId:string):void{

    if(roomAvailabilityId!='-1'){
      this.roomId = roomUuid;
      this.roomAvailabilityId = roomAvailabilityId;
      this.isUpdate = true;
    }else{
      this.isUpdate = false;
    }

    if(this.isUpdate){
      this.update();
    }else{
      this.save();
    }
  }

  delete(): void {
    this.service.delete(this.roomAvailabilityId).subscribe({
      next:(result)=>{
        console.log(result);
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
    console.log('Inner method called [save]');

    if(this.validateTimeRange()){
      const newRoomAvailability = { ...this.roomAvailability };
      delete newRoomAvailability.roomAvailabilityUuid;
      
      newRoomAvailability.roomUuid = this.roomId;
      newRoomAvailability.startDateTime = Utility.getCurrentDateTime(this.roomAvailability.startDateTime.hour,this.roomAvailability.startDateTime.minute);
      newRoomAvailability.endDateTime = Utility.getCurrentDateTime(this.roomAvailability.endDateTime.hour,this.roomAvailability.endDateTime.minute);
      //TODO:Get admin UUID from user security
      newRoomAvailability.administratorUuid = "9cff8d97-1a50-49fe-b173-93797d29c03b";

      this.service.create(newRoomAvailability).subscribe({
        next:(data: any)=>{
          this.roomAvailabilityId = data.roomAvailability.roomAvailabilityUuid; 
          this.roomAvailabilityEmitter.emit(data);
        },
        error:(e)=>{
          console.log(e);
        },
        complete:()=>{
          console.log("done");
          this.availabilityPeriodDisabled = false;
          this.customAttributesDisabled = false;
        } 
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Validar rangos de horario de disponibilidad',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  update(): void {
    console.log('Inner method called [update]');


    if(this.validateTimeRange()){

      const newRoomAvailability = { ...this.roomAvailability };
      
      newRoomAvailability.startDateTime = Utility.getCurrentDateTime(this.roomAvailability.startDateTime.hour,this.roomAvailability.startDateTime.minute);
      newRoomAvailability.endDateTime = Utility.getCurrentDateTime(this.roomAvailability.endDateTime.hour,this.roomAvailability.endDateTime.minute);

      this.service.update(newRoomAvailability,this.roomAvailabilityId).subscribe({
        next:(data: any)=>{
          console.log(data);
        },
        error:(e)=>{
          console.log(e);
        },
        complete:()=>{
          console.log("done");
        } 
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Validar rangos de horario de disponibilidad',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  validateTimeRange(): boolean{
    var isValid = true;

    var beginDateTime = new Date().setHours(this.roomAvailability.startDateTime.hour, this.roomAvailability.startDateTime.minute);
    var endDateTime = new Date().setHours(this.roomAvailability.endDateTime.hour, this.roomAvailability.endDateTime.minute);

    if (beginDateTime >= endDateTime) {
      isValid = false;
    }
    return isValid;
  }
}
