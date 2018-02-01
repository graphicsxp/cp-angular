import { Request } from './../../model/request';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cdt-source-materials-list',
  templateUrl: './source-materials-list.component.html',
  styleUrls: ['./source-materials-list.component.scss']
})
export class SourceMaterialsListComponent implements OnInit {

  constructor() { }

  @Input() request: Request

  ngOnInit() {
  }

}
