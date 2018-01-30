import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'requests', loadChildren: './requests/requests.module#RequestsModule' },
    { path: 'templates', loadChildren: './templates/templates.module#TemplatesModule' },
];

export const AppRoutes = RouterModule.forRoot(routes);
