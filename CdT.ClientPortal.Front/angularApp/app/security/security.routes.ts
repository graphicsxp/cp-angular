import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            { path: 'security/login', component: LoginComponent },
            { path: 'security/profile', component: ProfileComponent },
        ]
    }
];

export const SecurityRoutes = RouterModule.forChild(routes);
