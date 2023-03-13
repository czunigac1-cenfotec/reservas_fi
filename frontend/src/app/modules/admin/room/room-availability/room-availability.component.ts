import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.scss']
})
export class RoomAvailabilityComponent implements OnInit {

  roomId: string;
  roomAvailabilityId: string;
  isUpdate: boolean = true; 

  roomAvailability = {
    roomAvailabilityPeriod:'',
    minReservationTime:0,
    maxReservationTime:0,
    startDate:'',
    endDate:'',
    approvalRequired:false,
    private:false,
    administrator:'',
    creationDate:'',
    roomUuid:"00000000-0000-0000-0000-0000000000"
  }

  constructor( private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.activeRoute.params.subscribe((params: Params) => this.roomAvailabilityId = params.roomAvailabilityId );

      if (this.roomAvailabilityId === '-1') {
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
   
  }

  save(): void {
  
  }

  update(): void {
    console.log('update');
  }

  navigateToList(): void {
    this.router.navigate(['/admin']);
  }

}
