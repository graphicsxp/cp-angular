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
      field: 'creationDate'
    }]
    // filter: {
    //   logic: 'and',
    //   filters: [{ field: 'client.id', operator: 'equals', value: 'e839bbdd-3329-404c-9f84-a87400b1430a' },
    //   { field: 'status.code', operator: 'contains', value: ['EXPI', 'PEND'] },
    //   { field: 'requestIdentifier', operator: 'equals', value: '2018/000005' }]
    // }
  };

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
