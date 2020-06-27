import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList;

  constructor(
    private _dashboardservice : DashboardService,
  ) { }

  delUser(index,_id){
    this._dashboardservice.delUser(_id).subscribe(
      (response) => {
        console.log(response)
        this.getUser();
  })
  }

  getUser(){
    this._dashboardservice.getUser().subscribe(
      (response) => {
        this.userList = response;
        console.log(this.userList)
      });
    }

  ngOnInit(): void {
    this.getUser();
    
  }

}
