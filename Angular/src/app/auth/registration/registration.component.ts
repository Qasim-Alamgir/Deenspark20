import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder,AbstractControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Datatype} from '../datatype';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {

  register;
  user_data;
  error;
  alert: boolean = false;
  errAlert: boolean = false;

  constructor(
    private fb : FormBuilder,
    private _authservice: AuthService,
    private router: Router
  ) { 
    this.register = fb.group({
      fname : ['',[Validators.required]],
      lname : ['',[Validators.required]],
      email : ['',[Validators.required,  Validators.email]],
      address : ['',[Validators.required]],
      password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword : ['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    },{validator: this.passwordConfirming})
  }

  get fname(){return this.register.get('fname');}
  get lname(){return this.register.get('lname');}
  get email(){return this.register.get('email');}
  get address(){return this.register.get('address');}
  get password(){return this.register.get('password');}
  get confirmPassword(){return this.register.get('confirmPassword');}


  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  post(form){
    var user = new Datatype();
    user.fname = this.register.value.fname;
    user.lname = this.register.value.lname;
    user.email = this.register.value.email;
    user.address = this.register.value.address;
    user.password = this.register.value.password;
    this._authservice.registeration(user).subscribe(
      (response) => {
        console.log(response);
        if(response.status == "Email Already exist"){
          this.errAlert = true;
          this.error = "Email Already exist"
        }else{
          this.error = null;
          this.errAlert = false;
          this.register.reset();
          this.user_data = user;
          this.alert = true;
        }
      }
  )}

  resendCode(){
    console.log(this.user_data);
    this._authservice.registeration(this.user_data).subscribe(
      (response) => {
        console.log(this.user_data);
    })
  }

  closeAlert(){
    this.alert;
    this.errAlert;
  }
  
  ngOnInit(): void {
  }

}
