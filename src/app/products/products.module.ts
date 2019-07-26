import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './products.component';
import { ProductsRoutes } from './products.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './../services/products.service';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ProductsRoutes)
  ],
  providers: [
    ProductsService
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
