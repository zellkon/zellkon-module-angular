<h1 align="center">MAT PREVIEW MEDIA</h1>

<p align="center">

<img src="https://img.shields.io/badge/create%20by-zellkon-brightgreen" >
</p>

_This project made by  **[ZELLKON](https://zellkon.com)**._

---

# [Github](https://github.com/zellkon/zellkon-module-angular)

<p align="center">
Demo
</p>

## [NPM Package](https://www.npmjs.com/package/mat-preview-media)



# Installation

`npm i mat-preview-media`

# How to use

## Implement
### Import MatPreviewMediaModule into your module
```
import { MatPreviewMediaService } from 'mat-preview-media';
```
### Add Module
```
@NgModule({
  imports: [
    ...
    MatPreviewMediaModule
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
<img src="url" (click)= "preview(url)" >
```
```js
private previewService: MatPreviewMediaService
preview(url): void {
    this.previewService.openPreviewMedia(url);
}
```