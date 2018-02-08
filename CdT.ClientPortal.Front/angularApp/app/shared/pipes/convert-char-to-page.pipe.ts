import { Pipe, PipeTransform } from '@angular/core';

/**
 *   Purpose: Convert a number of char to pages with the correct rounding.
 *   @value (required): volume expressed in char
 */
@Pipe({
  name: 'convertCharToPage'
})
export class ConvertCharToPagePipe implements PipeTransform {

  transform(value: number, args?: any): number {
    if (value <= 0) { return 0; }
    const modulo = value % 750;
    const quotient = (value - modulo) / 1500;

    return modulo > 0 ? quotient + 0.5 : quotient;
  }
}
