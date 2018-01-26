import { TemplatesRoutes } from './templates.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { RequestTemplateResolver } from './template-detail/template-detail-resolver.service';
import { TemplateService } from './templates.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    TemplatesRoutes
  ],
  declarations: [
    TemplatesListComponent,
    TemplateDetailComponent
  ],
  providers: [ TemplateService, RequestTemplateResolver ]
})
export class TemplatesModule { }
