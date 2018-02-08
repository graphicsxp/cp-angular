import { Request } from './../../model/breeze/entity-model';
import { RequestService } from './../services/request.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RequestJobsResolver implements Resolve<Request> {

    constructor(private _requestService: RequestService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Request> {
        if (!this._requestService.currentRequest) {
            const id = route.paramMap.get('id');

            const expand = `requestTemplate, purpose, deliveryMode, status, requestContacts.contact, requestDeliveryContacts.contact,
                            sourceMaterials.domain, sourceMaterials.material, sourceMaterials.sourceLanguages.language,
                            sourceMaterials.jobs.jobContacts, sourceMaterials.jobs.jobMaterials.material, sourceMaterials.jobs.service.unit,
                            sourceMaterials.jobs.targetLanguage, referenceSet.references.material,
                            referenceSet.references.referenceLanguages, sourceMaterials.jobs.jobStatus, sourceMaterials.jobs.scopingInfo,
                            blockAutomationJustification, sourceMaterials.confidentiality`;
            return this._requestService.getById('Request', 'Requests', id, expand, true);
        }
    }
}
