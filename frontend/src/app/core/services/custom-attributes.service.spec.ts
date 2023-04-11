import { TestBed } from '@angular/core/testing';

import { CustomAttributesService } from './custom-attributes.service';

describe('CustomAttributesService', () => {
  let service: CustomAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
