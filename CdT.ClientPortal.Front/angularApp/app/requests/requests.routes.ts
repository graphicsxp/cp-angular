import { RequestsListComponent } from './requests-list/requests-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestJobsComponent } from './request-jobs/request-jobs.component';
import { RequestDetailResolver } from './request-detail/request-detail-resolver.service';


const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            { path: '', component: RequestsListComponent },
            { path: 'requests', component: RequestsListComponent },
            { path: 'detail/:id', component: RequestDetailComponent, resolve: { request: RequestDetailResolver } },
            { path: 'detail/:id/jobs', component: RequestJobsComponent }
        ]
    }
];

export const RequestsRoutes = RouterModule.forChild(routes);
