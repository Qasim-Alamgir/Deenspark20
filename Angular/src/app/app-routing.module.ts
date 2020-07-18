import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AnimationlistComponent} from './animationlist/animationlist.component';
import {WatchComponent} from './watch/watch.component';


const routes: Routes = [
  {path : 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path : '', component : HomeComponent},
  {path : 'list/:catvalue', component : AnimationlistComponent},
  {path : 'watch/:id', component : WatchComponent},
];

@NgModule({
  // , { useHash: true }
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
