import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'simple-datatables';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ResourceService) { }

  resourcesDataTable: any;

  ngOnInit(): void {
    this.initTable();
    this.getList();
  }

  initTable(): void {
    this.resourcesDataTable = new DataTable('#resourcesDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  getList(): void {

    const dataTableRows: any = [];

    var resource: any;

    this.service.getAll().subscribe({
      next:(data)=>{

        console.log(data);   

        if (data.length >= 1) {
          for (const resource of data) {
            dataTableRows.push([
              resource.name,
              resource.description,
              `<a href="/admin/resource-detail/${resource.resourceUuid}">Ver Detalles</a>`
            ]);
          }

          this.resourcesDataTable.rows().add(dataTableRows);
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

  new(): void {
    this.router.navigate(['/admin/resource-detail/-1']);
  }
}
