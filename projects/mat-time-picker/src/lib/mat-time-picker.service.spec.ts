import { TestBed } from '@angular/core/testing';

import { MatTimePickerService } from './mat-time-picker.service';

describe('MatTimePickerService', () => {
  let service: MatTimePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatTimePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
