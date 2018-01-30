
import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../entity-manager.service';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../shared/services/base-repository.service';
import {  } from '../model/delivery-mode';

@Injectable()
export class RequestService extends BaseRepositoryService {

  constructor(protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService);
  }

  public query(state: any): void {
    this.fetch('Requests', state, `status, department, client, sourceMaterials.jobs.priority, sourceMaterials.jobs.service.unit, 
       sourceMaterials.jobs.jobStatus, purpose, referenceSet.references, requestContacts.contact`)
      .subscribe(x => super.next(x));
  } 
}
