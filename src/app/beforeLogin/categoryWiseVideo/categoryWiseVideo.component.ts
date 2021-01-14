import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'categoryWiseVideo',
  templateUrl: './categoryWiseVideo.component.html',
  styleUrls: ['./categoryWiseVideo.component.css']
})
export class CategoryWiseVideoComponent implements OnInit {

  public mainVideoList: Array<any> = [];
  public currentCat:any;
  public spinner:any = false;
  public val:any = 'recent';
    constructor(public urlService: CrudService, 
      public toastr: ToastrService, 
      public router: Router,
      public activeRoute: ActivatedRoute) {
        this.activeRoute.queryParams.subscribe(params => {
          this.spinner = true;
          if(params.category){
            this.currentCat = decodeURI(params.category);
            this.getMainVideos();
          }
          else
          {
            this.router.navigate(['landing-page'])
        }
        })
        }
  
  ngOnInit() {
   
   
  }

  // Get all main videos
  getMainVideos() {
    this.mainVideoList = [];
 
   let payLoad:any  = {"category":[this.currentCat]}
      this.urlService.userCategoryWiseVideos(payLoad).subscribe(success => {
      this.mainVideoList = success.data;
      this.mainVideoList = this.mainVideoList.reverse();
      this.spinner = false;
     }, error => {
      // this.getMainVideos();
    });
  }


  showVideo(id: any) {

    this.router.navigate(['videos'], { queryParams: { video: id } });
  
  }
  showUser(id: any) {

    this.router.navigate(['public-profile'], { queryParams: { user: id } });
  
  }
  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }


  changeFilter(val:any){
    if(val =='recent')
    {
      this.mainVideoList.sort(function (a, b) {
        if (a.publishTime > b.publishTime) {
          return -1;
        }
        return 1
      })
    }
    else if(val =='viewed')
    {
      this.mainVideoList.sort(function (a, b) {
        if (a.viewCount > b.viewCount) {
          return -1;
        }
        return 1
      })
    }
    else if(val =="interactive")
    {
      this.mainVideoList.sort(function (a, b) {
        if (a.totalchild > b.totalchild) {
          return -1;
        }
        return 1
      })
      
    }
    else
    {
      this.mainVideoList.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 1
      })
    }
    
  }
  
  
}
