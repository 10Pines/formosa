import { TestBed, inject } from '@angular/core/testing';

import { FormService } from 'ngx-formosa/src/module/service/form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
  });

  it('should create service', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));
});
