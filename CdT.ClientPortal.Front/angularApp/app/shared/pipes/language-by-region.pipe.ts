import { Language } from './../../model/breeze/language';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * Filter languages by EU/NonEU regions
 */
@Pipe({
  name: 'languageByRegion'
})
export class LanguageByRegionPipe implements PipeTransform {

  transform(languages: Language[], region: string): any {
    if (!region || (region !== 'eu' && region !== 'noneu' && region !== 'all')) {
      throw new Error('region must be eu or noneu or all');
    }
    switch (region) {
      case 'all':
        return languages;
      case 'eu':
        return _.filter(languages, { 'isEULanguage': true });
      case 'noneu':
        return _.filter(languages, { 'isEULanguage': false });
    }
  }
}
