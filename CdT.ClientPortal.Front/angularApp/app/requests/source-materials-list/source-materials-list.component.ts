import { SourceMaterial } from './../../model/source-material';
import { RequestService } from './../services/request.service';
import { Request } from './../../model/request';
import { Component, OnInit, Input } from '@angular/core';
import { LookupNames } from '../../model/lookups';
import * as _ from 'lodash';

@Component({
  selector: 'cdt-source-materials-list',
  templateUrl: './source-materials-list.component.html',
  styleUrls: ['./source-materials-list.component.scss']
})
export class SourceMaterialsListComponent implements OnInit {

  @Input() request: Request

  public allowedExtensions: string[];

  constructor(private _requestService: RequestService) { }

  ngOnInit() {
    this.allowedExtensions = this._requestService.getLookup(LookupNames.sourceMaterialDocumentFormatExtensions).map(ext => { return ext.code });
  }

  onUploadedFilesChange(event:any[]){
    //let sourceMaterial:SourceMaterial = _request.sourceMaterial.create(dataService.physicalFile.create(file, _.find(dataService.lookups.materialClassifications, { code: 'SOUR' })));

  }

  /**
   * Returns an array of material's filename for each material in the sourceMaterials collection
   */
  getUploadedFiles = function () {
    return _.chain(this.request.sourceMaterials).map(sm => { return sm.material.fileName; }).value();
  };

}
