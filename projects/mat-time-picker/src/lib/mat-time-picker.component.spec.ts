import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimePickerComponent } from './mat-time-picker.component';

describe('MatTimePickerComponent', () => {
  let component: MatTimePickerComponent;
  let fixture: ComponentFixture<MatTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
