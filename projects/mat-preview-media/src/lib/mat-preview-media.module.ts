import { NgModule } from '@angular/core';
import { MatPreviewMediaComponent } from './mat-preview-media.component';
import { MatPreviewMediaService } from './mat-preview-media.service';
import { CommonModule } from '@angular/common';  
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    MatPreviewMediaComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    MatPreviewMediaComponent
  ],
  providers: [
    MatPreviewMediaService
  ]
})
export class MatPreviewMediaModule { }
