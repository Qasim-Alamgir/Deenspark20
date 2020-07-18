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
  subAlert: boolean = false;
  admin;
  nextdate;

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
          console.log(response.status)
          if(response.status == "Incorrect"){
            this.errAlert = true;
            this.error = "Email is incorrect";
          }else if(response.status == "error"){ 
            this.errAlert = true;   
            this.error = "Password is incorrect";       
          }else if(response.status == "activate"){
            this.errAlert = true;
            this.error = "Please Activate your account to Log In";
          }else if(response.status.order !== null){
            delete response.status.password;
            localStorage.setItem("login_data", JSON.stringify(response.status));
            this._authservice.transaction(response.status.order).subscribe(
              (response) => {
                console.log(response.status)
                if(response.status == 'ACTIVE'){
                  var convertNextBillingDate = new Date(response.billing_info.next_billing_time)
                  var next_billing_time = convertNextBillingDate.toLocaleDateString()
                  var nd = new Date()
                  nd.setDate(nd.getDate()+1);
                  let obj = {
                    nextday : nd,
                    next_billing_time : next_billing_time
                  }
                  localStorage.setItem("date", JSON.stringify(obj));
                  this.subAlert = false;
                  this.reminderEmail(next_billing_time)
                  this.router.navigate(['/'])
                  this.localstorage();
                  this.login.reset();
                  this.closebtn.nativeElement.click();
                }else{
                  this.localdata = {};
                  localStorage.removeItem('login_data');
                  localStorage.removeItem('date');
                  this.admin = ''
                  this.localstorage();
                  this.subAlert = true;
                  this.error = 'Your Subscription is Cancelled. Subscribe again to continue.'
                  this.login.reset();
                }
              })
          }
        });
      }
  }

  profile(){
    if(this.localdata.password == 'admin'){
      this.router.navigate(['/dashboard/admin/addproduct'])  
    }else{
    this.router.navigate(['/dashboard/admin/profile',this.localdata._id])
  }
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
    localStorage.removeItem('date');
    this.admin = ''
    this.localstorage();
    this.router.navigate(['/'])
  }

  closeAlert(){
    this.alert;
    this.errAlert;
    this.subAlert;
  }

  localstorage(){
    this.localdata = (JSON.parse(localStorage.getItem("login_data")));
    if(this.localdata !== undefined && this.localdata !== null && this.localdata.password !== "admin"){
      this.loginbtn = 'My Profile';
      this.signupbtn = 'logout';
    }else if(this.localdata !== undefined && this.localdata !== null && this.localdata.password == "admin"){
      this.loginbtn = 'Dashboard';
      this.signupbtn = 'logout';
    }
    else{
      this.loginbtn = 'Log In';
      this.signupbtn = 'Sign Up';
    }
  }
  
getTokan(){
  this._authservice.getTokan().subscribe(
    (response) => {
      console.log(response)
    })
}

reminderEmail(next_billing_time){
      var ts = new Date();
      var td = ts.toLocaleDateString();
      var d = new Date(next_billing_time);
      d.setDate(d.getDate()-7);
      var convertReminderDate = new Date(d)
      var reminderDate = convertReminderDate.toLocaleDateString()
      if(td >= reminderDate){
        this._authservice.reminderEmail(this.localdata.email,next_billing_time).subscribe(
          (response) => {
            console.log(response)
          })
      }
}

autologout(){
  if (this.nextdate !== null){
  var td = new Date();
  var todaydate = td.toLocaleDateString()
  var nd = new Date(this.nextdate.nextday)
  var nextdate = nd.toLocaleDateString()
    if(todaydate >= nextdate){
      this.logout();
    }
  }
}

  ngOnInit(): void {
    this.nextdate = (JSON.parse(localStorage.getItem("date")));
    this.localstorage();
    this.getTokan();
    this.autologout();
    
  }

}
