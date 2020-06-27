import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  videoId;
  ServerPath = "http://localhost:3000/";
  video;
  path;
  imgpath;
  videotitle;

  constructor(
    private route: ActivatedRoute,
    private _dashboardservice : DashboardService,
    private router: Router
  ) { }
  
  getMovie(){
    this._dashboardservice.getMovie(this.videoId).subscribe(
      (response) => {
        this.video = response[0];
        this.path = this.ServerPath + this.video.vdo;
        this.imgpath = this.ServerPath + this.video.img;
        this.videotitle = this.video.mname;
        console.log(this.video.img)
        console.log(this.video.vdo)
    })
  }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params.id; 
    console.log(this.videoId) 
    this.getMovie();
  }

}
