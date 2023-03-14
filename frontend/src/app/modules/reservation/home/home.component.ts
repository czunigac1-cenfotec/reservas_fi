import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonFormData } from 'src/app/core/components/json-form/json-form.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formData: JsonFormData;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    console.log('here');
    this.http
      .get('/assets/data/poc-form.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });
  }

}
