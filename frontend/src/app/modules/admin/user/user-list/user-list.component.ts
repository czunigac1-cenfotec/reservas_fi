import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }


  usersDataTable: any;

  ngOnInit(): void {
    this.initTable();
    this.getList();
  }

  initTable(): void{
    this.usersDataTable = new DataTable('#usersDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  getList(): void{

    const dataTableRows: any = [];

    this.userService.getAll().subscribe({
      next:(data)=>{

        console.log(data);   

        if (data.length > 0) {
          for (const user of data) {
            dataTableRows.push([
              user.identificacion,
              user.nombre + " " + user.primerApellido + " " + user.segundoApellido,
              user.unidadAcademica,
              String(user.telefono),
              `<a href="/admin/user-detail/${user.userInfoUuid}">Ver Detalles</a>`
            ]);
          }

          this.usersDataTable.rows().add(dataTableRows);
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

  new(): void{
    this.router.navigate(['/admin/user-detail/-1']);
  }
}
