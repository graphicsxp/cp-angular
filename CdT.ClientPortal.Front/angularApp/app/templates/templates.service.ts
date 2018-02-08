import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../entity-manager.service';
import { Client, Status, Request, RequestTemplate } from './../model/breeze/entity-model';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../shared/services/base-repository.service';

@Injectable()
export class TemplateService extends BaseRepositoryService<RequestTemplate> {

  constructor(protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService, RequestTemplate);
  }

  public create() {
    return super.createEntity<RequestTemplate>(RequestTemplate);
  }

  public query(state: any): void {
    this.fetch('RequestTemplates', state, null)
      .subscribe(x => super.next(x));
  }

  public delete(dataItem: any): void {
    console.log(dataItem);
  }
}
