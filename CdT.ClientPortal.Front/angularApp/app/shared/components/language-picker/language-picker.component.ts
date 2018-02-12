import { SourceMaterialLanguage } from './../../../model/breeze/source-material-language';
import { LookupNames } from './../../../model/lookups';
import * as _ from 'underscore';
import { Component, Output, EventEmitter, IterableDiffers, DoCheck, IterableDiffer, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';
import { Input } from '@angular/core';
import { Language } from '../../../model/breeze/language';
import { EntityManagerService } from '../../../entity-manager.service';

@Component({
    selector: 'cdt-language-picker',
    templateUrl: 'language-picker.component.html'
})

export class LanguagePickerComponent implements OnInit, DoCheck {
    private _differ: IterableDiffer<any>;
    private _differModel: IterableDiffer<any>;
    private _initialized: Boolean = false;
    private _lookupLanguages: Language[];

    public languages: Language[] = [];
    public regionFilter = { 'region': 'eu' };

    @ViewChild('overlayPanel') overlayPanel: OverlayPanel;

    @Input() public model: Language[] = [];
    @Input() public icon: String = 'icon';
    @Input() public selectedLanguages: Language[] = [];
    @Input() public index: number;
    @Input() public source: SourceMaterialLanguage[] = [];
    @Input() public singleLanguage: Boolean;
    @Output() public callback: EventEmitter<any> = new EventEmitter();
    @Output() public change: EventEmitter<any> = new EventEmitter();

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
        this._lookupLanguages = this.entityManagerService.getLookup(LookupNames.languages) as Language[];
        this._differ = this._iterableDiffers.find([]).create(null);
        this._differModel = this._iterableDiffers.find([]).create(null);

        for (const language of this._lookupLanguages) {
            const newLanguage: Language = Object.assign(new Language(), language);
            newLanguage.isDisabled = this.isLanguageDisabled(language.code);

            this.languages.push(newLanguage);
        }
        this.syncLanguagesWithModel();
    }

    showLanguagePicker(event) {
        this.overlayPanel.show(event);
    }

    closeLanguagePicker() {
        this.overlayPanel.hide();
    }

    isLanguageDisabled(code: string): Boolean {
        if (this.selectedLanguages && this.selectedLanguages.length > 0) {
            return this.selectedLanguages.length > 1 && this.selectedLanguages[0].code === code;
        }

        return this.source && this.source.length === 1 && this.source[0].language.code === code;
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

    applySelection() {
        this.model.length = 0;
        this.languages.forEach(lang => {
            if (lang.isChecked) {
                const language = this._lookupLanguages.filter(el => {
                    return el.code === lang.code;
                });
                this.model.push(language[0]);
                lang.isDisabled = this.isLanguageDisabled(language[0].code);
                // if a callback method is specified, call it
                if (this.callback) {
                    this.callback.emit(language[0]);
                }
            }
        });

        if (this.change) {
            this.change.emit(this.model);
        }

        this.overlayPanel.hide();
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

