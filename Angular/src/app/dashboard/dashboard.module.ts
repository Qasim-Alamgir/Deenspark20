import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { SubscriptionComponent } from './subscription/subscription.component';



@NgModule({
  declarations: [DashboardComponent, AddproductComponent, CategoryComponent, ProfileComponent, UsersComponent, ReportsComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatVideoModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
