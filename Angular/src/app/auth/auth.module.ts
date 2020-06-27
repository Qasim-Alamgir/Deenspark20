import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './registration/registration.component';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [
    LoginComponent, 
    AuthComponent, 
    RegistrationComponent, ActivateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
