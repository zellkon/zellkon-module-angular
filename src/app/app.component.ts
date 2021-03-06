import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import {MatPreviewMediaService} from '../../projects/mat-preview-media/src/public-api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ZELLKON MODULE ANGULAR';
  observableArray: Subject<any[]> = new ReplaySubject<any[]>(1);
  objects: any = [];
  i = 1;
  initDataArray: Subject<any> = new ReplaySubject<any>(1);
  initData: Subject<any> = new ReplaySubject<any>(1);
  init = 1;
  initArray = [1,2];
  isRequired = true;
  disabled = false;
  selectFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private previewService: MatPreviewMediaService,
  ){

  }
  ngOnInit(): void {
    this.selectFormGroup = this.fb.group({
      selectCtrlMultiple: [{value:  [1,2], disabled: false}, [Validators.required]],
      selectCtrlSingle: [{value: 1, disabled: false}, [Validators.required]],
      timePicker: [],
      file:[{value:['1'], disabled: false}]
    });
    this.selectFormGroup.controls.selectCtrlSingle.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.selectFormGroup.controls.selectCtrlMultiple.valueChanges.subscribe(data => {
      console.log('value selected: ' + data);
    });
    this.selectFormGroup.controls.timePicker.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.selectFormGroup.controls.file.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.updateObject();
  }
 
  getListSelected(result: any){
    // console.log(result);
  }
  optionSelected(data: any){
    console.log(data);
  }
  updateObject(){
    this.objects = [
      {
        id: 1,
        name: 'Cat',
        age: 21,
        job: 'Sleep',
      },
      {
        id: 2,
        name: 'Dog',
        age: 22,
        job: 'Sleep',
      },
      {
        id: 3,
        name: 'Fish',
        age: 22,
        job: 'Wake',
      },

    ];
    this.objects = this.objects.slice();
  }
  updateInitObject(){
    // this.initDataArray.next([1,2]);
    this.init = 2;
    this.selectFormGroup.controls.selectCtrlMultiple.patchValue([1,2,3]);
  }

  getValidateMessage(controlName: string): string {
    const error = this.selectFormGroup.get(controlName)?.errors;
    if (error?.required){
      return 'Must select';
    }
    return '';
  }
  preview(url: string): void {
    this.previewService.openPreviewMedia(url);
  }
  getDelete(event: any) {
    console.log(event);
  }
}
