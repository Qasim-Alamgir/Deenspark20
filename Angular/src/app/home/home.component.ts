import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Datatype} from '../auth/datatype';
import {DashboardService} from '../dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {
  login;
  catlist;
  
  constructor(
    private fb : FormBuilder, 
    private _dashboardservice : DashboardService,
    private _authservice: AuthService,
    private router: Router
  ) { 
    this.login = fb.group({
      email : ['',[Validators.required]],
      password : ['', [Validators.required]]
    })
  }

  get email(){return this.login.get('email');}
  get password(){return this.login.get('password');}

  post(form){
    console.log(this.login.value)
    var login = new Datatype();
    login.email = this.login.value.email;
    login.password = this.login.value.password;
    this._authservice.userLogin(login).subscribe(
      (response) => {
        console.log(response)
      }
    );
  }

  getCat(id,catvalue){
    console.log(catvalue);
    console.log(id)
    this.router.navigate(['/list', catvalue])
    
  }

  getCategory(){
    this._dashboardservice.getCategory().subscribe(
      (response) => {
        this.catlist = response;
        console.log(this.catlist[0].catname)
      });
    }

  ngOnInit(): void {
    this.getCategory();
  }

}
