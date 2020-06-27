import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Datatype} from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  login;
  error;
  
  constructor(
    private fb : FormBuilder, 
    private _authservice: AuthService,
    private router: Router) {
    this.login = fb.group({
      uname : ['',[Validators.required]],
      password : ['', [Validators.required]]
    })
   }

   get uname(){return this.login.get('uname');}
   get password(){return this.login.get('password');}

   post(form){
    console.log(this.login.value)
    var admin = new Datatype();
    admin.uname = this.login.value.uname;
    admin.password = this.login.value.password;
    this._authservice.authetication(admin).subscribe(
      (response) => {
        console.log(response)
        if(response.status == "ok" && response.canlogin == "yes"){
          admin.canlogin = response.canlogin;
          localStorage.setItem("login_data", JSON.stringify(admin));
          this.router.navigate(['/dashboard']);
        }else{
          this.error = "Username or Password is incorrect";
        }
        console.log(response)
      }
    );
  }
  

  ngOnInit(): void {
    let localdata = (JSON.parse(localStorage.getItem("login_data")));
    if(localdata !== undefined && localdata !== null && localdata.canlogin == "yes"  ){
      this.router.navigate(['/dashboard']);
    }
  }
}
