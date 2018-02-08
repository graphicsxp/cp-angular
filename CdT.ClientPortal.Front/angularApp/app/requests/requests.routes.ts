import { RequestsListComponent } from './requests-list/requests-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestJobsComponent } from './request-jobs/request-jobs.component';
import { RequestDetailResolver } from './request-detail/request-detail-resolver.service';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard';
import { RequestJobsResolver } from './request-jobs/request-jobs-resolver.service';


const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            { path: '', component: RequestsListComponent },
            { path: 'requests', component: RequestsListComponent },
            { path: 'detail/:id', component: RequestDetailComponent, resolve: { request: RequestDetailResolver }, canDeactivate: [CanDeactivateGuard] },
            { path: 'detail/:id/jobs', component: RequestJobsComponent, resolve: { request: RequestJobsResolver } }
        ]
    }
];

export const RequestsRoutes = RouterModule.forChild(routes);
