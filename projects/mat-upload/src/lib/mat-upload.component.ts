import { Component, Input, OnInit } from '@angular/core';
import { MatUploadService } from './mat-upload.service';

@Component({
  selector: 'mat-upload',
  template: `
        <div *ngIf="!uploadList && !dragAndDrop" class="card border-card">
              <div *ngIf="!fileUrl" class="center cursor-pointer" fxLayout="column" fxLayoutAlign="center center" (click)="file.click()">
                  <mat-icon>add</mat-icon>
                  <a class="label">{{label}}</a>
                  <input type="file" name="file" id="file" (change)="onChangeFile($any($event).target.files[0])" #file>
              </div>
              <div *ngIf="fileUrl" class="center cursor-pointer" fxLayout="column" fxLayoutAlign="center center">
                  <a
                  class="btnDelete"
                  (click)="deleteOneFile()"                                         
                   fxLayout="column" fxLayoutAlign="center center">
                  <mat-icon class="deleteIcon">highlight_off</mat-icon>
                  </a>
                  <img class ="centerImg" src="assets/img/test.png">
                  <input type="file" name="file" id="file" (change)="onChangeFile($any($event).target.files[0])" #file>
              </div>            
        </div>
        <!-- Upload with drag and drop -->
        <div *ngIf="dragAndDrop" fxLayout="column" fxLayoutAlign="start start">
          <div fileDragDrop class="card w-full dragAndDrop" (filesChangeEmiter)="onChangeFiles($event)">
                <div class="center cursor-pointer" fxLayout="column" fxLayoutAlign="center center" (click)="files.click()">
                  <div>
                    <mat-icon>drive_folder_upload</mat-icon>
                    <input type="file" name="file" id="file" (change)="onChangeFiles($any($event).target.files)" multiple #files>
                  </div>
                  <a class="label">{{label}}</a>
                  <a class="description">{{description}}</a>
                </div>             
          </div>
          <div *ngIf="listFileUrl.length > 0" class="fileDrop w-full">
              <div *ngFor="let file of listFileUrl; let i = index">
                  <div class="item" fxlayout="row" fxLayoutAlign="space-between center">
                    <div class="left" fxlayout="row" fxLayoutAlign="space-around center">
                      <mat-icon>attachment</mat-icon>
                      <a>{{file}}</a>
                    </div>
                    <mat-icon (click)="deleteFileInList(i)">delete_outline</mat-icon>
                  </div>
              </div>
          </div>
        </div>

        <!-- Upload with multiple -->
        <div *ngIf="uploadList" class="w-full" fxLayout="row warp" fxLayoutGap="5px">
          <ng-container *ngFor="let item of listFileUrl; let i = index">
          <div class="card border-card">
              <a
                  class="btnDelete"
                  (click)="deleteFileInList(i)"                                         
                   fxLayout="column" fxLayoutAlign="center center">
                  <mat-icon class="deleteIcon">highlight_off</mat-icon>
              </a>
              <div class="center cursor-pointer" 
                                        fxLayout="column" fxLayoutAlign="center center">
                  <img class ="centerImg" src="assets/img/test.png">
              </div>                
          </div>
          </ng-container>
          <div class="card border-card">
              <div class="center cursor-pointer" fxLayout="column" fxLayoutAlign="center center" (click)="file.click()">
                  <mat-icon>add</mat-icon>
                  <a class="label">{{label}}</a>
                  <input type="file" name="file" id="file" (change)="onChangeFile($any($event).target.files[0])" #file>
              </div>           
          </div>                                                                      
        </div>
  `,
  styles: [`
  .card{
    position: relative !important;
    width: 10rem/* 160px */ !important;
    height: 10rem/* 160px */ !important;
    margin: 0.5rem/* 8px */ !important;
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
    border-radius: 0.5rem/* 16px */ !important;
    --tw-bg-opacity: 1 !important;
    background-color: #F8F9F9 !important;
  }
  .fileDrop{
    margin: 0.5rem;
  }
  .item{
    height: 2rem;
    background-color: rgba(248, 249, 249, 0.5);
    border-radius: 5px;
  }
  .item:hover{
    background-color: rgba(74, 234, 247, 0.2);
  }
  .item .left .mat-icon {
    color: #5DADE2;
  }
  .item .mat-icon {
    color: red;
  }
  .border-card {
    border: dashed 0.1px #D0D3D4;
  }
  .border-card:hover {
    border: dashed 0.1px #48EAF7;
  }
  .w-full {
    width: 100% !important;
  }
  .btnDelete{
    position: absolute !important;
    z-index: 20 !important;
    top: 0.375rem !important;
    right: 0.375rem !important;
    width: 1.5rem !important;
    height: 1.5rem/* 32px */ !important;
    min-height: 1.5rem/* 32px */ !important;
  }
  .btnDelete:hover{
    /* border: solid 0.1px white; */
    border-radius: 15px;
    background-color: rgba(248, 249, 249, 0.7);
  }
 .deleteIcon {
    width: 1rem/* 20px */ !important;
    height: 1rem/* 20px */ !important;
    min-width: 1rem/* 20px */ !important;
    min-height: 1rem/* 20px */ !important;
    font-size: 1rem/* 20px */ !important;
    line-height: 1rem/* 20px */ !important;
    color: rgb(231, 76, 60);
  }
  .center{
    top: 0px !important;
    right: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    position: absolute !important;
    padding: 0.5rem/* 8px */ !important;
    display: flex !important;
    flex-direction: column !important;
    z-index: 10;
  }
  .cursor-pointer {
    cursor: pointer !important;
  }
  .centerImg {
    padding: 0.0rem/* 16px */ !important;
  }
  .dragAndDrop:hover {
    background-color: #E5E7E9 !important;
    border: dashed 2px #48EAF7 !important;
  }
  .dragAndDrop .mat-icon {
    width: 50px !important;
    height: 50px !important;
    font-size: 50px;
    color: #3498DB;
  }
  .description {
    color: #A6ACAF;
    margin-top: 0.5rem;
  }
  .label {
    color: black;
    margin-top: 0.5rem;
  }
  input[type="file"]{
  display:none;
  }
  
  `]
})

