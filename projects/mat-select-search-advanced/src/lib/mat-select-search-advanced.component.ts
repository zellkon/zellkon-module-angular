import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
<mat-select formControlName = "selectCtrl" [multiple]="multiple"  #multiSelect (opened)="onOpened()" (closed)="onClosed()">
       <!-- search -->
       <div class ="mat-search-container" fxLayout = "row" fxLayoutAlign="center center">
           <mat-checkbox *ngIf="multiple ? showToggleAllCheckbox : false" style="margin-left: 16px;" [checked]="isCheckAll" (change)="toggleSelectAll($event)" [matTooltip]="tooltipMessage" [matTooltipPosition]="tooltipPosition" color="primary"></mat-checkbox>
           <input 
           formControlName="inputSearchCtrl" 
           style="margin-left: 10px; margin-top: 2px;" 
           matInput 
           [placeholder]="placeholderSearchLabel"
           (keydown)="_handleKeydown($event)">
       </div>
       <!--end search -->
  <div style="height: 30px;" *ngIf="(filteredObjectsMulti | async)?.length === 0">
    <div style="margin-left: 40px; margin-top: 10px;">
        {{noEntriesFoundLabel}}
    </div>
</div>
  <mat-option *ngFor="let obj of filteredObjectsMulti | async;" [value]="obj[indexKey]" (change)="selectOption($event)">
        <span *ngFor="let key of viewKey; let i = index;">
            {{obj[key]}}
            <span *ngIf="i >= 0 && i !== viewKey.length - 1"> - </span>
        </span>
        <mat-divider></mat-divider>  
  </mat-option>
    <div *ngIf="!filteredObjectsMulti">{{noEntriesFoundLabel}}</div>
  <mat-select-trigger *ngIf="multiple === true">
      {{ isCheckAll ? selectAllViewLabel : makePreviewTrigger(fg.controls.selectCtrl.value)}}
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
  initData!: any;
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
  // selectFormControl!: FormControl;
  // inputSearchCtrl: FormControl = new FormControl();
  /** list of objects filtered by search keyword */
  public filteredObjectsMulti: ReplaySubject<TObject[]> = new ReplaySubject<TObject[]>(1);
  @ViewChild('multiSelect', { static: true })
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

  constructor(
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      selectCtrl: [this.initData ? this.initData : ''],
      inputSearchCtrl: [],
    });
    // console.log(this.objectSelected);
    this.initSelect();
    this.checkSelectCtrl();
  }
  // custom form
  writeValue(obj: any): void {
    this.objectSelected = obj;
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
  //end custom form

  ngOnChanges(changes: SimpleChanges): void {
    if ('objects' in changes) {
      const objects = changes['objects'].currentValue;
      this.objects = objects;
      this.filteredObjectsMulti.next(this.objects.slice());
    }
    if ('initData' in changes){
      const newInitData = changes['initData'].currentValue;
      this.initData = newInitData;
      this.fg?.controls?.selectCtrl?.patchValue(this.initData);
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
        if (this.showToggleAllCheckbox && event.checked) {
          this.fg.controls?.selectCtrl?.patchValue(listObjs);
        } else {
          this.fg.controls?.selectCtrl?.patchValue([]);
        }
      });
  }

  protected filterObjectsMulti(): void {
    // get the search keyword
    let search = this.fg.controls.inputSearchCtrl.value;
    if (!search) {
      this.filteredObjectsMulti.next(this.objects.slice());
    } else {
      search = search.toLowerCase();
       // filter the objects with code
    }
    this.filteredObjectsMulti.next(
      this.objects.filter(object => String(object[this.searchProperties[0]]).toLowerCase().indexOf(search) > -1
        || String(object[this.searchProperties[1]]).toLowerCase().indexOf(search) > -1
        || String(object[this.searchProperties[2]]).toLowerCase().indexOf(search) > -1
        || String(object[this.searchProperties[3]]).toLowerCase().indexOf(search) > -1
        || String(object[this.searchProperties[4]]).toLowerCase().indexOf(search) > -1
      )
    );

  }

  clearAllSelected() {
    this.isCheckAll = false;
    this.fg?.controls?.selectCtrl?.patchValue([]);
  }
  checkSelectCtrl(): void {
    this.fg?.controls?.selectCtrl?.valueChanges.subscribe(value => {
      this.writeValue(value);
      this.onChange(value);
      this.onTouched();
     
      if (this.fg.controls.inputSearchCtrl.value){
        this.filteredObjectsMulti.subscribe(filters => {
          // console.log(filters);
          if (filters.length > 0) {
            this.compareSelectedAndInitial(value, filters);
          }
        });
      } else {
        this.compareSelectedAndInitial(value, this.objects);
      }
    });
    if (this.required){
        this.fg?.controls?.selectCtrl?.setValidators(Validators.required);
      } else {
        this.fg?.controls?.selectCtrl?.removeValidators(Validators.required);
      }
  }
  onOpened(): void {
    this.resetInputSearch();
    this.compareSelectedAndInitial(this.fg?.controls?.selectCtrl.value, this.objects);
  }
  onClosed(): void {
   this.resetInputSearch();
   this.compareSelectedAndInitial(this.fg?.controls?.selectCtrl.value, this.objects);
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

  compareSelectedAndInitial(selectedArray: any, initalArray: any): void {
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
    this.optionSelected$.emit({ value: data });
  }

  initSelect(): void {
     // listen for search field value changes
     this.fg.controls?.inputSearchCtrl?.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(value => {
       // console.log(value);
       if (value) {
         this.clearAllSelected();
       }
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
