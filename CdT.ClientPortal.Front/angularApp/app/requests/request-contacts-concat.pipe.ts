import { Pipe, PipeTransform } from '@angular/core';

import { Request, Contact, RequestContact } from '../model/entity-model';
@Pipe({
    name: 'requestcontactsconcat'
})

export class RequestContactsConcat implements PipeTransform {
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