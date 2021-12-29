import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatUploadComponent } from './mat-upload.component';

describe('MatUploadComponent', () => {
  let component: MatUploadComponent;
  let fixture: ComponentFixture<MatUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
