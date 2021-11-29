<h1 align="center">MAT SELECT SEARCH ADVANCE</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >
</p>

_This project made by  **[ZELLKON](https://zellkon.com)**._

---

# [Github](https://github.com/zellkon/mat-select-search-advanced)

<p align="center">
<img src="https://media.giphy.com/media/OgaVPvsW91Z2nR1lTX/giphy.gif">
</p>

## [NPM Package](https://www.npmjs.com/package/mat-select-search-advanced)



# Installation

`npm i mat-select-search-advanced`

# How to use

## Implement
### Import MatSelectSearchAdvancedModule into your module
```
import { MatSelectSearchAdvancedModule } from 'mat-select-search-advanced';
```
### Add Module
```
@NgModule({
  imports: [
    ...
    MatSelectSearchAdvancedModule
  ],
  declarations: [	
    AppComponent,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Use library in your component
```html
<mat-select-search-advanced 
        [objects]="array" indexKey="id" 
        [viewKey]="['name']" 
        [searchProperties]="['name', 'age']"
        [initData] = "initArray"
        placeholderSearchLabel="Search by name" 
        label="List Animal" 
        messageErrorRequired="You need select some thing"
        noEntriesFoundLabel="Found nothing" 
        tooltipMessage="Select all / Deselect all" 
        selectAllViewLabel="All animal"
        [required] = "true"
        (optionSelect$)="getOptionSelected($event)">
    </mat-select-search-advanced>
```

**This code is just a sample**

## Properties - Config Mat-select-search-advance
### objects and initData (this is your array and init array)
```js
// if you wana change array
this.array = newArray.slice();
```
### indexKey (this is your index your object, example: id)
```html
  indexKey="id" 
```
### viewKey (custom view value in mat-select)
```html
 [viewKey]="['name', 'age']"
```
### searchProperties (list key of object for search)
```html
 [searchProperties]="['name']"
```
### showToggleAllCheckbox (true or false)
```html
  [showToggleAllCheckbox]="true"
```
##### or
```html
 [searchProperties]="['name','age',...]"
```
### placeholderSearchLabel (lable on search input)
```html
 placeholderSearchLabel="Search by name" 
```
### initData (init data in edit mode, example: id value)
```html
 [initData]="listId" 
```
##### or
```html
 [initData]="1" 
```
### multiple (true or false)
```html
 [multiple]="false"
```
### disabled (true or false)
```html
 [disabled]="false"
```
## appearance ('outline' | 'fill' | ...)
```html
 appearance="outline"
```
## Same for other attributes
```js
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
  @Output() optionSelected$ = new EventEmitter<any>();
```

