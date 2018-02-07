import { Request } from './../../model/breeze/request';
import { Entity } from 'breeze-client';
import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../../entity-manager.service';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../../shared/services/base-repository.service';
import { } from '../model/breeze/delivery-mode';
import * as _ from 'lodash';
import { LookupNames } from '../../model/lookups';

@Injectable()
export class RequestService extends BaseRepositoryService<Request> {

  public currentRequest: Request;

  constructor(protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService, Request);
  }

  public create(): Request {
    const request: Request = super.createEntity();
    request.requestType = _.find(this.getLookup(LookupNames.requestTypes), { code: 'RST001' });
    request.client = _.find(this.getLookup(LookupNames.clients), { clientPortalId: 250001 });
    request.deliveryMode = _.find(this.getLookup(LookupNames.deliveryModes), { code: 'No' });
    request.department = _.find(this.getLookup(LookupNames.departments), { code: 250001 });
    request.status = _.find(this.getLookup(LookupNames.statuses), { code: 'DRAF' });

    return request;
  }

  public query(state: any): void {
    this.fetch('Requests', state, `status, department, client, sourceMaterials.jobs.priority, sourceMaterials.jobs.service.unit, 
       sourceMaterials.jobs.jobStatus, purpose, referenceSet.references, requestContacts.contact`)
      .subscribe(x => super.next(x));
  }
}
