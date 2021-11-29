import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPreviewMediaComponent } from './mat-preview-media.component';

describe('MatPreviewMediaComponent', () => {
  let component: MatPreviewMediaComponent;
  let fixture: ComponentFixture<MatPreviewMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatPreviewMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPreviewMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
