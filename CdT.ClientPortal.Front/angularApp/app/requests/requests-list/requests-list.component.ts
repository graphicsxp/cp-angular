import { RequestService } from './../services/request.service';
import { Status } from './../../model/breeze/status';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Request } from './../../model/breeze/entity-model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Client } from '../../model/breeze/client';
import { LookupNames } from '../../model/lookups';

@Component({
  selector: 'cdt-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})

export class RequestsListComponent implements OnInit {
  private selectedRequest: Request;
  private statuses: any[];
  private clients: Client[];
  public mySelection: number[] = [];
  public temp: string[];
  public temp2: string;

  /* KENDO GRID */
  public view: Observable<GridDataResult>;
  public pageSizes = [10, 20, 50, 100];
  public state: State = {
    skip: 0,
    take: 10,
    sort: [{
      dir: 'desc',
      field: 'requestIdentifier'
    }],
    filter: {
      logic: 'and',
      filters: [
        { field: 'client.id', operator: 'equals', value: 'b442c0f6-784e-4763-96bc-a7a2008aa352' },
        { field: 'status.code', operator: 'equals', value: ['DRAF'] }
      ]
    }
  };

  constructor(private _requestService: RequestService) {
    this.view = _requestService;
    this._requestService.query(this.state);
  }

  ngOnInit() {
    this.statuses = this._requestService.getLookup(LookupNames.statuses).map(s => { return { code: s.code, defaultLabel: s.defaultLabel } });
    this.clients = this._requestService.getLookup(LookupNames.clients);
  }

  public pageChange(event: PageChangeEvent): void {
    // Optionally, clear the selection when paging
    this.mySelection = [];
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this._requestService.query(state);
  }

  public onPageSizeChange() {
    this._requestService.query(this.state);
  }  
}
