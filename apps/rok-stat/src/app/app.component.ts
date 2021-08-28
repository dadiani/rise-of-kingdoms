import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@rise-of-kingdoms/api-interfaces';

@Component({
  selector: 'rise-of-kingdoms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileName = '';
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}

  async onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("fileStat", file, this.fileName);
        const headers = new HttpHeaders();
       /*  headers = headers.append('Content-Type', "multipart/form-data");
        headers = headers.append('enctype', 'multipart/form-data'); */
       this.http.post<any>("/api/upload", formData
      ).subscribe((response)=>{
          console.log(response)
        });
    }
}

async onImageSelected(event:any) {

  const file:File = event.target.files[0];

  if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("fileStat", file, this.fileName);
      const headers = new HttpHeaders();
     /*  headers = headers.append('Content-Type', "multipart/form-data");
      headers = headers.append('enctype', 'multipart/form-data'); */
     this.http.post<any>("/api/upload/image", formData
    ).subscribe((response)=>{
        console.log(response)
      });
  }
}
}
