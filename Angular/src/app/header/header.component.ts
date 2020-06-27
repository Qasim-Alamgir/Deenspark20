import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Datatype} from '../auth/datatype';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closebtn')closebtn;
  login;
  error;
  loginbtn;
  signupbtn;
  localdata;
  resetpswrd;
  success;
  alert: boolean = false;
  errAlert: boolean = false;
  admin;

  constructor(
    private fb : FormBuilder, 
    private _authservice: AuthService,
    private router: Router
  ) { 
    this.resetpswrd = fb.group({
      resetemail : ['',[Validators.required, Validators.email]]
    })
    this.login = fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['', [Validators.required]]
    })
  }
  get resetemail(){return this.resetpswrd.get('resetemail');}
  get email(){return this.login.get('email');}
  get password(){return this.login.get('password');}

  post(form){
      var login = new Datatype();
      login.email = this.login.value.email;
      login.password = this.login.value.password;
      if(login.email == 'admin@gmail.com' && login.password == 'admin'){
        localStorage.setItem("login_data", JSON.stringify(login));
        this.admin = "admin";
        this.localstorage();
        this.login.reset();
        this.closebtn.nativeElement.click();
        this.router.navigate(['/dashboard/admin/addproduct']);
      }else{
      this._authservice.userLogin(login).subscribe(
        (response) => {
          console.log(response)
          if(response.status == "Incorrect"){
            this.errAlert = true;
            this.error = "Email is incorrect";
          }else if(response.status == "error"){ 
            this.errAlert = true;   
            this.error = "Password is incorrect";       
          }else if(response.status == "activate"){
            this.errAlert = true;
            this.error = "Please Activate your account to Log In";
          }else{
            delete response.status.password;
            localStorage.setItem("login_data", JSON.stringify(response.status));
            this.router.navigate(['/'])
            this.localstorage();
            this.login.reset();
            this.closebtn.nativeElement.click();
          }
        });
      }
  }

  profile(){
    this.router.navigate(['/dashboard/admin/profile',this.localdata._id])
  }
  RequestResetUser(form){
    var reset = new Datatype();
    reset.email = this.resetpswrd.value.resetemail;
    console.log(reset.email)
      this._authservice.reset(reset).subscribe(
        (response) => {
          console.log(response)
          if(response.status == "sent"){
            this.errAlert = false;
            this.alert = true;
            this.success = 'Password is sent to your provided Email';
            this.resetpswrd.reset();
          }else{
            this.errAlert = true;
            this.error = "Incorrect Email"
          }
        });
  }
  register(){
      this.router.navigate(['/auth/register'])
  }
  logout(){
    this.localdata = {};
    localStorage.removeItem('login_data');
    this.router.navigate(['/'])
    this.localstorage();
  }

  closeAlert(){
    this.alert;
    this.errAlert;
  }

  localstorage(){
    this.localdata = (JSON.parse(localStorage.getItem("login_data")));
    if(this.localdata !== undefined && this.localdata !== null){
      this.loginbtn = 'My Profile';
      this.signupbtn = 'logout';
    }
    else {
      this.loginbtn = 'Log In';
      this.signupbtn = 'Sign Up';
    }
  }
  
  ngOnInit(): void {
    this.localstorage();
  }

}
