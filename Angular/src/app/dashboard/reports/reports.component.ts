import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DashboardService} from '../dashboard.service';
import {environment} from '../../../environments/environment'
import { from } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private router: Router,
    public _dashboardservice : DashboardService,
  ) { }

  alert: boolean = false;
  vdoalert: boolean = false;
  ServerPath = environment.image_URL;

  userReport(){
    this._dashboardservice.userReport().subscribe(
      (response) => {
        if(response.status == "success"){
          this.alert = true;
        }
      });
  }

  videoReport(){
    this._dashboardservice.videoReport().subscribe(
      (response) => {
        if(response.status == "success"){
          this.vdoalert = true;
        }
      });
  }

  closeAlert(){
    this.alert;
    this.vdoalert;
  }

  ngOnInit(): void {
  }

}
