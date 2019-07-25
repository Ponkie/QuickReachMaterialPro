import { Routes } from '@angular/router';

import { AdministratorsComponent } from './administrators/administrators.component';

export const UserManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'administrators',
                component: AdministratorsComponent
            }
        ]
    }
]