import { RequestService } from './services/request.service';
import { CanActivateChild, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class InitGuard implements CanActivate {

    constructor(private _requestService: RequestService) {
    }

    /**
     * The request jobs is only accessible when the request is in DRAFT or MarkToSend status
     */
    canActivate(): boolean {
        return this._requestService.currentRequest.status.code === 'DRAF' || this._requestService.currentRequest.status.code === 'MTS';
    }
}
