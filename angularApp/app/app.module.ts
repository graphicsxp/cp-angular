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
import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { onAppInit } from './app.init';
import { EntityManagerService } from './entity-manager.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        FormsModule,
        HttpClientModule,
        HttpModule,
        BreezeBridgeAngularModule,
        SharedModule,
        CoreModule.forRoot(),
        HomeModule,
        DialogModule
    ],

    declarations: [
        AppComponent
    ],
    providers: [
        EntityManagerService,
        { provide: APP_INITIALIZER, useFactory: onAppInit, multi: true, deps: [EntityManagerService] }
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
 
}