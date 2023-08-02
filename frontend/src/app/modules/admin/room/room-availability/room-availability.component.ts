import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  
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

  constructor( private service: RoomAvailabilityService,
               public formatter: NgbDateParserFormatter,
               private calendar: NgbCalendar) { }
    
  ngOnInit(): void {
    this.loadData();   
    this.roomAvailability.startDateTime = this.formatter.format(this.calendar.getToday());
    this.roomAvailability.endDateTime = this.formatter.format(this.calendar.getNext(this.calendar.getToday(), 'd', 1));
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
      newRoomAvailability.startDateTime = Utility.getStringFormattedDate(this.roomAvailability.startDateTime);
      newRoomAvailability.endDateTime = Utility.getStringFormattedDate(this.roomAvailability.endDateTime);
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
      
      newRoomAvailability.startDateTime = Utility.getStringFormattedDate(this.roomAvailability.startDateTime);
      newRoomAvailability.endDateTime = Utility.getStringFormattedDate(this.roomAvailability.endDateTime);

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
    var beginDateTime = new Date(this.roomAvailability.startDateTime);
    var endDateTime = new Date(this.roomAvailability.endDateTime);

    if (beginDateTime >= endDateTime) {
      isValid = false;
    }
    return isValid;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.roomAvailability.startDateTime = Utility.getDate(date.year,date.month,date.day);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.roomAvailability.endDateTime = Utility.getDate(date.year,date.month,date.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
