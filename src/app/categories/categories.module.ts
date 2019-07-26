import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutes } from './categories.routing';
import { CategoriesService } from './../services/categories.service';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CategoriesRoutes)
  ],
  providers: [
    CategoriesService
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
