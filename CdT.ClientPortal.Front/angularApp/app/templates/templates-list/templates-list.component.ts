import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { RequestTemplate } from './../../model/breeze/request-template';
import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../templates.service';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
<<<<<<< Updated upstream:CdT.ClientPortal.Front/angularApp/app/templates/templates-list/templates-list.component.ts
import { DialogAction } from '@progress/kendo-angular-dialog';
=======
>>>>>>> Stashed changes:angularApp/app/templates/templates-list/templates-list.component.ts

@Component({
  selector: 'cdt-templates-list',
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
    // Optionally, clear the selection when paging
    this.mySelection = [];
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this._templateService.query(state);
  }

  /* KENDO GRID */

  constructor(private _templateService: TemplateService, private dialogService: DialogService) {
    this.view = _templateService;
    this._templateService.query(this.state);
  }

  delete(template: RequestTemplate) {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure?',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        console.log('action', result);
        template.isDeleted = true;
        this._templateService.save().then(() => {
          this._templateService.query(this.state);
        });
      }
    });
  }

  ngOnInit() { }
}
