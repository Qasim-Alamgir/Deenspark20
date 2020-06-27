import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
  providers: [AuthService]

})
export class ActivateComponent implements OnInit {

  expire;
  activate;
  token;
  alert: boolean = false;
 errAlert: boolean = false;
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authservice: AuthService,
  ) {}
  closeAlert(){
    this.alert;
    this.errAlert;
  }

  ngOnInit(): void {

      this.token = this.route.snapshot.params.token;      
      console.log(this.token);
      this._authservice.activate(this.token).subscribe(
        (response) => {
          if(response == "expired"){
            this.errAlert = true;
            this.expire = "Verification Code has been Expired";
          }else if(response == "activated"){
            this.alert = true;
            this.activate = "Your Account is Successfully Activated. You can Login now"
          }
        })
  }

}
