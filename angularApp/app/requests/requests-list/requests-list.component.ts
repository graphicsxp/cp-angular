import { RequestService } from './../requests.service';
import { Status } from './../../model/status';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Request } from './../../model/entity-model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Client } from '../../model/client';

@Component({
  selector: 'cdt-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})

export class RequestsListComponent implements OnInit {
  private selectedRequest: Request;
  private statuses: any[];
  private clients: Client[];
  private searchField: string = 'name';
  private searchInput: string;
  private currentPage: number = 1;
  private pageCount: number;
  private _totalRecords: number;
  private _pageSize: number = 10;
  public mySelection: number[] = [];


  /* KENDO GRID */
  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 10,
    // filter: {
    //   logic: 'and',
    //   filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
    // }
  };

  public pageChange(event: PageChangeEvent): void {
    this.state.skip = event.skip;
    this._requestService.query(this.state);

    // Optionally, clear the selection when paging
    this.mySelection = [];
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this._requestService.query(state);
  }
  /* KENDO GRID */


  constructor(private _requestService: RequestService) {
    this.view = _requestService;
    this._requestService.query(this.state);
  }

  ngOnInit() {
    this.statuses = this._requestService.getStatuses().map(s => { return { code: s.code, defaultLabel: s.defaultLabel } });
    this.clients = this._requestService.getClients();
  }
}
