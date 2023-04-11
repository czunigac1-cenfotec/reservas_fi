import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  resourceId: string;
  isUpdate: boolean = true; 

  resource = {
    resourceUuid: '',
    name: '',
    description: ''
  }

  constructor( private activeRoute: ActivatedRoute,
               private resourceService: ResourceService,
               private router: Router) { }

  ngOnInit(): void {
      this.activeRoute.params.subscribe((params: Params) => this.resourceId = params.resourceId );

      if (this.resourceId === '-1') {
        this.isUpdate = false;
      }else{
        this.getInfo();
      }
  }

  getInfo():void{
    this.resourceService.get(this.resourceId).subscribe({
      next:(data)=>{
        console.log(data);
        this.resource = data;
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
      title: '¿Desea eliminar el recurso?',
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
    this.resourceService.delete(this.resourceId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso eliminado correctamente',
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
    console.log(this.resource);
    this.resourceService.create(this.resource).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          this.navigateToList();
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
      } 
    })
  }

  update(): void {
    console.log('update');

    this.resourceService.update(this.resource, this.resourceId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Recurso actualizado correctamente',
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
      } 
    })
  }

  navigateToList(): void {
    this.router.navigate(['admin/resource-list']);
  }
}
