import { RequestTemplate } from './../../model/entity-model';
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

        return this._templateService.getById('RequestTemplate',
            'RequestTemplates',
            id,
            null,
            true) as Observable<RequestTemplate>;
    }
}