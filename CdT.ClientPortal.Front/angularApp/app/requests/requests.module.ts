import { RequestPrice } from './pipes/request-price.pipe';
import { MomentModule } from 'angular2-moment';
import { RequestJobsResolver } from './request-jobs/request-jobs-resolver.service';
import { TemplatesModule } from './../templates/templates.module';
import { SharedModule } from './../shared/shared.module';
import { RequestDetailResolver } from './request-detail/request-detail-resolver.service';
import { RequestContactsConcat } from './request-contacts-concat.pipe';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { RequestsRoutes } from './requests.routes';
import { RequestService } from './services/request.service';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestJobsComponent } from './request-jobs/request-jobs.component';
import { SourceMaterialsListComponent } from './source-materials-list/source-materials-list.component';
import { SourceMaterialsListItemComponent } from './source-materials-list-item/source-materials-list-item.component';
import { SourceMaterialService } from './services/source-material.service';
import { SourceMaterialConfidentialityComponent } from './source-material-confidentiality/source-material-confidentiality.component';
import { RequestHeaderComponent } from './request-header/request-header.component';
import { RequestJobsHeaderComponent } from './request-jobs/request-jobs-header/request-jobs-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    RequestsRoutes,
    SharedModule,
    MomentModule
    // TemplatesModule
  ],
  declarations: [
    RequestsListComponent,
    RequestContactsConcat,
    RequestPrice,
    RequestDetailComponent,
    RequestJobsComponent,
    SourceMaterialsListComponent,
    SourceMaterialsListItemComponent,
    SourceMaterialConfidentialityComponent,
    RequestHeaderComponent,
    RequestJobsHeaderComponent
  ],
  providers: [RequestService, SourceMaterialService, /*InitGuard,*/ RequestDetailResolver, RequestJobsResolver],
})
export class RequestsModule { }
