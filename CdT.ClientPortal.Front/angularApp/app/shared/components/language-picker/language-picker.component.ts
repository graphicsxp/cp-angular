import * as _ from 'underscore';
import { Component, Output, EventEmitter, IterableDiffers, DoCheck, IterableDiffer, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';
import { Input } from '@angular/core';
import { Language } from '../../../model/breeze/language';
import { EntityManagerService } from '../../../entity-manager.service';

@Component({
    selector: 'language-picker',
    templateUrl: 'language-picker.component.html'
})

export class LanguagePickerComponent implements OnInit, DoCheck {
    private regionFilter = { 'region': 'eu' };
    private lookupLanguages: Language[];
    private _differ: IterableDiffer<any>;
    private _differModel: IterableDiffer<any>;
    private _initialized: Boolean = false;

    @Input() public model: Language[] = [];
    @Input() public icon: String = 'icon';
    @Input() public selectedLanguages: Language[] = [];
    @Input() public index: number;
    @Input() public languages: Language[] = [];
    @Input() public source: Language[] = [];
    @Input() public singleLanguage: Boolean;
    @Output() public method: EventEmitter<any> = new EventEmitter();
    @Output() public changedCallback: EventEmitter<any> = new EventEmitter();

    constructor(public entityManagerService: EntityManagerService, public _iterableDiffers: IterableDiffers) { }

    ngDoCheck() {
        const selectedLanguagesChanges = this._differ.diff(this.selectedLanguages);
        const modelChanges = this._differModel.diff(this.model);

        // If any model changes, sync the select languages
        if (!this._initialized && (selectedLanguagesChanges || modelChanges)) {
            this.syncLanguagesWithModel();
        } else {
            this._initialized = true;
        }
    }

    ngOnInit() {
        this.lookupLanguages = this.entityManagerService.getLookup('languages') as Language[];
        this._differ = this._iterableDiffers.find([]).create(null);
        this._differModel = this._iterableDiffers.find([]).create(null);

        for (const language of this.lookupLanguages) {
            const newLanguage: Language = new Language();

            newLanguage.id = language.id;
            newLanguage.code = language.code;
            newLanguage.defaultLabel = language.defaultLabel;
            newLanguage.isChecked = false;
            newLanguage.isEULanguage = language.isEULanguage;
            newLanguage.isDisabled = this.isLanguageDisabled(language.code);
            newLanguage.abbreviation = language.abbreviation;

            this.languages.push(newLanguage);
        }
        this.syncLanguagesWithModel();
    }

    showLanguagePicker(event, overlaypanel: OverlayPanel) {
        overlaypanel.show(event);
    }

    closeLanguagePicker(overlaypanel: OverlayPanel) {
        overlaypanel.hide();
    }

    isLanguageDisabled(code: string): Boolean {
        if (this.selectedLanguages && this.selectedLanguages.length > 0) {
            return this.selectedLanguages.length > 1 && this.selectedLanguages[0].code === code;
        }

        return this.source && this.source.length === 1 && this.source[0].code === code;
    }

    singleSelection(language: Language) {
        this.languages.forEach(_lang => {
            if (_lang.code !== language.code) {
                _lang.isChecked = false;
            }
        });
    }

    syncLanguagesWithModel() {
        this.languages.forEach(lang => {
            lang.isChecked = false;
            this.model.forEach(selectedLanguage => {
                if (selectedLanguage && lang.code === selectedLanguage.code) {
                    lang.isChecked = true;
                }
            });
            lang.isDisabled = this.isLanguageDisabled(lang.code);
        });
    }

    applySelection(overlaypanel: OverlayPanel) {
        this.model.length = 0;
        this.languages.forEach(lang => {
            if (lang.isChecked) {
                const language = this.lookupLanguages.filter(function (el) {
                    return el.code === lang.code;
                });
                this.model.push(language[0]);
                lang.isDisabled = this.isLanguageDisabled(language[0].code);
                // if a method is specified, call it
                if (this.method) {
                    this.method.emit(language);
                }
            }
        });
        if (this.changedCallback) {
            this.changedCallback.emit(this.model);
        }
        overlaypanel.hide();
    }

    changeAll(checked: Boolean) {
        switch (this.regionFilter.region) {
            case 'all':
                this.languages.forEach(lang => {
                    if (!lang.isDisabled) {
                        lang.isChecked = checked;
                    }
                });
                break;
            case 'eu':
                this.languages.forEach(lang => {
                    if (lang.isEULanguage) {
                        if (!lang.isDisabled) {
                            lang.isChecked = checked;
                        }
                    }
                });
                break;
            case 'noneu':
                this.languages.forEach(lang => {
                    if (!lang.isEULanguage) {
                        if (!lang.isDisabled) {
                            lang.isChecked = checked;
                        }
                    }
                });
                break;
        }
    }
}

