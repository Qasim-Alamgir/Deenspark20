import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DashboardService} from '../dashboard.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subPlan;
  btnName = 'Add Plan';
  planlist = [];
  editrecord;
  update = false;
  editId;

  constructor(
    private fb : FormBuilder,
    private _dashboardservice : DashboardService,
    private http: HttpClient,
  ) {
    this.subPlan = this.fb.group({
      pname : ['', [Validators.required]],
      price : ['', [Validators.required]],
      duration : ['', [Validators.required]],
    })
   }
   
  get price(){return this.subPlan.get('price');}
  get pname(){return this.subPlan.get('pname');}
  get duration(){return this.subPlan.get('duration');}

  post(data){
    console.log(data.value.pname)
    let obj = {
      pname : data.value.pname,
      price : data.value.price,
      duration : data.value.duration
    }
    console.log(obj)

    if(this.update == false ){ 
     this._dashboardservice.addSubPlan(obj).subscribe(
      (response) => {
        console.log(response);
        this.getSubPlan();
      });   
    }else{
      this.planlist[this.editId] = obj;
      this.update = false;
      this._dashboardservice.updatePlan(this.editrecord,obj).subscribe(
        (response) => {
        console.log(response);
        this.getSubPlan();
        });
    } 
    this.subPlan.reset();
    this.btnName = 'Add'; 
  }

  getSubPlan(){
    this._dashboardservice.getSubPlan().subscribe(
      (response) => {
        this.planlist = response;
      });
    }

  edit(index,obj){
    console.log(obj);
    this.editrecord = obj._id;
    console.log(this.editrecord)
    this.update = true;
    this.editId = index;
    this.subPlan.patchValue({     
      pname : obj.pname,
      price : obj.price,
      duration : obj.duration
    }) 
    console.log(this.subPlan.value); 
    this.btnName = "Update";
  }

  del(index,_id){
    this._dashboardservice.delPlan(_id).subscribe(
      (response) => {
        console.log(response)
        this.getSubPlan();
  })
  }

  ngOnInit(): void {
    this.getSubPlan();
  }

}
