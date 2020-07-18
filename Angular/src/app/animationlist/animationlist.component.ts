import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from '../dashboard/dashboard.service';
import {environment} from '../../environments/environment'
@Component({
  selector: 'app-animationlist',
  templateUrl: './animationlist.component.html',
  styleUrls: ['./animationlist.component.scss']
})
export class AnimationlistComponent implements OnInit {
  localdata;
  catvalue;
  catname;
  ServerPath = environment.list_URL
  animations = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dashboardservice: DashboardService
  ) { }
  
  getMovies(){
    this._dashboardservice.getMovieList(this.catvalue).subscribe(
      (response) => {
        this.animations = response;
        console.log(this.animations)
        this.catname = response[0].selectcat;
    })
  }

  watchvideo(id){
    console.log(id)
    this.router.navigate(['/watch', id])
    
  }

  ngOnInit(): void {
    this.catvalue = this.route.snapshot.params.catvalue; 
    console.log(this.catvalue) 
    this.getMovies();
  }

}
