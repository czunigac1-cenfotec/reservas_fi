import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss']
})
export class ReserveDetailComponent implements OnInit {

  reserveId: string;
  isUpdate: boolean = true; 

  reserve = {
    beginDateTime:'',
    endDateTime:''
  }

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.reserveId = params.reserveId; 
      this.reserve.beginDateTime = params.startStr;
      this.reserve.endDateTime = params.endStr;
    });

    if (this.reserveId === '-1') {
      this.isUpdate = false;
    }else{
      this.getReserveInfo();
    }
  }

  getReserveInfo():void{
    console.log("get info");  
  }
  
}
