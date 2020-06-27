import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {FormBuilder,AbstractControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Datatype} from '../../auth/datatype';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {
localdata;
editUser;
firstName;
lastName;
userEmail;
userAddress;
userPassword;
changePassword;
error;
success;
successPass;
values;
alert: boolean = false;
errAlert: boolean = false;
successPassAlert: boolean = false;

  constructor(
    private fb : FormBuilder,
    private _authservice : AuthService,
    private router: Router
  ) {
    this.editUser = fb.group({
      fname : ['',[Validators.required]],
      lname : ['',[Validators.required]],
      address : ['',[Validators.required]],
      email : ['',[Validators.required,  Validators.email]],
    })
    this.changePassword = fb.group({
      oldPassword : ['',[Validators.required]],
      newPassword : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],
    },{validator: this.passwordConfirming})
   }
  get fname(){return this.editUser.get('fname');}
  get lname(){return this.editUser.get('lname');}
  get email(){return this.editUser.get('email');}
  get address(){return this.editUser.get('address');}
  get oldPassword(){return this.changePassword.get('oldPassword');}
  get newPassword(){return this.changePassword.get('newPassword');}
  get confirmPassword(){return this.changePassword.get('confirmPassword');}

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  editPassword(form){
    console.log(this.localdata._id)
    console.log(form.value);
    if(this.error == "Incorrect Password"){
      console.log("not ok")
    }else{
      this._authservice.changePassword(this.localdata._id,form.value.newPassword).subscribe(
        (response) => {
        console.log(response);
        this.successPass = "Password Changed Successfully"
        this.successPassAlert = true;
        }); 
    }
    
  }
  
  checkPassword(event: any){
    this.values = event.target.value;
    if(this.values.length >=4){
      this._authservice.checkPassword(this.values,this.localdata._id).subscribe(
        (response) => {
          if(response.status == "notMatch"){
            this.error = "Incorrect Password"
          }else if(response.status == "match"){
            this.error = "";
          }
      }); 
    }
  }
  
  edit(){
    this.editUser.patchValue({     
      fname : this.localdata.fname,
      lname : this.localdata.lname,
      email : this.localdata.email,
      address : this.localdata.address,
      password : this.localdata.password
    }) 
  }
  
  editInfo(form){
    console.log(form.value);
    this._authservice.editInfo(form.value,this.localdata._id).subscribe(
      (response) => {
        console.log(response)
          delete response.password;
          localStorage.setItem("login_data", JSON.stringify(response));
          this.success = "Information Updated Successfully"
          this.alert = true;
          this.localdata = (JSON.parse(localStorage.getItem("login_data")));
          this.edit();
      })
  }

  closeAlert(){
    this.alert;
    this.errAlert;
    this.successPassAlert;
  }

  ngOnInit(): void {
    this.localdata = (JSON.parse(localStorage.getItem("login_data")));
    this.firstName = this.localdata.fname;
    this.lastName = this.localdata.lname;
    this.userEmail = this.localdata.email;
    this.userPassword = this.localdata.password;
    this.userAddress = this.localdata.address;        
  }

}
