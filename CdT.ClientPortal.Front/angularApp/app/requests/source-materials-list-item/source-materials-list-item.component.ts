import { Component, OnInit, Input, Output } from '@angular/core';
import { SourceMaterial } from '../../model/breeze/source-material';

@Component({
  selector: '[cdt-source-materials-list-item]',
  templateUrl: './source-materials-list-item.component.html',
  styleUrls: ['./source-materials-list-item.component.scss']
})
export class SourceMaterialsListItemComponent implements OnInit {

  constructor() { }

  @Input() public sourceMaterial: SourceMaterial;

  ngOnInit() {
  }

  public canSetPrivacy() { }
  public getFirstNotDeletedMaterial() { }
}
