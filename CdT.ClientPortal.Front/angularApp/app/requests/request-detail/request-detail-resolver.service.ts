import { Request } from './../../model/breeze/entity-model';
import { RequestService } from './../services/request.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class RequestDetailResolver implements Resolve<Request> {

    constructor(private _requestService: RequestService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request> {
        let id = route.paramMap.get('id');

        if (id !== 'new') {
            return this._requestService.getById('Request', 'Requests', id, 'requestTemplate, purpose, deliveryMode, status, requestContacts.contact, requestDeliveryContacts.contact, sourceMaterials.domain, sourceMaterials.material, sourceMaterials.sourceLanguages.language, sourceMaterials.jobs.jobContacts, sourceMaterials.jobs.jobMaterials.material, sourceMaterials.jobs.service.unit, sourceMaterials.jobs.targetLanguage, referenceSet.references.material, referenceSet.references.referenceLanguages, sourceMaterials.jobs.jobStatus, sourceMaterials.jobs.scopingInfo, blockAutomationJustification, sourceMaterials.confidentiality', true) as Observable<Request>;
        } else {
            let promise = new Promise<any>((resolve, reject) => {
                resolve(this._requestService.create());
            });

            return Observable.fromPromise(promise);
        }
    }
}