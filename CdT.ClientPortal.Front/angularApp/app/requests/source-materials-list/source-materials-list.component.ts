import { LookupNames } from './../../model/lookups';
import { PhysicalFileService } from './../../shared/services/physicalFile.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { RequestService } from './../services/request.service';
import { Request } from './../../model/breeze/request';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { SourceMaterialService } from '../services/sourceMaterial.service';
import { UploadedFile } from '../../model/uploadedFile';

@Component({
  selector: 'cdt-source-materials-list',
  templateUrl: './source-materials-list.component.html',
  styleUrls: ['./source-materials-list.component.scss']
})
export class SourceMaterialsListComponent implements OnInit {

  @Input() request: Request

  public allowedExtensions: string[];

  constructor(private _requestService: RequestService, private _sourceMaterialService: SourceMaterialService, private _physicalFileService: PhysicalFileService) { }

  ngOnInit() {
    this.allowedExtensions = this._requestService.getLookup(LookupNames.sourceMaterialDocumentFormatExtensions).map(ext => { return ext.code });
  }

  /**
   * For each uploaded files we will create a new SourceMaterial entity
   * @param uploadedFiles the list of uploaded files
   */
  onUploadedFilesChange(uploadedFiles: UploadedFile[]) {
    uploadedFiles.forEach(file => {
      let sourceMaterial: SourceMaterial = this._sourceMaterialService.create(
        this._physicalFileService.create(
          file, _.find(this._requestService.getLookup(LookupNames.materialClassifications), { code: 'SOUR' })), this.request.requestTemplate);
      this.request.sourceMaterials.push(sourceMaterial);

      // In case of subtitling or other cases
      //_setCorrrectDocumentFormats(sourceMaterial);

      //if source languages were set by the template we need to set the screen dirty
      if (sourceMaterial.selectedSourceLanguages.length > 0) {
        //$scope.vm.many2manyHasChanged = true;
        //sourceMaterial.entityAspect.removeValidationError('notEmptyCollectionValidator:sourceLanguages');
      }
    });
  }

  /**
   * Returns an array of material's filename for each material in the sourceMaterials collection
   */
  getUploadedFiles = function () {
    return _.chain(this.request.sourceMaterials).map(sm => { return sm.material.fileName; }).value();
  };

}
