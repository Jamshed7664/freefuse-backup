import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router'; 
import { CrudService } from '../../crud.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-videos-public',
  templateUrl: './my-videos-public.component.html',
  styleUrls: ['./my-videos-public.component.css']
})
export class MyVideosPublicComponent implements OnInit {
  public userId: any;
  public list:any = false;
  public mainID: any;
  public userDetails: any = {};
  public allMainVideos: Array<any> = [];
  public publishedVideos: Array<any> = [];
  public mostPopularVideos: Array<any> = [];
  public val:any = 'recent';
  public mostInteractiveVideos: Array<any> = [];
  public spinner: any = false;
  public chunks: Array<any> = [];
 // public mostPopularVideos: Array<any> = [];
   
  constructor(public crudService: CrudService,
    public router: Router,
    public activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {
        // this.userId = params.user;
        this.mainID = params.user;
      });
    }

  ngOnInit() {
    if(!(!!this.mainID))
    {
     this.router.navigate(['dashboard']);
      
    }
    this.getUserDetails();
    this.spinner = true;
    }

  //Get userdetails
  getUserDetails() {
    this.crudService.getUserInfo(this.mainID).subscribe(success=>{
      this.userDetails = success.data.userinfo;
      this.allMainVideos = success.data.publishedVideo;
     
        for (let i of this.allMainVideos) {
          if (i.publishTime) {
            let temp = parseInt(i.publishTime);
            let time = new Date(temp).toUTCString();
            i.formattedTime = time;
          }
        }
      
        this.allMainVideos = this.allMainVideos.sort(function (a, b) {
          if (a.viewCount < b.viewCount) {
            return 1;
          }
          return -1
        })

        for(let i=0;i<=3;i++)
        {
          if(this.allMainVideos[i])
          this.mostPopularVideos.push(this.allMainVideos[i])
          
          
        }
   
        this.allMainVideos = this.allMainVideos.sort(function (a, b) {
          if (a.totalchild > b.totalchild) {
            return 1;
          }
          return -1
        })
        for(let i of this.allMainVideos.reverse())
        {
          this.mostInteractiveVideos.push(i);
          
          
        }
        
      //  this.mostInteractiveVideos = this.mostInteractiveVideos.reverse();
     
        this.spinner = false;
        //for(let i=0;)
    //    this.mostPopularVideos
  //public mostInteractiveVideos
        //this.publishedVideos = this.allMainVideos.filter((video) => video.isPublished == true);
       }, error=>{

    });
  }

 
  // Split list into a group of 3
  // splitList(source: Array<any>): Array<any>{
  //   let chunks = _.chunk(source, 3);
  //   console.log('Chunks: ', chunks);    
  //   return chunks;
  // }

  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }
  
  
  // Show video
  showVideo(id: any) {
      this.router.navigate(['videos'], { queryParams: { video: id } });

     }
  userProfile()
  {
    this.router.navigate(['public-profile'], { queryParams: { user: this.mainID } });
  }

  changeFilter(val:any){
    this.list = true;
    if(val =='recent')
    {
      this.mostPopularVideos.sort(function (a, b) {
        if (a.publishTime > b.publishTime) {
          return -1;
        }
        return 1
      })
    }
    else if(val =='viewed')
    {
      this.mostPopularVideos.sort(function (a, b) {
        if (a.viewCount > b.viewCount) {
          return -1;
        }
        return 1
      })
    }
    else if(val =="interactive")
    {
      this.mostPopularVideos.sort(function (a, b) {
        if (a.totalchild > b.totalchild) {
          return -1;
        }
        return 1
      })
      
    }
    else
    {
      this.mostPopularVideos.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 1
      })
    }
    
  }
}
