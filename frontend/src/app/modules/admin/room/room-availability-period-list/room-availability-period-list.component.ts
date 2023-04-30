import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { AvailabilityPeriodService } from 'src/app/core/services/availability-period.service';
import { RoomAvailabilityService } from 'src/app/core/services/room-availability.service';
import { RoomAvailabilityPeriodComponent } from '../room-availability-period/room-availability-period.component';
import { AvailabilityPeriod } from 'src/app/interfaces/availability-period.interface';
import { Utility } from 'src/app/shared/utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-availability-period-list',
  templateUrl: './room-availability-period-list.component.html',
  styleUrls: ['./room-availability-period-list.component.scss']
})
export class RoomAvailabilityPeriodListComponent implements OnInit {


@Input() roomAvailabilityId: any;
@Input() availabilityPeriodId: any;

receivedObject:any;
availabilityPeriodList: Array<AvailabilityPeriod> = [];
tableData: any[] = [];
dataTableRows: any = [];

handleObject(object: object) {
  this.receivedObject = object;
  console.log(JSON.stringify(this.receivedObject));

  this.saveInService(object);

}

  @ViewChild(RoomAvailabilityPeriodComponent) roomAvailabilityPeriodComponent: RoomAvailabilityPeriodComponent

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private service: AvailabilityPeriodService,
              private modalService: NgbModal,
              private elementRef: ElementRef) { }

  availabilityPeriodDataTable: any;

  ngOnInit(): void {
    this.initTable();
    //temporal
    this.roomAvailabilityId = "f344f3a8-e942-4c40-bb66-c2cb408f13f2";
    this.availabilityPeriodId = "254e3d4e-e9b3-4c9c-bd29-9a26fee4f362";
    this.getList();
  }

  initTable(): void{
    this.availabilityPeriodDataTable = new DataTable('#availabilityPeriodDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  saveAvailabilityPeriod(){
    this.roomAvailabilityPeriodComponent.addAvailabilityPeriod(); 
  }

  saveInService(availabilityPeriod: AvailabilityPeriod){
    this.service.create(availabilityPeriod).subscribe({
      next:(data)=>{
        console.log(data);   
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
      } 
    })          
  }

  getList(): void{

  
    this.service.get(this.availabilityPeriodId).subscribe({
      next:(data)=>{

        console.log(data);   

        if(Array.isArray(data)){
          if (data!=undefined) {
            for (const availabilityPeriod of data) {
              this.dataTableRows.push(this.addRow(availabilityPeriod));
            }
          }
        }else{
          this.dataTableRows.push(this.addRow(data));
        }
        this.availabilityPeriodDataTable.rows().add(this.dataTableRows);
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
        this.addRowEvents();
      } 
    })          
  }

  doSomething(){
    console.log("doSomething");
  }

  delete(periodId:string): void {

  console.log("delete "+periodId );
   /* this.service.delete(periodId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.getList();
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
    })*/
  }
  
  addRow(availabilityPeriod: any){

    //weekday
    //horaini
    //horafin

    var period = {
      id:availabilityPeriod.availabilityPeriodUuid,
      weekday: Utility.getWeekDayName(availabilityPeriod.weekday),
      startTime: Utility.getTime(availabilityPeriod.startTimeHour,availabilityPeriod.startTimeMinutes),
      endTime: Utility.getTime(availabilityPeriod.endTimeHour,availabilityPeriod.endTimeMinutes)
    }

    const button = `<button class="btn btn-danger btn-icon" id="btn${period.id}">  <i class="mdi mdi-delete"></i></button>`;

    return ([
      period.weekday,
      period.startTime,
      period.endTime,
      button,
      period.id
    ]);

  }

  addRowEvents(){
    for (const item of this.dataTableRows) {
      this.elementRef.nativeElement.querySelector('#btn' + item[4]).addEventListener('click', () => {
        this.delete(item[4]);
      });
    }
  }
}
