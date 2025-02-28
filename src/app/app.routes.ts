import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileSelectorComponent } from './pages-custom/file-selector/file-selector.component';
import { FormConclusionComponent } from './pages-custom/form-conclusion/form-conclusion.component';
import { TableComponent } from './dynamic-forms/components-dynamic/table/table.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: DashboardComponent, children:
        [
            {path: 'documentos', component: FileSelectorComponent},
            {path: 'conclusion', component: FormConclusionComponent},
            {path: 'gestion/:entity', component: TableComponent},
        ],
    }
];
