import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUploadComponent } from './mat-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FileDragAndDropDirective} from './fileDragAndDrop.directive';
@NgModule({
  declarations: [
    MatUploadComponent,
    FileDragAndDropDirective,
  ],
  imports: [
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    MatUploadComponent,
  ]
})
export class MatUploadModule { }
