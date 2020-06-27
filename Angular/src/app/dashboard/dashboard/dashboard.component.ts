import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  localdata;
  constructor(
    private router: Router
  ) { 
    this.localdata = (JSON.parse(localStorage.getItem("login_data")));
    if( this.localdata == undefined || this.localdata == null && this.localdata.canlogin !== "yes"){
      this.router.navigate(['/auth']);
    }
    console.log(this.localdata)
  }

  ngOnInit(): void {
    
  }
  logout(){
    this.localdata = {};
    let clear = localStorage.removeItem('login_data');
    console.log(this.localdata);
    console.log(clear);
    this.router.navigate(['/auth'])
    
  }
}
