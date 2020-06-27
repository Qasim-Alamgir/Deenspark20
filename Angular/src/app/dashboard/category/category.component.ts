import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import {DashboardService} from '../dashboard.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category;
  catlist = [];
  update : boolean = false;
  btnName = 'Add';
  editId;
  editrecord;

  constructor(
    private fb : FormBuilder,
    private _dashboardservice : DashboardService,

    ) {
    this.category = fb.group({
      catname : ['', [Validators.required]],
      catcolor : ['', [Validators.required]]
    })
   }

   get catname(){return this.category.get('catname');}
   get catcolor(){return this.category.get('catcolor');}

   post(data){
    let catvalue = data.catname;
    catvalue = catvalue.toLowerCase();
    let categoryname = {
      catname : data.catname,
      catvalue : catvalue,
      catcolor : data.catcolor
    }
    if(this.update == false ){
     this.catlist.push(categoryname); 
     this._dashboardservice.addcategory(categoryname).subscribe(
      (response) => {
        console.log(response);
      });   
    }else{
      this.catlist[this.editId] = categoryname;
      this.update = false;
      this._dashboardservice.updatecategory(this.editrecord,categoryname).subscribe(
        (response) => {
        console.log(response);
        });
    } 
   
    localStorage.setItem("catlist", JSON.stringify(this.catlist));
    this.category.reset();
    this.btnName = 'Add'; 
   }
   
   del(index,_id){
    localStorage.setItem("catlist", JSON.stringify(this.catlist));
    this._dashboardservice.delCategory(_id).subscribe(
      (response) => {
        this.catlist.splice(index, 1);
        console.log(response)
  })
  }
  
  edit(index,obj){
    console.log(obj);
    this.editrecord = obj._id;
    console.log(this.editrecord)
    this.update = true;
    this.editId = index;
    this.category.patchValue({     
      catname : obj.catname,
      catcolor : obj.catcolor
    }) 
    console.log(this.category.value); 
    this.btnName = "Update";
  }
  
  getCategory(){
  this._dashboardservice.getCategory().subscribe(
    (response) => {
      this.catlist = response;
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

}
