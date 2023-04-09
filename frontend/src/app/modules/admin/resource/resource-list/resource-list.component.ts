import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

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

    resource = {
      code: '100',
      name: 'Cámara',
      description: 'Cámara en HD'
    }

    dataTableRows.push([
      resource.code,
      resource.name,
      resource.description,
      `<a href="/admin/resource-detail/${resource.code}">Ver Detalles</a>`
    ]);

    this.resourcesDataTable.rows().add(dataTableRows);
  }

  new(): void {
    this.router.navigate(['/admin/resource-detail/-1']);
  }
}
