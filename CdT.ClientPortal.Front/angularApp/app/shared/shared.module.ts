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
import { MultiselectComponent } from './components/multiselect/multiselect.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        GridHelpersModule
    ],

    declarations: [
        NavigationComponent,
        CustomFooterComponent,
        DataFieldInputComponent,
        DataFieldSelectComponent,
        ValidatorComponent,
        MultiselectComponent,
        MultiselectComponent
    ],

    exports: [
        NavigationComponent,
        CustomFooterComponent,
        DataFieldInputComponent,
        DataFieldSelectComponent,
        ValidatorComponent,
        MultiselectComponent
    ]    
})

export class SharedModule { }
