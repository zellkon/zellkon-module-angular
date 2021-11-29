import { TestBed } from '@angular/core/testing';

import { MatProgressBarService } from './mat-progress-bar.service';

describe('MatProgressBarService', () => {
  let service: MatProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
