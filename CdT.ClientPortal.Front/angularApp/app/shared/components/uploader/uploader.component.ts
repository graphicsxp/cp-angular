import { UploadedFile } from './../../../model/uploadedFile';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRestrictions, FileInfo, FileState, SelectEvent, UploadEvent } from '@progress/kendo-angular-upload';
import * as _ from 'lodash';
import { SuccessEvent } from '@progress/kendo-angular-upload/dist/es/upload-events';

@Component({
  selector: 'cdt-uploader',
  template: `<kendo-upload
              [saveUrl]="uploadSaveUrl"
              (success)="onSuccess($event)"
              (select)="onSelect($event)"
              [(ngModel)]="myFiles"
              [batch]="true"
              [multiple]="multiple"
              [restrictions]="myRestrictions">
              </kendo-upload>`,
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  public uploadSaveUrl: String = `${environment.backendUrl}${environment.webApiEndpoint}${environment.uploadEndpoint}`;
  public myFiles: Array<FileInfo>;

  @Input() public multiple: boolean;
  @Input() public allowedExtensions: string[];
  @Input() public maxFiles: number;
  @Input() public uploadedFiles: string[];
  @Output() public uploadedFilesChange = new EventEmitter<any[]>();;

  public myRestrictions: FileRestrictions;

  constructor() { }

  ngOnInit() {
    this.myRestrictions = {
      allowedExtensions: this.allowedExtensions,
      maxFileSize: 50000000, // 50 Mb
    };
  }

  public onSuccess(event: SuccessEvent) {
    const files: Array<UploadedFile> = new Array<UploadedFile>();
    event.response.body.forEach(element => {
      files.push(new UploadedFile(element.Path, element.Name, element.Size));
    });
    this.uploadedFilesChange.emit(files);
  }

  public onSelect(event: SelectEvent) {
    if (event.files.length > this.maxFiles || this.uploadedFiles.length + event.files.length > this.maxFiles) {
      console.log(`Cannot upload more than ${this.maxFiles} files !`);
      event.preventDefault();
    }

    // validate that the filename contains only ascii and accentuated characters
    event.files.forEach(f => {
      if (/[^\x00-\x7F\u00E0\u00E7-\u00EB]+/.test(f.name)) {
        console.log(`${f.name}:only latin characters allowed.`);
        event.preventDefault();
        return;
      }

      if (_.chain(this.uploadedFiles).map((uf) => {
        return this.getFileName(uf).toLowerCase();
      }).includes(this.getFileName(f.name).toLowerCase()).value()) {
        // abort upload for the current file(does not block multiple uploads)
        console.log(`${f.name}: a file with the same name was already added.`);
        event.preventDefault();
        return;
      }
    });
  }

  private getFileName(fileNameWithExtention) {
    return fileNameWithExtention ?
      /([^\/]+)(?=\.\w+$)/.exec(fileNameWithExtention)[1] : '';
  }
}
