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
      selectCtrlMultiple: [{value:  '', disabled: false}, [Validators.required]],
      selectCtrlSingle: [{value: '', disabled: false}, [Validators.required]],
      timePicker: [],
      file:[['test']]
    });
    this.selectFormGroup.controls.selectCtrlSingle.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.selectFormGroup.controls.selectCtrlMultiple.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.selectFormGroup.controls.timePicker.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.selectFormGroup.controls.file.valueChanges.subscribe(data => {
      console.log(data);
    });
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
        name: 'Bird',
        age: 23,
        job: 'Sleep',
      },
      {
        id: 4,
        name: 'Fish',
        age: 24,
        job: 'Sleep',
      },
      {
        id: 5,
        name: 'Lion',
        age: 25,
        job: 'Sleep',
      },
      {
        id: 6,
        name: 'Lion',
        age: 25,
        job: 'Sleep',
      },
      {
        id: 7,
        name: 'Lion',
        age: 25,
        job: 'Sleep',
      },
      {
        id: 8,
        name: 'Lion',
        age: 25,
        job: 'Sleep',
      },
      {
        id: 9,
        name: 'Lion',
        age: 25,
        job: 'Sleep',
      },

    ];
    this.objects = this.objects.slice();
  }
  updateInitObject(){
    // this.initDataArray.next([1,2]);
    this.init = 2;
    this.initArray = [1,2,3,4,5,6,7,8,9].slice();
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
