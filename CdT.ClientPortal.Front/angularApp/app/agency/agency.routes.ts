import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            { path: 'users', component: UsersListComponent },
            { path: 'detail/:id', component: UserDetailsComponent },

            // { path: 'requests', component: RequestsListComponent },
            // { path: 'detail/:id', component: RequestDetailComponent, resolve: { request: RequestDetailResolver }, canDeactivate: [CanDeactivateGuard] },
            // { path: 'detail/:id/jobs', component: RequestJobsComponent }
        ]
    }
];

export const AgencyRoutes = RouterModule.forChild(routes);
