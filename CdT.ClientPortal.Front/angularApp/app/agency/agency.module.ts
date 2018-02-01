import { TemplatesModule } from './../templates/templates.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { AgencyRoutes } from './agency.routes';

import { AgencyService } from './agency.service';
import { UserNewComponent } from './user.new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    AgencyRoutes,
    SharedModule,
  ],
  declarations: [
    UserNewComponent
  ],
  providers: [AgencyService],
})
export class AgencyModule { }
