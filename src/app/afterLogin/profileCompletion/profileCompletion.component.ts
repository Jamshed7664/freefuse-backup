import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'profileCompletion',
  templateUrl: './profileCompletion.component.html',
  styleUrls: ['./profileCompletion.component.css']
})

export class ProfileCompletionComponent implements OnInit {
  constructor(public urlService:CrudService, public router:Router,public toastr: ToastrService) { }  public profileCompltetObj:any = {categories:[],bio:'',file:'',spinner:'',imagePath:'',imgURL:'',step:'first',checkedList:[],fileData:''}

  ngOnInit() {
    this.profileCompltetObj.spinner = true;
    this.urlService.fetchCategories().subscribe(
      success =>{
           this.profileCompltetObj.spinner = false;
           this.profileCompltetObj.categories = success.data.categories
         
       },
       error =>{
       })
  }


  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.error('Only images are supported!');
      return;
    }
 
    var reader = new FileReader();
    this.profileCompltetObj.imagePath = files;
    this.profileCompltetObj.fileData = files[0]
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.profileCompltetObj.imgURL = reader.result; 
    }
  }


  changeUserLogin(id)
  {
    if ($('#'+id).val() != ""){
        $('#'+id).siblings('.input-field').addClass('video_input_focus');
        $('#'+id).addClass('focusIn');
      }else{
        $('#'+id).siblings('.input-field').removeClass('video_input_focus');
      }
   }

   checkChange(e:any,obj:any)
   {
    if(e.target.checked) {
      this.profileCompltetObj.checkedList.push(obj);
    } else {
    for(var i=0 ; i < this.profileCompltetObj.categories.length; i++) {
      if(this.profileCompltetObj.checkedList[i] == obj) {
        this.profileCompltetObj.checkedList.splice(i,1);
     }
   }
 }
   }

  onSubmit() {
    this.profileCompltetObj.spinner = true;
    const formData = new FormData();
    formData.append('file', this.profileCompltetObj.fileData);
    formData.append("bio", this.profileCompltetObj.bio);
    for (let i of this.profileCompltetObj.checkedList) {
      formData.append("category", i);

    }
    // let params:any = {
    //   bio: this.profileCompltetObj.obj,
    //   category:this.profileCompltetObj.checkedList
    // };
    let totalCategories = this.profileCompltetObj.checkedList.length;
    if (totalCategories < 1) {
      this.toastr.error('Please select at least one category');
      this.profileCompltetObj.spinner = false;
    } else {
      this.urlService.completeProfile(formData).subscribe(
        success => {
          this.profileCompltetObj.spinner = false;
          this.router.navigate(['/thats-all']);
        },
        error => {
        });
    }
  }
}
