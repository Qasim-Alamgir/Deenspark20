import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import {AuthService} from '../auth.service';
import {DashboardService} from '../../dashboard/dashboard.service'
import {FormBuilder,AbstractControl, Validators, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Datatype} from '../datatype';
import { element } from 'protractor';
declare var paypal;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  register;
  user_data;
  error;
  alert: boolean = false;
  errAlert: boolean = false;
  planlist = [];
  duration;
  price;
  regBtn ='';
  planId;
  subcripId: any;  
  basicAuth = 'Basic Ac-ttV2e8UuSw1Kkd1sDY10M6MJ3ZhA3o3Ob4Lt4DBfIYbIh9vbAkQWw0rACEg4_eACDfL04tay-n4EJEIHPjfFmiRgBafDH0kGCEcrnBs96A04SAXWamZ4GPH1kEOU2kov_p6z5JboeHQk1tGepegDbHktrXu98=true';
  tokan = 'Bearer A21AAFe2vDDpquVZO6DB6y3eVbxmE3ZTLr38zQ4-NG9Z8haELrgiiip-a1KCTUnIH5BoNC-KaZMbu8ENwpT3P_x07OFPzPH2w'
  orderinfo;
  resend;
  

  constructor(
    private fb : FormBuilder,
    private _authservice: AuthService,
    private _dashboardservice : DashboardService,
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
  user = new Datatype();
  addfrom(form){
    
    this.user.fname = this.register.value.fname;
    this.user.lname = this.register.value.lname;
    this.user.email = this.register.value.email;
    this.user.address = this.register.value.address;
    this.user.password = this.register.value.password;
    this.resend = this.user;
}

adduser(subscriptionID){
  console.log(subscriptionID)
  this.orderinfo = subscriptionID
  this._authservice.registeration(this.user,subscriptionID).subscribe(
    (response) => {
      console.log(response);
      if(response.status == "Email Already exist"){
        this.errAlert = true;
        this.error = "Email Already exist"
      }else{
        this.error = null;
        this.errAlert = false;
        this.register.reset();
        this.user_data = this.user;
        console.log(this.user)
        this.alert = true;
      }
    }
)
}

  resendCode(){
    console.log(this.resend);
    this._authservice.registeration(this.user,this.orderinfo).subscribe(
      (response) => {
        console.log(this.user_data);
    })
  }

  closeAlert(){
    this.alert;
    this.errAlert;
  }

  getSubPlan(){
    this._dashboardservice.getSubPlan().subscribe(
      (response) => {
        console.log(response)
        this.planlist = response;
        
    console.log(this.planlist);
      });
    }

  selectedplan(list){
    console.log(list)
    this.planId = list.pname;
    this.duration = list.duration;
    this.price = list.price;
  }

  getSubcriptionDetails(subscriptionID) {  
    console.log(subscriptionID)
    this.adduser(subscriptionID);
    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function () {  
      if (this.readyState === 4 && this.status === 200) {  
        console.log(JSON.parse(this.responseText));  
        alert(JSON.stringify(this.responseText));  
      }  
    };  
    xhttp.open('GET', 'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + subscriptionID, true);  
    xhttp.setRequestHeader('Authorization', this.tokan);  
    xhttp.send();  
  }
  transactininfo(){
    this._authservice.transaction(this.tokan).subscribe(
              (response) => {
                console.log(response.status)
              })
  }
  
  
  ngOnInit(): void {

    this.getSubPlan()
    // this.transactininfo();
    const self = this;
    paypal.Buttons({  
      createSubscription: function (data, actions) {  
        return actions.subscription.create({  
          'plan_id': self.planId,  
        });  
      },  
      onApprove: function (data, actions) {  
        console.log(data);  
        this.orderinfo =  data;
        console.log(this.orderinfo)
        alert('You have successfully created subscription ' + data.subscriptionID);
        self.getSubcriptionDetails(data.subscriptionID);  
      },  
      onCancel: function (data) {  
        // Show a cancel page, or return to cart  
        console.log(data);  
      },  
      onError: function (err) {  
        // Show an error page here, when an error occurs  
        console.log(err);  
      }  
  
    }).render(this.paypalElement.nativeElement);
  }
}

