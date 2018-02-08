import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * Splits an array of elements and concatenate them using the given separator.
*/
@Pipe({
  name: 'splitArrayToString',
  pure: false
})
export class SplitArrayToStringPipe implements PipeTransform {

  transform(value: Array<any>, field: string, separator: string, sort?: Boolean, reverse?: Boolean): any {
    if (value && value.length > 0) {
      let data = _.chain(value).map(field);
      if (sort) {
        if (reverse) {
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
