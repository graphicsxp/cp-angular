import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * returns comma-separated values extracted from 'value'. If we pass properties in the args, then
 * the pipe will extract values from these properties instead.
 * ex:  ['EN', 'FR'] | languageCode  =>   EN, FR
 *      [ { language : { code: 'EN' }}, { language : { code : 'FR' }}] | languageCode: 'language.code'   => EN, FR
 */
@Pipe({
  name: 'joinArray'
})
export class JoinArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return };

    return value.map(v => args ? _.get(v, args) : v).join(', ');
  }
}
