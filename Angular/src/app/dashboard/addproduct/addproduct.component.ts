import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {DashboardService} from '../dashboard.service';
import {environment} from '../../../environments/environment'
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  uploadedFiles: Array < File >  ;
  uploadedVideo: Array < File >  ;
  progress: number = 0;
  @ViewChild('myFile' , { static: false })  myFile: ElementRef;
  @ViewChild('myVdo' , { static: false })  myVdo: ElementRef;

  addproduct;
  catlist;
  ServerPath = environment.image_URL;
  product = [];
  chooseVideoFile 
  update : boolean = false;
  btnName = 'Add Movie';
  editId;
  editrecord;
  extErr;
  vdoExtErr;

  constructor(
    private fb : FormBuilder,
    private _dashboardservice : DashboardService,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    this.addproduct = this.fb.group({
      mname : ['', [Validators.required]],
      description : ['', [Validators.required]],
      selectcat : [this.catlist, [Validators.required]],
      img : [''],
      vdo : [''],
      featured : [''],
      freestuff : [''],
      

    })
   }
  
  get mname(){return this.addproduct.get('mname');}
  get selectcat(){return this.addproduct.get('selectcat');}
  get description(){return this.addproduct.get('description');}
  
   getCategory(){
    this._dashboardservice.getCategory().subscribe(
      (response) => {
        this.catlist = response;
      });
    }
    getMovies(){
      this._dashboardservice.getMovies().subscribe(
        (response) => {
          this.product = response;
        });
      }

post(form){
      if(this.extErr == null){
      let frm = form.value;
      console.log(frm)
      var formData = new FormData()
      formData.append("mname",frm.mname);
      formData.append("selectcat",frm.selectcat);
      formData.append("description",frm.description);
      formData.append("featured",frm.featured);
      formData.append("freestuff",frm.freestuff);
      if(this.uploadedFiles !== undefined && this.uploadedFiles !== null){
        formData.append("img", this.uploadedFiles[0], this.uploadedFiles[0].name);
      }else{
        formData.append("imgpath", frm.img);
      }
      console.log(this.uploadedVideo)
      if(this.uploadedVideo !== undefined && this.uploadedVideo !== null){
        formData.append("vdo", this.uploadedVideo[0], this.uploadedVideo[0].name);
      }else{
        formData.append("vdopath", frm.vdo);
      }
      console.log(formData)
      // if(this.update == false ){
      //   this._dashboardservice.addMovies(formData).subscribe(
      //     (event: HttpEvent<any>) => {
      //       switch (event.type) {
      //         case HttpEventType.Sent:
      //           console.log('Request has been made!');
      //           break;
      //         case HttpEventType.ResponseHeader:
      //           console.log('Response header has been received!');
      //           break;
      //         case HttpEventType.UploadProgress:
      //           this.progress = Math.round(event.loaded / event.total * 100);
      //           break;
      //         case HttpEventType.Response:
      //           console.log('User successfully created!', event.body);
      //           setTimeout(() => {
      //             this.progress = 0;
      //           }, 1500);
      //           this.getMovies();
      //       }
      //     })
      //   this.myFile.nativeElement.value = null;
      //   this.addproduct.reset();
      // }else{      
      // this.update = false;
      // this._dashboardservice.updateMovies(this.editrecord,formData).subscribe(
      // (response) => {
      // console.log(response);
      // this.getMovies();
      // }); 
      // }
      // this.myFile.nativeElement.value = null;
      // this.myVdo.nativeElement.value = null;
      // this.uploadedVideo = null;
      // this.uploadedFiles = null;
      // this.btnName = "Add Movie";
      // this.addproduct.reset();
    }else{
      console.log(this.extErr)
    }
}
  
chooseFile(event){ 
      var ext = event.target.files[0].name.substr( event.target.files[0].name.lastIndexOf('.') + 1)
      console.log(ext)
      var validExt = ["jpg", "jpeg", "bmp", "gif", "png"]; 
      if(validExt.includes(ext)){
        this.extErr = null
      this.uploadedFiles = event.target.files;
      console.log(this.uploadedFiles)
      }else{
        this.extErr = 'Only jpg, jpeg, bmp, gif, png are allowed'
      }
  }

  chooseVideo(event){ 
    var ext = event.target.files[0].name.substr( event.target.files[0].name.lastIndexOf('.') + 1)
    console.log(ext)
    var validExt = ["mp4", "WebM", "OGG"]; 
    if(validExt.includes(ext)){
      this.extErr = null
    this.uploadedVideo = event.target.files;
    console.log(this.uploadedVideo)
    }else{
      this.vdoExtErr = 'Only mp4, WebM are allowed'
    }
}
    
  edit(index,obj){
    this.update = true;
    this.editrecord = obj._id;
    console.log(index)
    this.editId = index;
    this.addproduct.patchValue({     
      fname : obj.fname,
      mname : obj.mname,
      selectcat : obj.selectcat,
      description : obj.description,
      img : obj.img,
      vdo : obj.vdo
    }) 
    console.log(this.addproduct.value)
    this.btnName = "Update Movie";


  }

  del(index,id){
    console.log(id)
    this.product.splice(index, 1);
    this._dashboardservice.delMovies(id).subscribe(
      (response) => {
    
    console.log(response)
   })
  }
selectMovie;
  openBackDropCustomClass(content, data) {
    console.log(content,data)
    this.selectMovie = data;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', size: 'lg'});
  }

  ngOnInit(){
    this.getCategory();
    this.getMovies();
    console.log(this.product)
  }
}
