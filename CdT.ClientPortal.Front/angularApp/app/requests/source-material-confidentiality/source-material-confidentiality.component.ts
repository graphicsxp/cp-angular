import { Confidentiality } from './../../model/breeze/confidentiality';
import { EntityManagerService } from './../../entity-manager.service';
import { GlobalService } from './../../shared/services/global.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { Component, OnInit, Input } from '@angular/core';
import { LookupNames } from '../../model/lookups';

@Component({
  selector: 'cdt-source-material-confidentiality',
  templateUrl: './source-material-confidentiality.component.html',
  styleUrls: ['./source-material-confidentiality.component.scss']
})
export class SourceMaterialConfidentialityComponent implements OnInit {

  @Input() public sourceMaterial: SourceMaterial;
  public confidentialities: Confidentiality[];

  constructor(public globalService: GlobalService, private _entityManagerService: EntityManagerService) { }

  ngOnInit() {
    this.confidentialities = this._entityManagerService.getLookup(LookupNames.confidentialities);
  }

  /**
   * Legacy code for old confidentiality logic
   */
  public onConfidentialityChanged(event) {
    this.sourceMaterial.isExternalized = this.sourceMaterial.confidentiality.isExternalized;
    this.sourceMaterial.isConfidential = this.sourceMaterial.confidentiality.isConfidential;
  }

  public toggleConfidential = function () {
    if (!this.sourceMaterial.isConfidential) {
      this.sourceMaterial.isExternalized = true;
    } else {
      this.sourceMaterial.isExternalized = false;
    }
  };
}
