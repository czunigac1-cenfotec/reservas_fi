import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomAttributeComponent } from '../custom-attribute/custom-attribute.component';
import { DataTable } from 'simple-datatables';
import { CustomAttributesService } from 'src/app/core/services/custom-attributes.service';
import Swal from 'sweetalert2';
import { CustomAttribute } from 'src/app/interfaces/custom-attribute.interface';

@Component({
  selector: 'app-custom-attributes-list',
  templateUrl: './custom-attributes-list.component.html',
  styleUrls: ['./custom-attributes-list.component.scss']
})
export class CustomAttributesListComponent implements OnInit {

  @ViewChild(CustomAttributeComponent) customAttributeComponent: CustomAttributeComponent
  @Input() roomAvailabilityId: any;

  dataTableRows: any = [];
  dataTable: any;

  /**
  * ChildView callback
  *
  * @param {object} customAttribute - AvailabilityPeriod Object
  */
  saveCustomAttribute(customAttribute: object): void {
      console.log("customAttributeEmitter");
      if(customAttribute!=null){
        console.log(JSON.stringify(customAttribute));
        this.save(customAttribute);
      }   
  }
  
  constructor(private elementRef: ElementRef,
              private service: CustomAttributesService) { 
              }
  
  ngOnInit(): void {
    console.log(this.roomAvailabilityId);
    this.initTable();
    this.getList();
  }

  initTable(): void {
    this.dataTable = new DataTable('#customAttributeDataTable', {
      labels: {
        placeholder: 'Buscar...',
        perPage: '{select} registros por página',
        noRows: 'No se encontraron registros',
        info: 'Mostrando {start} a {end} de {rows} registros'
      }
    });
  }

  getList(): void {

    this.clearDataTable();
    
    this.service.getAll().subscribe({
      next: (data) => {
        console.log(data);
        if (data != null) {
          if (data.length >= 1) {
            for (const attribute of data) {
              this.dataTableRows.push(
                this.getRow(attribute)
              );
            }
  
            this.dataTable.rows().add(this.dataTableRows);
          }
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.addRowEvents();
      }
    })
  }

  get(attributeId: string): void {

    this.service.get(attributeId).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
      }
    })
  }

  getRow(attribute: any) {

    const button = `<button class="btn btn-danger btn-icon" id="btn${attribute.customAttributeUuid}">  <i class="mdi mdi-delete"></i></button>`;

    return ([
      attribute.title,
      attribute.description,
      button,
      attribute.customAttributeUuid
    ]);

  }

  saveAttribute() {
    this.customAttributeComponent.addCustomAttribute();
  }

  delete(attributeId: string): void {
    console.log("delete " + attributeId);
    this.service.delete(attributeId).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Atributo eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          console.log(result);
        })
      },
      error: (e) => {
        console.log(e);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Code:' + e.status + '| Detail:' + e.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => {
        console.log("done");
        this.getList();
      }
    })
  }

  save(customAttribute:CustomAttribute): void {
    console.log('save');

    const newAttribute = { ...customAttribute };
    delete newAttribute.customAttributeUuid;
    newAttribute.roomAvailabilityUuid = this.roomAvailabilityId;
    console.log(newAttribute);

    this.service.create(newAttribute).subscribe({
      next:(result)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Atributo registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          console.log(result);
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
        this.getList();
      } 
    })
  }

  addRowEvents() {
    for (const item of this.dataTableRows) {
      this.elementRef.nativeElement.querySelector('#btn' + item[3]).addEventListener('click', () => {
        this.delete(item[3]);
      });
    }
  }

  clearDataTable() {
    this.dataTableRows = [];

    const rowCount = this.dataTable.activeRows.length - 1;
    var rows: any = [];

    for (let i = 0; i <= rowCount; i++) {
      rows.push(i);
    }

    if (rows.length > 0) {
      this.dataTable.rows().remove(rows);
    }
    
  }
}
