import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../model/breeze/language';

@Pipe({ name: 'splitArrayToString', pure: false })
export class SplitArrayToStringPipe implements PipeTransform {
    transform(languages: Language[], field: string, separator: string, sort?: Boolean, reverse?: Boolean): Language[] {
        if (languages && languages.length > 0) {
            let data = _.chain(languages).map(field);
            if (sort && sort === true) {
                if (reverse && (reverse === true)) {
                    data = data.orderBy([0], ['desc']);
                } else {
                    data = data.orderBy();
                }
            }
            let sep = ', ';
            if (separator) {
                sep = separator;
            }
            return data.value().join(sep);
        }
    }
}