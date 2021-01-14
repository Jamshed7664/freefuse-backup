import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
declare var $;
@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent implements OnInit {

  public mainVideoList: Array<any> = [];
  public publishedVideos: Array<any> = [];
  public sortedPublishedVideos: Array<any> = [];
  public drafts: Array<any> = [];
  public intialDraft: Array<any> = [];
  public isSecond:any = false;
  public currentItem:any ={}
  public currentItemback:any ={}
  public draftChunks: Array<any> = [];
  public userDetails: Array<any> = [];
  public contributors: Array<any> = [];
  public contributorVideos: Array<any> = [];
  public initialContributorVideos: Array<any> = [];
  public topChoices:any = []
  public spinner: any =  false
  public val:any = 'recent';
  constructor(
    public crudService: CrudService,
    public toaster: ToastrService, 
    public router: Router) {
    }

  ngOnInit() {
    this.spinner = true;
    this.getMainVideos();
  }

  // Get all main videos
  getMainVideos() {
    this.intialDraft = [];
    this.mainVideoList = [];
    this.publishedVideos = [];
    this.drafts = [];
    this.crudService.getInteractiveVideo().subscribe(success => {
      this.mainVideoList = success.data;
      for(let v of this.mainVideoList) {
        // console.log('categories: ', v.Categories);
        // console.log('owner: ', v.isOwner);
        // console.log('contibutors: ', v.contibutors);
        if (v.isOwner == true) {
          
        } else {
          this.contributorVideos.push(v);
        }
      }
      this.mainVideoList = this.mainVideoList;
      for (let i of this.mainVideoList) {
        if (i) {
          if (i.isPublished) {
            this.publishedVideos.push(i);
          } else {
            this.drafts.push(i);
          }
        }
      }
      this.drafts = this.drafts.reverse();
      for (let i of this.publishedVideos) {
        i.formattedTime = new Date(parseInt(i.publishTime));
      }
      this.sortedPublishedVideos = _.sortBy(this.publishedVideos, ['formattedTime']);
      // for (let t of this.sortedPublishedVideos) {

      // }
      this.sortedPublishedVideos  = this.sortedPublishedVideos.reverse();
      
      for(let i=0;i<=3;i++)
      {
        if(this.drafts[i])
        this.intialDraft.push(this.drafts[i])

        if (this.contributorVideos[i]) {
          this.initialContributorVideos.push(this.contributorVideos[i]);
        }
      }

      
      //console.log('initial draft:', this.intialDraft);
      this.spinner = false;
      //  this.draftChunks =  this.splitDrafts();
    }, error => {
      //this.getMainVideos();
    });
  }

  // Get contributors

  viewAll()
  {
    this.intialDraft = this.drafts;
  }

  viewAllCollaborations () {
    this.initialContributorVideos = this.contributorVideos;
  }

  // splitDrafts(): Array<any>{
  //   let draft_chunk = _.chunk(this.drafts, 3);
  //   return draft_chunk;
  // }

  showAnalytics(video:any)
  {
    this.spinner = true;
    this.currentItem = video
    this.currentItemback = video
    this.isSecond  = false;
    this.crudService.getTopChoices(video._id).subscribe(success => {
      this.topChoices = success.data;
      this.currentItem.totalViews = 0;
      for(let i of this.topChoices){
        this.currentItem.totalViews = this.currentItem.totalViews + i.viewCount;
      }
      if(this.currentItem.totalViews == 0)
      {
        this.currentItem.totalViews = 1;
      }
     // this.currentItem.
      $('#anlyticsModal').modal('show');
      this.spinner = false;
    })

  }

  getChildDetails(id:any)
  {
    this.spinner = true;
 
   
    this.crudService.getTopChoices(id).subscribe(success => {
      this.topChoices = success.data;
      this.isSecond  =true;
      this.currentItem.totalViews = 0;
      for(let i of this.topChoices){
        this.currentItem.totalViews = this.currentItem.totalViews + i.viewCount;
      }
      if(this.currentItem.totalViews == 0)
      {
        this.currentItem.totalViews = 1;
      }
     // this.currentItem.
      //$('#anlyticsModal').modal('show');
      this.spinner = false;
    })
  }

  resetStats()
  {
    this.showAnalytics(this.currentItemback)
  }
  showVideo(id: any) {
   
    this.router.navigate(['videos'], { queryParams: { video: id } });
  
  }

  edit(id: any) {
    this.router.navigate(['create-interactive-video'], { queryParams: { video: id } });
  }

  showModal(id: any) {
    for (let i of this.mainVideoList) {
      if (id == i._id) {
        this.contributors = i.contributors;
      }
    }
    $('#exampleModal').modal('show');
  }

  publish(item: any) {
    this.spinner = true;
    let finalObj = {
      "type": "publish",
      "videoID": item._id
    }

    if (item.Title == '' || item.Categories.length == 0) {
      this.toaster.warning('Please add title and atleast one category');
      this.router.navigate(['create-interactive-video'], { queryParams: { video: item._id } });
    } else {
      this.crudService.publishunpublish(finalObj).subscribe(
      success => {
        localStorage.setItem('tempToken', '848484');
        this.getMainVideos();
        this.toaster.success('Published successfully!');
      },
      error =>{
        this.spinner = false;
      }
    );  
    }
    // this.crudService.publishunpublish(finalObj).subscribe(
    //   success => {
    //     localStorage.setItem('tempToken', '848484')
    //     this.getMainVideos();
    //     this.createInteractiveVideoObj.spinner = false;
    //     this.toaster.success('Published successfully!');
    //   }
    // );
  }

  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }
  
  delete(id:any)
  {
    let confirm1 = confirm('Are you sure you want to delete?');
    if(confirm1){
    this.spinner = true;

    this.crudService.deleteBookMarkVideo(id).subscribe(
      success => {
        this.getMainVideos();
      //this.createInteractiveVideoObj.spinner = false;
        this.toaster.success('Deleted successfully!');
      })
    }
  }
  changeFilter(val:any){
    if(val =='recent')
    {
      this.sortedPublishedVideos.sort(function (a, b) {
        if (a.publishTime > b.publishTime) {
          return -1;
        }
        return 1
      })
    }
    else if(val =='viewed')
    {
      this.sortedPublishedVideos.sort(function (a, b) {
        if (a.viewCount > b.viewCount) {
          return -1;
        }
        return 1
      })
    }
    else if(val =="interactive")
    {
      this.sortedPublishedVideos.sort(function (a, b) {
        if (a.totalchild > b.totalchild) {
          return -1;
        }
        return 1
      })
      
    }
    else
    {
      this.sortedPublishedVideos.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 1
      })
    }
    
  }
  
  
}
