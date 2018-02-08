import { Pipe, PipeTransform } from '@angular/core';

import { Request, Contact, RequestContact } from '../../model/breeze/entity-model';
@Pipe({
    name: 'requestcontactsconcat'
})

/**
 * Returns a coma-separated concatenation of all contacts of the given Request
 */
export class RequestContactsConcatPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        const requestContacts = value as RequestContact[];
        let result = '';
        if (requestContacts) {
            let first = true;
            requestContacts.forEach(rc => {
                if (!first) {
                    result += ', ';
                }
                first = false;
                result += rc.contact.firstName + ' ' + rc.contact.lastName;
            });
        }
        return result;
    }
}
