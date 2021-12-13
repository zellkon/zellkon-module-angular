import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-mat-time-picker',
  template: `
   <mat-select [(ngModel)]="time" placeholder="">
       <mat-option [value]=""></mat-option>
   </mat-select>>
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
   time: any;
   onChange!: (time: any) => void;
   onTouched!: () => void;
  constructor() { }

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
  }

}
