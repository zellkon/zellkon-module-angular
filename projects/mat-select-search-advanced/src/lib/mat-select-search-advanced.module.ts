import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectSearchAdvancedComponent } from './mat-select-search-advanced.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    MatSelectSearchAdvancedComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  exports: [
    MatSelectSearchAdvancedComponent
  ]
})
export class MatSelectSearchAdvancedModule { }
