import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { NamingConvention } from 'breeze-client';
import { BreezeBridgeHttpClientModule } from 'breeze-bridge2-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { onAppInit } from './app.init';
import { EntityManagerService } from './entity-manager.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard';
import { CustomValidatorService } from './shared/services/custom-validator.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SecurityModule } from './security/security.module';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/en';
import localeFrExtra from '@angular/common/locales/extra/en';
import { IntlModule } from '@progress/kendo-angular-intl';
// Load all required data for the bg locale
import '@progress/kendo-angular-intl/locales/fr/all';
registerLocaleData(localeFr, 'en-GB', localeFrExtra);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        FormsModule,
        HttpClientModule,
        HttpModule,
        BreezeBridgeHttpClientModule,
        SharedModule,
        CoreModule.forRoot(),
        HomeModule,
        DialogModule,
        ConfirmDialogModule,
        ToasterModule,
        MultiSelectModule,
        DropdownModule,
        SecurityModule,
        IntlModule
    ],

    declarations: [
        AppComponent
    ],
    providers: [
        EntityManagerService,
        CustomValidatorService,
        CanDeactivateGuard,
        ConfirmationService,
        { provide: APP_INITIALIZER, useFactory: onAppInit, multi: true, deps: [EntityManagerService] },
        { provide: LOCALE_ID, useValue: 'en-GB' },
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}
