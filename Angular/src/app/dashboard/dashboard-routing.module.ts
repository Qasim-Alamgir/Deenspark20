import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {AddproductComponent} from './addproduct/addproduct.component';
import {ProductlistComponent} from './productlist/productlist.component';
import {CategoryComponent} from './category/category.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {ReportsComponent} from './reports/reports.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: ""
  },
  {path : 'admin', component : DashboardComponent,
    children : [
      {path : 'addproduct', component : AddproductComponent},
      {path : 'productlist', component : ProductlistComponent}, 
      {path : 'category', component : CategoryComponent},
      {path : 'profile/:id', component : ProfileComponent},
      {path : 'users', component : UsersComponent},
      {path : 'reports', component : ReportsComponent},
    ]
},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
