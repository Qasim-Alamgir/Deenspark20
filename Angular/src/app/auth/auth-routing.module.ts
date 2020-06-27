import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './registration/registration.component';
import {ActivateComponent} from './activate/activate.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: ""
  },
  {path : '', component : AuthComponent,
    children : [
      {path : 'login', component : LoginComponent},
      {path : 'register', component : RegistrationComponent},
      {path : 'activate/:token', component : ActivateComponent}
    ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
