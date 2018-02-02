import { TemplatesModule } from './../templates/templates.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../grid-helpers/grid-helpers.module';
import { AgencyRoutes } from './agency.routes';

import { UserService } from './users.service';
import { UsersListComponent} from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    AgencyRoutes,
    SharedModule,
  ],
  declarations: [
    UsersListComponent,
    UserDetailsComponent
  ],
  providers: [UserService],
})
export class AgencyModule { }
