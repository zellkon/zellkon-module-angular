import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { A, END, ESCAPE, HOME, NINE, SPACE, Z, ZERO, } from '@angular/cdk/keycodes';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'mat-select-search-advanced',
  template: `
  <div [formGroup]="fg">
<mat-form-field [appearance]="appearance" style="width: 100%;" > 
      <mat-label>
          {{label}}<span *ngIf="required" style="color: red;">*</span>
      </mat-label>
<mat-select formControlName = "selectCtrl" [multiple]="multiple"  #multiSelect  (opened)="onOpened()" (closed)="onClosed()">
       <!-- search -->
       <div class ="mat-search-container" fxLayout = "row" fxLayoutAlign="center center">
           <mat-checkbox *ngIf="(multiple ? showToggleAllCheckbox : false) && !fg?.controls?.inputSearchCtrl?.value" style="margin-left: 16px;" [checked]="isCheckAll" (change)="toggleSelectAll($event)" [matTooltip]="tooltipMessage" [matTooltipPosition]="tooltipPosition" color="primary"></mat-checkbox>
           <input 
           formControlName="inputSearchCtrl" 
           style="margin-left: 10px; margin-top: 2px;" 
           matInput 
           [placeholder]="placeholderSearchLabel"
           (keydown)="_handleKeydown($event)"
           (keyup)="filterObjectsMulti()">
       </div>
       <!--end search -->
  <div style="height: 30px;" *ngIf="(filteredObjectsMulti | async)?.length === 0">
    <div style="margin-left: 40px; margin-top: 10px;">
        {{noEntriesFoundLabel}}
    </div>
</div>
  <mat-option *ngFor="let obj of filteredObjectsMulti | async;" [value]="obj[indexKey]" #matOption (click)="selectOption(matOption)">
        <span *ngFor="let key of viewKey; let i = index;">
            {{obj[key]}}
            <span *ngIf="i >= 0 && i !== viewKey.length - 1"> - </span>
        </span>
        <mat-divider></mat-divider>  
  </mat-option>
    <div *ngIf="!filteredObjectsMulti">{{noEntriesFoundLabel}}</div>
  <mat-select-trigger *ngIf="multiple === true">
      {{ isCheckAll  
        ? selectAllViewLabel : makePreviewTrigger(fg.controls.selectCtrl.value)}}
  </mat-select-trigger>
  </mat-select>
  <mat-error>{{catchErrorMessage('selectCtrl')}}
  </mat-error>
  </mat-form-field>
</div>

  `,
  styles: [`
    .mat-search-container{
    height: 40px; 
    position: -webkit-sticky; 
    position: sticky;
    top: 0; 
    z-index: 100; 
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-size: inherit;
    background-color: rgb(255, 255, 255);
  }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatSelectSearchAdvancedComponent),
      multi: true
    }
  ]
})
export class MatSelectSearchAdvancedComponent<TObject extends object> implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
   // Start define variable for mat-select-search***************************************************************
  /** list of objects */

  @Input()
  objects!: TObject[];
  @Input()
  searchProperties: (keyof TObject)[] = [];
  @Input()
  indexKey!: keyof TObject;
  @Input()
  viewKey!: (keyof TObject)[];
  @Input() tooltipMessage = 'Select all / Deselect all';
  @Input() placeholderSearchLabel = 'Search';
  @Input() noEntriesFoundLabel = 'No results found';
  @Input() label = '';
  @Input() selectAllViewLabel = 'All';
  @Input() showToggleAllCheckbox = true;
  @Input()
  multiple!: boolean;
  disabled!: boolean;
  @Input() messageErrorRequired = `Can't be null`;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() tooltipPosition: 'below' | 'above' | 'left' | 'right' = 'above';
  @Input() required = true;
  /** Form Group */
  fg!: FormGroup;
  /** list of objects filtered by search keyword */
  public filteredObjectsMulti: ReplaySubject<TObject[]> = new ReplaySubject<TObject[]>(1);
  @ViewChild('multiSelect')
  multiSelect!: MatSelect;
  @Output() optionSelected$ = new EventEmitter<any>();
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isCheckAll = false;
  // End define variable for mat-select-search*****************************************************************
  // define customForm
  objectSelected: any;
  onChange!: (objectSelected: any) => void;
  onTouched!: () => void;
    // cva
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.objectSelected = obj;
    }
    this.fg?.controls?.selectCtrl?.patchValue(this.objectSelected);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.disabled){
      this.fg?.controls?.selectCtrl?.disable();
    } else {
      this.fg?.controls?.selectCtrl?.enable();
    }
  }
  //end cva
  constructor(
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef
  ) { 
  }

  ngOnInit(): void {
    console.log(this.isCheckAll);
    this.fg = this.fb.group({
      selectCtrl: [],
      inputSearchCtrl: [''],
    });
    // this.initSelect();
    this.checkSelectCtrl();
    this.checkSelectAll(this.fg.controls.selectCtrl.value, this.objects);
   
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('objects' in changes) {
      const o = changes['objects'].currentValue;
      this.objects = o;
      this.filteredObjectsMulti.next(this.objects.slice());
    }
    if ('required' in changes){
      const required = changes['required'].currentValue;
      if (required){
        this.fg?.controls?.selectCtrl?.setValidators(Validators.required);
      } else {
        this.fg?.controls?.selectCtrl?.removeValidators(Validators.required);
      }
    }
  }

  // Select with search and select all ****************************************************************************

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(event: any): void {
    this.isCheckAll = event.checked;
    this.filteredObjectsMulti.pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(val => {
      let listObjs = val.map(obj => obj[this.indexKey]);
      if (event.checked) {
        this.objectSelected = this.objectSelected.concat(listObjs.filter((x: any) => !this.objectSelected.includes(x)));
        this.updateData(this.objectSelected);
      } else {
        if (this.fg.value.inputSearchCtrl === '') {
          this.objectSelected = [];
          this.updateData(this.objectSelected);
        } else {
          this.objectSelected = this.objectSelected.filter( (x: any) => !listObjs.includes(x))
          .concat(listObjs.filter(x => !this.objectSelected.includes(x)));
          this.updateData(this.objectSelected);
        }  
      }
     
    });
   
  }

  filterObjectsMulti(): void {
    // get the search keyword
    let search = this.fg.controls.inputSearchCtrl.value;
    if (!search) {
      this.filteredObjectsMulti.next(this.objects.slice());
    } else {
      search = search.toLowerCase();
       // filter the objects with code
    }
    this.filteredObjectsMulti.next(
      this.objects.filter(object => {
        let isTrue = false;
        this.searchProperties.forEach(properties => {
          if(Boolean(object[properties]) && String(object[properties]).toLowerCase().indexOf(search) > -1){
            isTrue = true;
          }
        })
        return isTrue;
      })
    );

  }

  clearAllSelected() {
    this.isCheckAll = false;
    this.fg?.controls?.selectCtrl?.patchValue([]);
  }
  updateData(data: any): void {
    this.writeValue(data);
    this.onChange(data);
    this.onTouched();
    this.fg.controls.selectCtrl.patchValue(data);
    this.checkSelectAll(data, this.objects);
  }
  checkSelectCtrl(): void {
    if (this.required){
        this.fg?.controls?.selectCtrl?.setValidators(Validators.required);
      } else {
        this.fg?.controls?.selectCtrl?.removeValidators(Validators.required);
      }
  }
  onOpened(): void {
    this.resetInputSearch();
    this.checkSelectAll(this.fg?.controls?.selectCtrl.value, this.objects);
  }
  onClosed(): void {
   this.resetInputSearch();
   this.checkSelectAll(this.fg?.controls?.selectCtrl.value, this.objects);
  }
  resetInputSearch(): void {
    this.fg.controls?.inputSearchCtrl?.patchValue('');
    this.filteredObjectsMulti.next(this.objects.slice());
  }
  makePreviewTrigger(id: any): any {
    // for show Selected value text
    if (this.multiple) {
      return this.objects.filter((obj) => id?.includes(obj[this.indexKey])).map(val => val[this.viewKey[0]]);
    } else {
      return this.objects[id];
    }
  }

  checkSelectAll(selectedArray: any, initalArray: any): void {
    if (selectedArray && initalArray) {
      if (selectedArray?.length !== initalArray?.length) {
       this.isCheckAll = false;
      }
      else {
        this.isCheckAll = true;
      }
    }
  }

  selectOption(data: any) {
    if (this.multiple) {
      if (data._selected === true) {
        this.objectSelected.push(data.value);
        this.updateData(this.objectSelected);
      } else {
        this.objectSelected.splice(this.objectSelected.findIndex((x: any) => x === data.value), 1);
        this.updateData(this.objectSelected);
      }
      this.optionSelected$.emit({ value: data.value, status: data._selected });
    } else {
      this.optionSelected$.emit({ value: data.value});
      this.updateData(data.value);
    }
  }

  initSelect(): void {
     // listen for search field value changes
     this.fg.controls?.inputSearchCtrl?.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(value => {
       this.filterObjectsMulti();
     });
    // load the initial object list
    this.filteredObjectsMulti.next(this.objects.slice());
  }
  // End Select with search and select all ****************************************************************************

  catchErrorMessage(controlName?: any): string {
    const errors = this.fg?.get(controlName)?.errors;
    if (errors?.required) {
      return this.messageErrorRequired;
    }
    return '';
  }
  _handleKeydown(event: KeyboardEvent) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if ((event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      (event.keyCode === SPACE)
      || ((event.keyCode === HOME || event.keyCode === END))
    ) {
      event.stopPropagation();
    }
    // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
    }
  }
}
