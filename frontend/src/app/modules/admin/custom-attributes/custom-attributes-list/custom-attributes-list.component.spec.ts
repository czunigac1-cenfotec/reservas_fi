import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAttributesListComponent } from './custom-attributes-list.component';

describe('CustomAttributesListComponent', () => {
  let component: CustomAttributesListComponent;
  let fixture: ComponentFixture<CustomAttributesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAttributesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAttributesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
