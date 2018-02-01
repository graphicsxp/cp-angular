import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
        ToasterModule,
        MultiSelectModule,
        DropdownModule
    ],

    declarations: [
        AppComponent
    ],
    providers: [
        EntityManagerService,
        CustomValidatorService,
        CanDeactivateGuard,
        { provide: APP_INITIALIZER, useFactory: onAppInit, multi: true, deps: [EntityManagerService] }
    ],
    bootstrap: [AppComponent],
})

export class AppModule {

}
