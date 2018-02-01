import { Request } from './../model/request';
import { Entity } from 'breeze-client';
import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from './../entity-manager.service';
import { Injectable } from '@angular/core';
import { EntityQuery } from 'breeze-client';
import { BaseRepositoryService } from '../shared/services/base-repository.service';
import { } from '../model/delivery-mode';
import * as _ from 'lodash';
import { LookupNames } from '../model/lookups';

@Injectable()
export class RequestService extends BaseRepositoryService {

  constructor(protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService);
    this.entityName = 'Request';
  }

  public create() {
    let request: Request = super.create() as Request;
    request.requestType = _.find(this.getLookup(LookupNames.RequestType), { code: 'RST001' });
    request.client = _.find(this.getLookup(LookupNames.Client), {clientPortalId: 250001 });
    request.deliveryMode = _.find(this.getLookup(LookupNames.DeliveryMode), {code: 'No' });
    request.department = _.find(this.getLookup(LookupNames.Department), {code: 250001 });
    request.status = _.find(this.getLookup(LookupNames.Status), {code: 'DRAF' });

    return request;
  }

  public query(state: any): void {
    this.fetch('Requests', state, `status, department, client, sourceMaterials.jobs.priority, sourceMaterials.jobs.service.unit, 
       sourceMaterials.jobs.jobStatus, purpose, referenceSet.references, requestContacts.contact`)
      .subscribe(x => super.next(x));
  }
}
