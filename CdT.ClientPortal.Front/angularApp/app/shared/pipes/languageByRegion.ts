import * as _ from 'underscore';
import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../model/breeze/language';

@Pipe({name: 'languageByRegion'})
export class LanguageByRegion implements PipeTransform {
  transform(languages: Language[], region: string): Language[] {
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