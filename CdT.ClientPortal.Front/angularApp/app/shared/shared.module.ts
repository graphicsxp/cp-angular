import { GlobalService } from './services/global.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { GridHelpersModule } from './../grid-helpers/grid-helpers.module';
import { CanDeactivateGuard } from './can-deactivate-guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomFooterComponent } from './components/customfooter/customfooter.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { DataFieldInputComponent } from './components/data-field/data-field-input/data-field-input.component';
import { DataFieldSelectComponent } from './components/data-field/data-field-select/data-field-select.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { MultiSelectComponent } from './components/multiselect/multiselect.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { PhysicalFileService } from './services/physicalFile.service';
import { ExtensionIconPipe } from './pipes/extension-icon.pipe';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        GridHelpersModule,
        MultiSelectModule,
        UploadModule,
        OverlayPanelModule,
        ButtonModule
    ],

    declarations: [
        NavigationComponent,
        CustomFooterComponent,
        DataFieldInputComponent,
        DataFieldSelectComponent,
        ValidatorComponent,
        MultiSelectComponent,
        UploaderComponent,
        LanguagePickerComponent,
        ExtensionIconPipe
    ],

    providers: [
        GlobalService,
        PhysicalFileService
    ],
    exports: [
        NavigationComponent,
        CustomFooterComponent,
        DataFieldInputComponent,
        DataFieldSelectComponent,
        ValidatorComponent,
        MultiSelectComponent,
        MultiSelectModule,
        DropdownModule,
        UploaderComponent,
        LanguagePickerComponent,
        ExtensionIconPipe
    ]
})

export class SharedModule { }
