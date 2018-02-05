import { RequestTemplate } from './../../model/breeze/entity-model';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { TemplateService } from '../templates.service';

@Injectable()
export class RequestTemplateResolver implements Resolve<RequestTemplate> {

    constructor(private _templateService: TemplateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RequestTemplate> {

        let id = route.paramMap.get('id');

        if (id !== 'new') {

            return this._templateService.getById('RequestTemplate',
                'RequestTemplates',
                id,
                null,
                true) as Observable<RequestTemplate>;
        } else {
            let promise = new Promise<any>((resolve, reject) => {
                resolve(this._templateService.create());
            });

            return Observable.fromPromise(promise);
        }
    }
}