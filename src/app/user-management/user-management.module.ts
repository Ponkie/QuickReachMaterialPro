import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserManagementRoutes } from './user-management.routing';
import { AdministratorsComponent } from './administrators/administrators.component';
import { VendorsComponent } from './vendors/vendors.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(UserManagementRoutes)
  ],
  declarations: [
    AdministratorsComponent,
    VendorsComponent
  ]
})
export class UserManagementModule { }
