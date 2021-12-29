import { TestBed } from '@angular/core/testing';

import { MatUploadService } from './mat-upload.service';

describe('MatUploadService', () => {
  let service: MatUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
