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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    RequestsRoutes,
    SharedModule
    // TemplatesModule
  ],
  declarations: [
    RequestsListComponent,
    RequestContactsConcat,
    RequestDetailComponent,
    RequestJobsComponent,
    SourceMaterialsListComponent,
    SourceMaterialsListItemComponent,
    SourceMaterialConfidentialityComponent
  ],
  providers: [RequestService, SourceMaterialService, /*InitGuard,*/ RequestDetailResolver],
})
export class RequestsModule { }
