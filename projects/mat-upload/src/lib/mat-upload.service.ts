import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatUploadModule } from './mat-upload.module';

@Injectable({
  providedIn: MatUploadModule
})
export class MatUploadService {

  constructor(
    private http: HttpClient,
  ) { }
  uploadFile(serverUrl: string, accessToken: string, location: string, file: File) {
    const headers = new HttpHeaders().set(
      'Content-Type', 'application/json;',
    ).set('Authorization', 'Bearer ' + accessToken);
    const formData = new FormData();
    if (location && location !=='') {
      formData.append('location', location);
    }
    formData.append('', file);
    if (accessToken && accessToken !=='') {
      return this.http.post(serverUrl, formData, { headers, reportProgress: true, observe: 'events' });
    }
    return this.http.post(serverUrl, formData, { reportProgress: true, observe: 'events' });
  }
  uploadFiles(serverUrl: string, accessToken: string, location: string, files: File[]) {
    const headers = new HttpHeaders().set(
      'Content-Type', 'application/json;',
    ).set('Authorization', 'Bearer ' + accessToken);
    const formData = new FormData();
    if (location && location !=='') {
      formData.append('location', location);
    }
    if (files.length) {
      for (let file of files)
        formData.append('files[]', file, file.name);
    }
    if (accessToken && accessToken !=='') {
      return this.http.post(serverUrl, formData, { headers, reportProgress: true, observe: 'events' });
    }
    return this.http.post(serverUrl, formData, { reportProgress: true, observe: 'events' });
  }
}
