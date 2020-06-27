import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';



@NgModule({
  declarations: [DashboardComponent, ProductlistComponent, AddproductComponent, CategoryComponent, ProfileComponent, UsersComponent, ReportsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatVideoModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
