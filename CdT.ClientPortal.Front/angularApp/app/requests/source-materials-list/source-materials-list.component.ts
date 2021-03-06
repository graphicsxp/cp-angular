import { EntityManagerService } from './../../entity-manager.service';
import { LookupNames } from './../../model/lookups';
import { PhysicalFileService } from './../../shared/services/physicalFile.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { RequestService } from './../services/request.service';
import { Request } from './../../model/breeze/request';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { SourceMaterialService } from '../services/source-material.service';
import { UploadedFile } from '../../model/uploadedFile';
import { GlobalService } from '../../shared/services/global.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'cdt-source-materials-list',
  templateUrl: './source-materials-list.component.html',
  styleUrls: ['./source-materials-list.component.scss']
})
export class SourceMaterialsListComponent implements OnInit {

  @Input() request: Request

  public allowedExtensions: string[];
  public hasSourceLanguagesChanged: Boolean;

  constructor(private _entityManagerService: EntityManagerService,
    private _sourceMaterialService: SourceMaterialService,
    private _physicalFileService: PhysicalFileService,
    public globalService: GlobalService,
    private _confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.allowedExtensions = this._entityManagerService.getLookup(LookupNames.sourceMaterialDocumentFormatExtensions).map(ext => ext.code);
  }

  /**
   * Returns the first not deleted material so that we know where to put the copy down button
   */
  public getFirstNotDeletedMaterial() {
    return _.find(this.request.sourceMaterials, m => !m.isScreenDeleted);
  }

  public onBatchUpdate(sourceMaterial) {

    this._confirmationService.confirm({
      message: 'Copy data to all documents ?',
      accept: () => {
        // find index of first not deleted material
        const startIdx = _.indexOf(this.request.sourceMaterials, sourceMaterial);

        for (let i = startIdx; i < this.request.sourceMaterials.length; i++) {
          const material = this.request.sourceMaterials[i];
          if (!material.isMarkedForDeletion && material !== sourceMaterial) {
            material.selectedLanguages = _.clone(sourceMaterial.selectedLanguages);
            material.isConfidential = sourceMaterial.isConfidential;
            material.isExternalized = sourceMaterial.isExternalized;
            material.confidentiality = sourceMaterial.confidentiality;
            material.isPrivate = sourceMaterial.isPrivate;
            // copy outputFormat if format is in targetFormats of the destination material
            if (this._sourceMaterialService.getTargetFormats(material).indexOf(sourceMaterial.deliverableDocumentFormat) !== -1) {
              material.deliverableDocumentFormat = sourceMaterial.deliverableDocumentFormat;
            }
          }
        }
      }
    });
  }

  public onSourceLanguagesChanged(event: boolean) {
    this.hasSourceLanguagesChanged = event;
  }

  /**
   * For each uploaded files we will create a new SourceMaterial entity
   * @param uploadedFiles the list of uploaded files
   */
  onUploadedFilesChange(uploadedFiles: UploadedFile[]) {
    uploadedFiles.forEach(file => {
      const sourceMaterial: SourceMaterial = this._sourceMaterialService.create(
        this._physicalFileService.create(
          file, _.find(this._entityManagerService.getLookup(LookupNames.materialClassifications), { code: 'SOUR' })), this.request.requestTemplate);
      this.request.sourceMaterials.push(sourceMaterial);

      // In case of subtitling or other cases
      //_setCorrrectDocumentFormats(sourceMaterial);

      // if source languages were set by the template we need to set the screen dirty
      if (sourceMaterial.selectedLanguages.length > 0) {
        // $scope.vm.many2manyHasChanged = true;
        // sourceMaterial.entityAspect.removeValidationError('notEmptyCollectionValidator:sourceLanguages');
      }
    });
  }

  /**
   * Returns an array of material's filename for each material in the sourceMaterials collection
   */
  getUploadedFiles() {
    return _.chain(this.request.sourceMaterials).map(sm => sm.material.fileName).value();
  };

  /**
   * Returns the number of documents that are not in the deleted state
   */
  getNumberOfDocuments() {
    return this.request ? _.filter(this.request.sourceMaterials, material => material.isScreenDeleted !== true).length : 0;
  };

  /**
   * called from parent component when saving
   */
  onSave() {
    this.request.sourceMaterials.forEach((material) => {
      this._entityManagerService.checkMany2ManyModifications('SourceMaterialLanguage', material, material.selectedLanguages,
        material.sourceLanguages, 'material', 'language', false);
    });

    const sourceMaterialsToDelete = _.filter(this.request.sourceMaterials, mat => mat.isScreenDeleted);

    // deletes entities and detaches related bags, cascade delete done server side
    this._entityManagerService.deleteEntities(sourceMaterialsToDelete, ['sourceLanguages', 'jobs']);

    // TODO _updateTATOnDeleteSourceDocuments
  }
}
