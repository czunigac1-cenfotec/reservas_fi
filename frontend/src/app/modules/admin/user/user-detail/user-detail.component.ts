import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { email } from 'ngx-custom-validators/src/app/email/validator';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/enum/roles.enum';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {

  userInfoId: string;
  isUpdate: boolean = true; 

  public emailPattern = {'':{ pattern: new RegExp('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/')}};

  user: User = {
    userInfoUuid:'',
    nombre:'',
    primerApellido:'',
    segundoApellido:'',
    identificacion: '',
    unidadAcademica: '',
    telefono:'',
    email : ''
  };

  unidadAcademicaOptions = [
    { label: 'Profesor', value: Roles.PROFESOR.toString() },
    { label: 'Registro', value: Roles.REGISTRO.toString() },
    { label: 'Administrador', value: Roles.ADMINISTRADOR.toString() }
  ];

  constructor( private activeRoute: ActivatedRoute,
               private userService: UserService,
               private router: Router) { }

  ngOnInit(): void {
      this.activeRoute.params.subscribe((params: Params) => this.userInfoId = params.userInfoId );

      if (this.userInfoId === '-1') {
        this.isUpdate = false;
      }else{
        this.getInfo();
      }
  }

  getInfo():void{
    this.userService.get(this.userInfoId).subscribe({
      next:(data)=>{
        console.log(data);
        this.user = data;
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
    this.userService.delete(this.userInfoId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado correctamente',
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

    const newUser = { ...this.user };
    delete newUser.userInfoUuid;

    console.log(newUser);
    this.userService.create(newUser).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado correctamente',
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

    this.userService.update(this.user, this.userInfoId).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado correctamente',
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
    this.router.navigate(['/admin']);
  }
}
