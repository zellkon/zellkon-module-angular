import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUploadComponent } from './mat-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FileDragAndDropDirective} from './fileDragAndDrop.directive';
import { HttpClientModule } from '@angular/common/http';
import {MatPreviewMediaModule} from 'mat-preview-media';
import {MatSnackBarModule} from '@angular/material/snack-bar';
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
    MatPreviewMediaModule,
    MatSnackBarModule
  ],
  exports: [
    MatUploadComponent,
    HttpClientModule
  ]
})
export class MatUploadModule { }
