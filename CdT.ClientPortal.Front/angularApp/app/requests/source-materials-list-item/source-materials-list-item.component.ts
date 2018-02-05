import { GlobalService } from './../../shared/services/global.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { SourceMaterial } from '../../model/breeze/source-material';
import { PhysicalFile, Material } from '../../model/breeze/entity-model';

@Component({
  selector: '[cdt-source-materials-list-item]',
  templateUrl: './source-materials-list-item.component.html',
  styleUrls: ['./source-materials-list-item.component.scss']
})
export class SourceMaterialsListItemComponent implements OnInit {

  constructor(public globalService: GlobalService) { }

  @Input() public sourceMaterial: SourceMaterial;

  ngOnInit() {
  }

  public canSetPrivacy(sourceMaterial: SourceMaterial) { }
  public getFirstNotDeletedMaterial() { }
  public asPhysicalFile(material: Material): PhysicalFile { return material as PhysicalFile; }
}
