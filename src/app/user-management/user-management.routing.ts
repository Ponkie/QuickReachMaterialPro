import { Routes } from '@angular/router';

import { AdministratorsComponent } from './administrators/administrators.component';
import { VendorsComponent } from './vendors/vendors.component'

export const UserManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'administrators',
                component: AdministratorsComponent
            },
            {
                path: 'vendors',
                component: VendorsComponent
            }
        ]
    }
]