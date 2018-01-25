import { RequestDetailResolver } from './request-detail/request-detail-resolver.service';
import { RequestContactsConcat } from './request-contacts-concat.pipe';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { RequestsRoutes } from './requests.routes';
import { RequestService } from './requests.service';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestJobsComponent } from './request-jobs/request-jobs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    RequestsRoutes
  ],
  declarations: [
    RequestsListComponent,
    RequestContactsConcat,
    RequestDetailComponent,
    RequestJobsComponent
  ],
  providers: [RequestService, /*InitGuard,*/ RequestDetailResolver],
})
export class RequestsModule { }
