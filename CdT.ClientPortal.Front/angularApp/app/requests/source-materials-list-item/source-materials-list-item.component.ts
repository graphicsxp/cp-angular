import { EntityManagerService } from './../../entity-manager.service';
import { SourceMaterialService } from './../services/source-material.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { EntityState } from 'breeze-client';
import { LookupNames } from './../../model/lookups';
import { PhysicalFile } from './../../model/breeze/physical-file';
import { DocumentFormat } from './../../model/breeze/document-format';
import { Language } from './../../model/breeze/language';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Material } from '../../model/breeze/material';

@Component({
  selector: '[cdt-source-materials-list-item]',
  templateUrl: './source-materials-list-item.component.html',
  styleUrls: ['./source-materials-list-item.component.scss']
})
export class SourceMaterialsListItemComponent implements OnInit {

  public languages: Language[];
  public targetFormats: DocumentFormat[];

  @Input() public sourceMaterial: SourceMaterial;
  @Input() public showCopyDown: boolean;
  @Output() public batchUpdate = new EventEmitter<SourceMaterial>();
  @Output() public sourceLanguagesChanged = new EventEmitter<boolean>();

  constructor(private _entityManagerService: EntityManagerService) { }

  ngOnInit() {
    // this._sourceMaterialService.setTargetFormats(this.sourceMaterial);
    this.languages = this._entityManagerService.getLookup(LookupNames.languages);
    this.targetFormats = _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets))
      .filter((format) => { return format.sourceId === (this.sourceMaterial.material as PhysicalFile).documentFormat.id; }).map('target').value();
    if (this.sourceMaterial.id) {
      this.sourceMaterial.setSelectedSourceLanguages();
    }
  }

  public asPhysicalFile(material: Material): PhysicalFile { return material as PhysicalFile; }

  public onBatchUpdate() {
    this.batchUpdate.emit(this.sourceMaterial);
  }

  public onSelectedLanguagesChanged(event) {
    this.sourceMaterial.selectedLanguages = event;
    this._entityManagerService.triggerStatusNotification(this.sourceMaterial);
    this.sourceLanguagesChanged.emit(true);
  }

  public toggleDelete() {
    if (this.sourceMaterial.entityAspect.entityState === EntityState.Added) {
      // detach both sourcematerial and material
      this.sourceMaterial.material.entityAspect.setDetached();
      this.sourceMaterial.entityAspect.setDetached();
    } else {
      this.sourceMaterial.isMarkedForDeletion = !this.sourceMaterial.isMarkedForDeletion;
      this.sourceMaterial.entityAspect.setModified();
    }
  }

  public canSetPrivacy(): boolean {
    if (this.sourceMaterial.isPrivate && this.sourceMaterial.uploadedBy) {
      // TODO change when user info is implemented
      return (this.sourceMaterial.uploadedBy === '$rootScope.userInfo.currentUser')
    }
    return true;
  };

  public onOutputFormat(event) {
    // var service = modelService.request.getSelectedService($scope.vm.request);
    //         if (service && service.code === 'ST' && !_.includes(modelService.documentFormat.validSubtitlingFormatCodes, value.code)) {
    //             var dlg = dialogs.confirm('Please confirm', 'You have selected an output format that is incompatible with the subtitling service. All jobs associated with the request will be deleted. Are you sure you want to continue ?');

    //             return dlg.result.then(function () {
    //                 //we delete all the existing jobs - make sure to pass a filtered collection to deleteEntities otherwise it won't work
    //                 $scope.vm.request.sourceMaterials.forEach(function (material) {
    //                     dataService.deleteEntities(_.filter(material.jobs, function (job) { return true; }), ['jobMaterials']);
    //                 });
    //             }, function () { });
    //         } else {
    //             return $q.when([]);
    //         }
  }
}
