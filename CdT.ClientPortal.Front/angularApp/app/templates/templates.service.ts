import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../entity-manager.service';
import { Client, Status, Request } from './../model/entity-model';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../shared/services/base-repository.service';

@Injectable()
export class TemplateService extends BaseRepositoryService {

  constructor(protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService);
    this.entityName = 'RequestTemplate';
  }

  public create() {
    return super.create();
  }

  public query(state: any): void {
    this.fetch('RequestTemplates', state, null)
      .subscribe(x => super.next(x));
  }

  public delete(dataItem: any): void {
    console.log(dataItem);
  }
}