export class MatUploadComponent<TObject extends object> implements OnInit {
  
  @Input() label = 'Upload';
  @Input() description = '';
  @Input() serverUrl = '';
  @Input() uploadList = false;
  @Input() accessToken = '';
  @Input() location = '';
  responseObject!: TObject;
  @Input()
  keyUrl!: keyof TObject;
  fileUrl = '';
  listFileUrl: any [] = ['1', '2'];
  @Input() dragAndDrop = false;
  dragMouse = false;
  constructor(
    private uploadService: MatUploadService
  ) { }

  ngOnInit(): void {
  }
  deleteFileInList(index: number): void {
    this.listFileUrl.splice(index,1);
  }
  deleteOneFile(): void {
    this.fileUrl = '';
  }
  onChangeFile(file: File): void {
    if (!this.uploadList) {
      this.fileUrl = file.name;
      this.uploadService.uploadFile('http://apicrm.lavida.stg.rnt.vn/file/uploadfileform', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIxNiIsIm5iZiI6MTY0MDc3MDQyOSwiZXhwIjoxNjQzMzYyNDI5LCJpYXQiOjE2NDA3NzA0Mjl9.JfHLleOPIIkLR5Ok3_4a1loYaLLesIdtr2xApNWZ7oE', '', file).subscribe(value => {
        console.log(value);
      });
    } else {
      this.listFileUrl.push(file.name);
    }
    
  }
  onChangeFiles(files: File[]): void {
    for(let file of files) {
      this.listFileUrl.push(file.name);
    }
  }

}
