import { JobTranslation } from './../../../model/breeze/job-translation';
import { SourceMaterialService } from './../../services/source-material.service';
import { Material } from './../../../model/breeze/material';
import { Priority } from './../../../model/breeze/priority';
import { Service } from './../../../model/breeze/service';
import { SourceMaterial } from './../../../model/breeze/source-material';
import { Component, OnInit, Input } from '@angular/core';
import { PhysicalFile, Language } from '../../../model/breeze/entity-model';

@Component({
  selector: 'cdt-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.scss']
})
export class JobHeaderComponent implements OnInit {

  @Input() sourceMaterial: SourceMaterial;
  @Input() service: Service;
  @Input() priority: Priority;

  constructor(private _sourceMaterialService: SourceMaterialService) { }

  ngOnInit() {
  }

  public asPhysicalFile(material: Material): PhysicalFile { return material as PhysicalFile; }

  findValidationErrorsOnMaterial(): boolean { return false; }
  canSetPrivacy(): boolean { return true; }
  denyDownload(): void { }
  hideShow(): void { }
  canSelectLanguages(): boolean { return true; }

  addJob(targetLanguage: Language) {


    //  this._sourceMaterialService.addJob<JobTranslation>(scope.model,
    //   scope.priority.code,
    //   targetLanguage,
    //   scope.service.code,
    //   false);
  }
}
