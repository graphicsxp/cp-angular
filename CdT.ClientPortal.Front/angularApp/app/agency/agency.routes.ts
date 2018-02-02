import { RouterModule, Routes } from '@angular/router';
import { UserNewComponent } from './user.new.component';

const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            //{ path: '', component: UserNewComponent },
            { path: 'new', component: UserNewComponent },
        ]
    }
];

export const AgencyRoutes = RouterModule.forChild(routes);
