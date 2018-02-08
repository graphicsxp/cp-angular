import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Request } from '../../model/breeze/request';

@Component({
  selector: 'cdt-request-header',
  templateUrl: './request-header.component.html',
  styleUrls: ['./request-header.component.scss']
})
export class RequestHeaderComponent implements OnInit {

  @Input() request: Request;

  // TODO to be changed when user service is available
  public isAdmin: Boolean = false;
  public canShowWSVolumes() { return false; }
  public disableScreen() { return false; }
  public openComments() { }

  constructor() { }

  ngOnInit() {
  }

}
