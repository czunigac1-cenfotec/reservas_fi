import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomAttributesService } from 'src/app/core/services/custom-attributes.service';
import { CustomAttribute } from 'src/app/interfaces/custom-attribute.interface';

@Component({
  selector: 'app-custom-attribute',
  templateUrl: './custom-attribute.component.html',
  styleUrls: ['./custom-attribute.component.scss']
})
export class CustomAttributeComponent implements OnInit {

  @Output() customAttributeEmitter = new EventEmitter<any>();
  @Input() roomAvailabilityId: any;

  customAttribute: CustomAttribute = {
    customAttributeUuid: "",
    roomAvailabilityUuid: "",
    title: "",
    description: ""
  }

  constructor(private activeRoute: ActivatedRoute,
              private service: CustomAttributesService,
              private router: Router) { }

  ngOnInit(): void { }

  addCustomAttribute() {
    console.log('save');
    this.customAttributeEmitter.emit(this.customAttribute);
  }

}
