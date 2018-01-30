import { TemplatesListComponent } from './templates-list/templates-list.component';
import { Routes, RouterModule } from '@angular/router';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { RequestTemplateResolver } from './template-detail/template-detail-resolver.service';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: TemplatesListComponent },
            { path: 'detail/:id', component: TemplateDetailComponent, resolve: { template: RequestTemplateResolver } },
        ]
    }
];

export const TemplatesRoutes = RouterModule.forChild(routes);
