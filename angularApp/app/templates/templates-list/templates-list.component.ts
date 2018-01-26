import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { RequestTemplate } from './../../model/request-template';
import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../templates.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  private selectedTemplate: RequestTemplate;
  private searchInput: string;
  public mySelection: number[] = [];
  public isLoading: boolean;

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
    this.state.skip = <number>event.skip;
    this.state.take = <number>event.take;
    this._templateService.query(this.state);

    // Optionally, clear the selection when paging
    this.mySelection = [];
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this._templateService.query(state);
  }

  /* KENDO GRID */

  constructor(private _templateService: TemplateService) {
    this.view = _templateService;
    this._templateService.query(this.state);
  }

  delete(template: RequestTemplate) {
    template.isDeleted = true;
    this._templateService.save().then(() => {
      this._templateService.query(this.state);
    });
  }

  ngOnInit() { }
}
