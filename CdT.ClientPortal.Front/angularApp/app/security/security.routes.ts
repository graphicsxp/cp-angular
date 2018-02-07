import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        //        path: '', canActivateChild: [InitGuard], children: [
        path: '', children: [
            { path: 'security/login', component: LoginComponent },
        ]
    }
];

export const SecurityRoutes = RouterModule.forChild(routes);
