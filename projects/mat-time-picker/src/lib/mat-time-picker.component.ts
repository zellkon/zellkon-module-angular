import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'mat-time-picker',
  template: `
  <div style="width: 100%" fxLayout="row" fxLayoutAlign="space-evenly center" [formGroup]="timeForm">
  <mat-form-field style="width: 45%;" [appearance]="appearance">
    <mat-select formControlName="hour">
        <mat-option *ngFor="let h of hours" [value]="h">{{h}}</mat-option>
    </mat-select>
  </mat-form-field>
  <div style="font-weight: bold; margin-bottom: 10px;">:</div>
  <mat-form-field style="width: 45%;" [appearance]="appearance">
    <mat-select formControlName="minute">
      <mat-option *ngFor="let m of minutes" [value]="m">{{m}}</mat-option>
    </mat-select>
  </mat-form-field>
  </div>
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatTimePickerComponent),
      multi: true
    }
  ]
})
export class MatTimePickerComponent implements OnInit, ControlValueAccessor {
  // define customForm
  time: any = '00:00';
  onChange!: (time: any) => void;
  onTouched!: () => void;
  @Input() disabled = false;
  timeForm!: FormGroup;
  @Input() initTime: string = '00:00';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  minutes = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30',
  '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'];
  constructor(
    private fb: FormBuilder
  ) { 
  }

  writeValue(obj: any): void {
    this.time = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      hour: [{value: this.initTime.substring(0,2) || '00', disabled: this.disabled}],
      minute: [{value: this.initTime.substring(3,5) || '00', disabled: this.disabled}]
    });
    this.handleTimeChange();
  }
  handleTimeChange(): void {
    this.timeForm.controls.hour.valueChanges.subscribe(h => {
      this.writeValue(h+':'+this.timeForm.controls.minute.value);
      this.onChange(h+':'+this.timeForm.controls.minute.value);
    });
    this.timeForm.controls.minute.valueChanges.subscribe(m => {
      this.writeValue(this.timeForm.controls.hour.value+':'+m);
      this.onChange(this.timeForm.controls.hour.value+':'+m);
    });
    
  }

}
