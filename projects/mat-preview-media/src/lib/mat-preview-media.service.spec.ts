import { TestBed } from '@angular/core/testing';

import { MatPreviewMediaService } from './mat-preview-media.service';

describe('MatPreviewMediaService', () => {
  let service: MatPreviewMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPreviewMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
