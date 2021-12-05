import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPreviewMediaComponent } from './mat-preview-media.component';
@Injectable({
  providedIn: 'root'
})
export class MatPreviewMediaService {

  constructor(
    private dialog: MatDialog,
  ) { }
  openPreviewMedia(path: string){
    if (path){
      if (this.checkFileType(path) === 0) {
        this.dialog.open(MatPreviewMediaComponent, {
          data: path,
          maxWidth: ((window.innerWidth) * 80) / 100,
          maxHeight: ((window.innerHeight) * 80) / 100,
        }).afterClosed().subscribe(value => {
        });
      } else if (this.checkFileType(path) === 2){
        window.open(path);
      }
      else {
        window.open(`https://view.officeapps.live.com/op/view.aspx?src=${path}`);
      }
    }
  }
  private checkFileType(url: string) {
    if (url.includes('.docx')) {
      return 1;
    }
    else if (url.includes('.pdf')) {
      return 2;
    }
    else {
      return 0;
    }
  }
}
