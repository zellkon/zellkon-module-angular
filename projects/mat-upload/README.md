<h1 align="center">MAT UPLOAD</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >
</p>

_This project made by  **[ZELLKON](https://zellkon.com)**._

---

# [Github](https://github.com/zellkon/zellkon-module-angular)

<p align="center">
<img src="https://i.ibb.co/ZfwGKsM/matupload2.png" alt="matupload2">
<img src="https://i.ibb.co/NCNfDLN/matupload.png" alt="matupload">
</p>

## [NPM Package](https://www.npmjs.com/package/mat-upload)



# Installation

`npm i mat-upload`
## Implement
### Import MatSelectSearchAdvancedModule into your module
```
import { MatUploadModule } from 'mat-upload';
```
### Add Module
```
@NgModule({
  imports: [
    ...
    MatUploadModule
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
  <div>
    <mat-upload 
    apiUrl="your api upload" 
    serverUrl="your server image"  
    location="test" 
    accessToken="token" 
    typeUpload="single" 
    label="Tải lên"
    keyUrl="r"
    accept=".doc,.docx"
    formControlName="file"></mat-upload>
  </div>
  <div>
    <mat-upload 
    typeUpload="multiple"
    apiUrl="your api upload" 
    serverUrl="your server image"  
    location="test" 
    accessToken="token" 
    label="Tải lên"
    keyUrl="r"
    formControlName="file"></mat-upload>
  </div>
  <div>
    <mat-upload 
    typeUpload="dragNdrop"
    label="Nhấp hoặc kéo tệp tin vào khu vực này để tải lên"
    description="Hỗ trợ file có phần mở rộng .xls, .xlsx"
    apiUrl="your api upload" 
    serverUrl="your server image" 
    location="test" 
    accessToken="token"
    keyUrl="r"
    formControlName="file"></mat-upload>
  </div>
```

Selector: `mat-upload`

**Properties**

| Name | Description |
|------|-------------|
| @Input() label: string | The label for upload card. |
| @Input() description: string | Description for drag and drop. | 
| @Input() serverUrl: string or undefined | Environment for case image Url return `Test/sample.png` this will returun serverUrl +  `Test/sample.png`. |
| @Input() apiUrl: string | Environment api server for upload file. |
| @Input() typeUpload: string |  `single` || `multiple` || `dragNdrop` |
| @Input() accessToken: string or undefined | Your bearer token. |
| @Input() location: string or undefined | Your location upload. |
| @Input() accept: string | Read more  https://www.w3schools.com/tags/att_input_accept.asp . Example: `image/png,image/jpg` |
| @Input() urlKey: string | This's  key of response object. Example: `{error: 0, message: 'success'}` =>` keyUrl = "message"` => `formControl.value = ['success']`|
| @Input() messageUploadError: string | This is error upload message. |
| @Input() messageExtensionError: string | This is error extension message. |
| @Output() delete$: event | This is file url delete. |
| @Input() snackBarClass: string | Defined class for SnackBar. Example: `snackBarClass="errorUpload"` and add `.errorUpload{background: red; color: white;}` into your `styles.scss` |
| @Input() requestParam = 'file' | Defined param for request.|
| @Input() errorKey = 'm' | Defined error message for response.|


