import { RequestService } from './../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from './../../model/breeze/request';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'cdt-request-jobs',
  templateUrl: './request-jobs.component.html',
  styleUrls: ['./request-jobs.component.scss']
})
export class RequestJobsComponent implements OnInit {
  constructor(public requestService: RequestService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe((data: { request: Request }) => {
      if (data.request) {
        this.requestService.currentRequest = data.request;
      }
    });
  }

  // TODO implement (see disableScreen method in old CP)
  isDisabled(): Boolean { return false; }
}
