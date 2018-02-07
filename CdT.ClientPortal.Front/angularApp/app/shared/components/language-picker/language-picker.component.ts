import * as _ from 'underscore';
import { Component, Output, EventEmitter } from '@angular/core';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';
import { Input } from '@angular/core';
import { Language } from '../../../model/breeze/language';
import { EntityManagerService } from '../../../entity-manager.service';

@Component({
    selector: 'language-picker',
    templateUrl: 'language-picker.component.html'
})

export class LanguagePickerComponent {
    @Input() public model: Language[];
    @Input() public languages: LanguagePickerModel[];
    @Input() public source: Language[];
    @Input() public selectedLanguages: Language[];
    @Input() public index: number;

    constructor(public entityManagerService: EntityManagerService) { 
    }

    ngInit() {
        this.lookupLanguages = this.entityManagerService.getLookup('languages') as Language[];

        this.lookupLanguages.forEach(function (language: Language) {
            let newLanguage: LanguagePickerModel = {
                id: language.id,
                code: language.code,
                defaultLabel: language.defaultLabel,
                isChecked: false,
                isEU: language.isEULanguage,
                isDisabled: this.isLanguageDisabled(language.code),
                abbreviation: language.abbreviation
            };

            this.languages.push(newLanguage);
        });

        if (this.selectedLanguages) {
            $scope.$watchCollection('selectedLanguages', function (n, o) {
                //$watchCollection is currenlty buggy https://github.com/angular/angular.js/issues/2621
                //if (n !== o) {
                if (this.selectedLanguages.length === 1 && _.includes(_.map(this.model, 'code'), this.selectedLanguages[0].code)) {
                    var codes = _.map(this.model, 'code');
                    var index = _.indexOf(codes, this.selectedLanguages[0].code);
                    if (index > -1) {
                        this.model.splice(index, 1);
                    }
                }
                this.syncLanguagesWithModel();
                //}
            });

            // two way binding
            $scope.$watchCollection('model', function (n, o) {
                //$watchCollection is currenlty buggy https://github.com/angular/angular.js/issues/2621
                //if (n !== o) {
                this.syncLanguagesWithModel();
                //}
            });
        }

        // initial load
        this.syncLanguagesWithModel();
    }

    private show: Boolean = false;
    private regionFilter = { 'region': 'eu' };
    private lookupLanguages: Language[];

    showLanguagePicker(event, overlaypanel: OverlayPanel) {
        overlaypanel.toggle(event);
    }

    isLanguageDisabled(code: string): Boolean {
        if (this.selectedLanguages && this.selectedLanguages.length > 0) {
            return this.selectedLanguages.length > 1 && this.selectedLanguages[0].code === code;
        }

        return this.source && this.source.length === 1 && this.source[0].code === code;
    }

    singleSelection(language: Language) {
        this.languages.forEach(function (_lang) {
            if (_lang.code !== language.code)
                _lang.isChecked = false;
        });
    }

    syncLanguagesWithModel() {
        this.languages.forEach(function (lang) {
            lang.isChecked = false;
            this.disabledLanguages.forEach(function (selectedLanguage) {
                if (selectedLanguage && lang.code === selectedLanguage.code) {
                    lang.isChecked = true;
                }
            });
            lang.isDisabled = this.isLanguageDisabled(lang.code);
        });
    }

    applySelection() {
        this.model.length = 0;
        this.languages.forEach(function (lang) {
            if (lang.isChecked) {
                var language = this.lookupLanguages.filter(function (el) {
                    return el.code === lang.code;
                });
                this.model.push(language[0]);
                lang.isDisabled = this.isLanguageDisabled(language[0].code);
                // if a method is specified, call it
                if (this.method) {
                    this.method()(language[0]);
                }
            }
        });
        this.show = false;
    }

    changeAll(checked: Boolean) {
        switch (this.regionFilter.region) {
            case 'all':
                this.languages.forEach(function (lang) {
                    if (!lang.isDisabled) {
                        lang.isChecked = checked;
                    }
                });
                break;
            case 'eu':
                this.languages.forEach(function (lang) {
                    if (lang.isEU) {
                        if (!lang.isDisabled) {
                            lang.isChecked = checked;
                        }
                    }
                });
                break;
            case 'noneu':
                this.languages.forEach(function (lang) {
                    if (!lang.isEU) {
                        if (!lang.isDisabled) {
                            lang.isChecked = checked;
                        }
                    }
                });
                break;
        }
    }
}

export class LanguagePickerModel {
    id: string;
    code: string;
    defaultLabel: string;
    isChecked: Boolean;
    isEU: Boolean;
    isDisabled: Boolean;
    abbreviation: string;
}
