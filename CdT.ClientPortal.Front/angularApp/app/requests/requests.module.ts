import { TemplatesModule } from './../templates/templates.module';
import { SharedModule } from './../shared/shared.module';
import { RequestDetailResolver } from './request-detail/request-detail-resolver.service';
import { RequestContactsConcat } from './request-contacts-concat.pipe';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadModule } from '@progress/kendo-angular-upload';

import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { RequestsRoutes } from './requests.routes';
import { RequestService } from './requests.service';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestJobsComponent } from './request-jobs/request-jobs.component';
import { SourceMaterialsListComponent } from './source-materials-list/source-materials-list.component';
import { SourceMaterialsListItemComponent } from './source-materials-list-item/source-materials-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    RequestsRoutes,
    SharedModule,
    UploadModule
    // TemplatesModule
  ],
  declarations: [
    RequestsListComponent,
    RequestContactsConcat,
    RequestDetailComponent,
    RequestJobsComponent,
    SourceMaterialsListComponent,
    SourceMaterialsListItemComponent
  ],
  providers: [RequestService, /*InitGuard,*/ RequestDetailResolver],
})
export class RequestsModule { }
