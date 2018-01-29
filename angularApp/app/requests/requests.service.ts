import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../entity-manager.service';
import { Client, Status, Request } from './../model/entity-model';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../shared/services/base-repository.service';

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

  getStatuses(): Status[] {
    return this._entityManagerService.em.executeQueryLocally(EntityQuery.from('Statuss')) as Status[];
  }

  getClients(): Client[] {
    return this._entityManagerService.em.executeQueryLocally(EntityQuery.from('Clients')) as Client[];
  }
}
