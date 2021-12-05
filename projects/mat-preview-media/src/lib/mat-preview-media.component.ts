import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'mat-preview-media',
  template: `
   <div fxLayout= "column" fxLayoutAlign="space-between center">
    <img *ngIf="!isVideo() && !isPDF() && !isDOCX()" [src]="path">
    <video controls [autoplay]="false" [muted]="true" onloadedmetadata="this.muted = true" loop  *ngIf="isVideo()">
        <source [src]="path"  type='video/mp4'>
    </video>
    
    <!-- <div class="center">
        <iframe *ngIf="isPDF()" [src]="makeTrustURL(path)"></iframe>
        <iframe *ngIf="isDOCX()" [src]="makeTrustURL(convertGoogleViewDoc(path))" frameborder="0"></iframe>
    </div>  -->
</div>
  `,
  styles: [
    `
    img {
    max-width: 100%;
    max-height: 100%;
}
    `
  ]
})
export class MatPreviewMediaComponent implements OnInit {
  showImage = false;
  safeUrl!: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public path?: any
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  isVideo(){
    if (this.path?.includes('.mp4')){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  isPDF(){
    if (this.path?.includes('.pdf')){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  isDOCX(){
    if (this.path?.includes('.docx')){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  makeTrustURL(url: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.safeUrl;
  }
  // tslint:disable-next-line:typedef
  convertGoogleViewDoc(docUrl: string){
    return `https://view.officeapps.live.com/op/view.aspx?src=${docUrl}`;
  } 
}
