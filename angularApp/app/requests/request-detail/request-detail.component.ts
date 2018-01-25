import { RequestService } from './../requests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  public title: String = '';
  public request: Request;

  constructor(private _requestService: RequestService, private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this._route.data.subscribe((data: { request: Request }) => {
      this.request = data.request;
    })
  }

}
