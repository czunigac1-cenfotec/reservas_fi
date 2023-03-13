import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  roomId: string;
  isUpdate: boolean = true; 

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
