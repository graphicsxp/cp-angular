import { DialogRef, DialogService, DialogAction } from '@progress/kendo-angular-dialog';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntityManagerService } from '../entity-manager.service';
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    constructor(private _entityManagerService: EntityManagerService, private _dialogService: DialogService) { }

    canDeactivate(component: CanComponentDeactivate) {
        return new Promise<boolean>((resolve, reject) => {
            if (component.canDeactivate) {
                return component.canDeactivate();
            } else if(this._entityManagerService.hasChanges()) {
                const dialog: DialogRef = this._dialogService.open({
                    title: 'Please confirm',
                    content: 'Are you sure you want to cancel your changes ?',
                    actions: [
                        { text: 'Yes', primary: true },
                        { text: 'No' }
                    ]
                });

                dialog.result.subscribe((result) => {
                    const dialogAction: DialogAction = result as DialogAction
                    if (dialogAction.primary) {
                        this._entityManagerService.em.rejectChanges();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            } else {
                resolve(true);
            }
        });
    }
}
