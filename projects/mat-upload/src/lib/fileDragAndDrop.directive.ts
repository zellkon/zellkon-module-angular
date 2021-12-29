import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragAndDropDirective {
  //@Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background-color') private background = '#F8F9F9 !important';
  @HostBinding('style.border') private borderStyle = '2px dashed #D0D3D4';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt : DragEvent){
    
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#E5E7E9 !important';
    this.borderStyle = 'dashed 2px #48EAF7';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
   
    this.background = '#F8F9F9';
    this.borderStyle = 'dashed 2px #D0D3D4';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
   
    this.background = '#E5E7E9 !important';
    this.borderStyle = 'dashed 2px black';
    // debugger;
    let files = evt.dataTransfer.files;
    let valid_files : File[] = files;
    this.filesChangeEmiter.emit(valid_files);
  }
}