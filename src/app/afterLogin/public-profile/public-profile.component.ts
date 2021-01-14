import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr' 
import { isArray } from 'util';
import * as _ from 'lodash';
import { share } from 'rxjs/operators';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
declare var CanvasJS:any;
declare var $:any;
declare var owlCarousel:any;

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class PublicProfileComponent implements OnInit {

  public dashboardObj:any = {spinner:false}
  public privacySettings: any = {};
  public spinners:any = {}
  public notificationSettings: any = {};
  public userId: any;
  public mainID: any;
  public publishedVideos: Array<any> = [];
  public viewerChoices: Array<any> = [];
  public draftVideos: Array<any> = [];
  public recentMainVideo: any = {};
  public userData: any = {};

  public iAmFollowing:any = false;
  public followers:Array<any> = [];
  public following:Array<any> = [];
  public recentFollowing: Array<any> = [];
  public recentFollowers: Array<any> = [];
  public topViewedChoices: Array<any> = [];
  public topChoicesLoaded: boolean = false;
index:any = 0;
  public followingFlag: boolean = false;
  public watchHistory: Array<any> = [];
  public top3: Array<any> = [];
  public likedVideos: Array<any> = [];
  public sharedVideos: Array<any> = [];
  public currentUser:any;
  public isLoggedIN:any = false;
  constructor(public urlService:CrudService, 
    public toastr: ToastrService, 
    public router:Router,
    public activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.userId = params.user;
        this.mainID = params.user;
        this.spinners.first = true;
        if (window.localStorage.getItem('token') == null && window.localStorage.getItem('token') == undefined) {
          this.isLoggedIN = false;
          //$('.search-dropdown').hide();
        } else {
          this.isLoggedIN = true
        }
        if(!!this.userId)
        this.init();
       
      });
    }
  
  ngOnInit() {
   
   
  }
  getRandowmValue()
  {
   
    return Math.floor((Math.random() * 70) + 30);;
  }
  
  init()
  {
    this.currentUser = window.localStorage.getItem('user')
    this.dashboardObj.spinner = true;
    this.spinners.sixth = true;
    this.getUserdata();
    if(this.isLoggedIN)
    this.getMyData();
  }
 
  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }
  
  // Get user data (processed on the basis of user ID)
  getUserdata() {
    this.urlService.getUserInfo(this.userId).subscribe(
      success=>{
        this.userData = success.data;
        this.userData.userinfo.username = this.add3Dots(this.userData.userinfo.username, 12);
        
        if(this.userData.userinfo.bio.length > 0)
        this.userData.userinfo.bio[0] = this.add3Dots(this.userData.userinfo.bio[0], 50);

        this.privacySettings = success.data.userinfo.privacySettings;
        this.notificationSettings = success.data.userinfo.notifications;
        
        // for (const [key, value] of Object.entries(success.data.followersinfo)) {  
        //   this.recentFollowers.push(value)
        // }
        
        this.followers = success.data.followersinfo;
        let arr: Array<any> = _.sortBy(this.followers, ['createdAt']);
        arr = arr.reverse();
        this.recentFollowers = arr;

        this.following = success.data.followinginfo;
        let arr2: Array<any> = _.sortBy(this.following, ['createdAt']);; 
        arr2 = arr2.reverse();
        
        this.recentFollowing = arr2;
        for(let i of this.recentFollowers)
        {
          i.info.content = this.getRandowmValue()
          i.info.chouces = this.getRandowmValue()
    
        }
        for(let i of this.recentFollowing)
        {
          i.userinfo.content = this.getRandowmValue()
          i.userinfo.chouces = this.getRandowmValue()
    
        }

        // for (const [key, value] of Object.entries(success.data.followinginfo)) {  
        //   this.recentFollowing.push(value)
        // }
         
        
        this.publishedVideos = success.data.publishedVideo;
        let temp: Array<any> = this.publishedVideos;
        let splitChoices: Array<any> = this.splitList(temp, 4);
       
        let sortedArr = _.sortBy(this.publishedVideos, ['updatedAt']);
        this.recentMainVideo = sortedArr[0];
        //console.log('this.recentMainVideo', this.recentMainVideo);

        let index = 0
              for(let i of temp)
              {
                if(index < 6)
                this.viewerChoices.push(i)
              
                index++;
              }
       // this.viewerChoices = splitChoices[0];
       this.getWatchHistory();
      //  if(this.isLoggedIN){
      //   this.getWatchHistory();
      // }
      // else{
      //   this.dashboardObj.spinner = false;
      // }
       
      }
    );
  }

  add3Dots(s: any, limit: number): string {
    // var dots = "...";
    // if(s.length > limit) {
    //   s = s.substring(0,limit) + dots;
    // }
    return s;
  }

  getMyData()
  {
    // to be changed to cureent logged in user
    this.urlService.getUserInfo(this.currentUser).subscribe(
      success => {  
        if (success.data.followinginfo.length > 0) {
          for(let i of success.data.followinginfo) { 
            if(i.userinfo._id == this.userId) {
              this.iAmFollowing = true;
              break;
            }
          }
        }
      });
    
  }
  userProfile(id:any){
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
   // window.location.reload();
  }

  // Get shared videos
  getSharedVideos() {
    this.urlService.getUserShares(this.userId).subscribe(
      success => {
       
        if(!isArray(success.data)){
          this.sharedVideos = []
        }
        else{
        this.sharedVideos = success.data.reverse();
        }
      this.getMatchedValue();
      });
  }

  // Get liked videos
  getLikedVideos() {
    this.urlService.getLikedVideos(this.userId).subscribe(
      success=>{
        if(!isArray(success.data)){
          this.likedVideos = [];
          //return;
        }
        else{
        for (const [key, value] of Object.entries(success.data)) {
          this.likedVideos.push(value)
        }
      }
        this.likedVideos = this.likedVideos.reverse()
        this.getViewerChoices()
      
      });
  }

  getWatchHistory() {
    this.urlService.getWatchHistoryByUser(this.userId).subscribe(
      success=>{
        if(!isArray(success.data))
        {
          this.watchHistory = [];
          this.dashboardObj.spinner = false;
          this.getSharedVideos();
          this.getLikedVideos();
          return;
        }
        this.watchHistory = success.data;
        for(let i of this.watchHistory)
        {
          if(i.videoInfo)
          i.updatedAt = i.videoInfo.updatedAt
        }
        let obj: any = {};
        let arr: Array<any> = _.sortBy(this.watchHistory, ['updatedAt']);
        let arrnew:any = []
        for(let i of arr)
        {
          if(i.videoInfo != null && i.videoInfo != undefined)
          {
            arrnew.push(i)
          }
        }
        arrnew = arrnew.reverse();
        this.watchHistory = arrnew
     //   arr = arr.reverse();
        let temp3: Array<any> = this.splitList(arrnew, 4);
        this.top3 = temp3[0];
        this.dashboardObj.spinner = false;
        this.getSharedVideos();
        this.getLikedVideos();
      }, 
      error=>{

      });
  }

  // Split list into a group of n
  splitList(source: Array<any>, chunkSize: any): Array<any>{
    let chunks = _.chunk(source, chunkSize);    
    return chunks;
  }

  // Follow user
  followUser(id:any) {
    $('#'+id).prop('disabled', true);
    let obj: any = {
      'type': 'follow',
      'followToUserID': this.userId
    };
    this.urlService.followUser(obj).subscribe(success => {
      //this.toastr.success('User subscription added');
      this.userData.userinfo.followers.push({_id:this.currentUser})
      this.iAmFollowing = true;
      $('#'+id).prop('disabled', false);
    }, error => {
      $('#'+id).prop('disabled', false);
      //this.toastr.error('Error')
    });
  }

  unfollowUser(id:any)
  {
    $('#'+id).prop('disabled', true);
    let obj: any = {
      'type': 'unfollow',
      'followToUserID': this.userId
    };
    this.urlService.followUser(obj).subscribe(success => {
     // this.toastr.success('User subscription added');
     this.userData.userinfo.followers.pop();
     this.iAmFollowing = false;
     $('#'+id).prop('disabled', false);
    }, error => {
      $('#'+id).prop('disabled', false);
      //this.toastr.error('Error')
    });
  }

  showVideo(id: any) {
    this.router.navigate(['videos'], { queryParams: { video: id } });
  }

  ngAfterViewInit() {
    $('.v-choice-carousel').owlCarousel({
      loop: false,
      margin: 30,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 4,
        }
      }
    });
  }





  getViewerChoices()
  {
    //viewerChoices
   
    this.spinners.sixth = true;
    this.urlService.getViewerChoiceHighlight(this.userId).subscribe(
      success =>{
        this.viewerChoices = success.data.reverse();
        for(let i of this.viewerChoices)
        {
          console.log(i.publishedVideo.totallevel)
          i.publishedVideo.currentLevel = 2;
          if(i.publishedVideo.currentLevel >= i.publishedVideo.totallevel)
            {
              i.nextDisabled = true;
        }
        }
      
        
        
        
        this.spinners.sixth = false;
        setTimeout(()=>{
              $('.v-choice-carousel').owlCarousel({
                loop:false,
                margin:15,
                nav: true,
                dots: false,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
                freeDrag: false,
                responsive:{
                  0: {
                    items: 1,
                  },
                  600: {
                    items: 2,
                  },
                  1000: {
                    items: 4,
                  }
                }
              })
              
              for(let i of this.viewerChoices){
                i.prevDisabled = true;
                this.plotChilds(i)
                }
        
          },500)
          
      },error =>{}
    )
  }

  plotChilds(i:any)
{
  i.spinner  = true;

  i.childVideos = i.childVideos.sort(function(a:any, b:any){
    return b.viewCount - a.viewCount;
  });
  
  $('.childv-choice-carousel'+i.publishedVideo._id).owlCarousel('destroy'); 
  setTimeout(()=>{
   
    $('.childv-choice-carousel'+i.publishedVideo._id).on('initialized.owl.carousel changed.owl.carousel', function(e) {
      if (!e.namespace)  {
        return;
      }
      var carousel = e.relatedTarget;
      $('.slider-counter'+i.publishedVideo._id).text('Choices '+(carousel.relative(carousel.current())+1)+ ' of ' + carousel.items().length);
    }).owlCarousel({
      items: 1,
      loop:true,
      margin:0,
      nav:false,
      dots: true,
    });
   
},1000)
this.plotchart(i)

}
  

plotchart(i:any)
{
  if(i.chart)
  {
    i.chart.destroy();
  }

  let data = []
  let colorData = ['#A649C7','#EFB43A','#3DC99C','#DB6A8E'];
  let index = 0;
  let totalView = 0;
  for(let j of i.childVideos)
  {
    data.push({label:j.name,y:j.viewCount,color:colorData[index]})
    totalView = totalView + j.viewCount
    index++;
  }
  i.totalView = totalView;
  if(totalView == 0){
    i.noViews = true;
  }
  let id = "chartContainer"+i.publishedVideo._id;
  if(!i.noViews){
  i.chart = new CanvasJS.Chart(id, {
    animationEnabled: true,
    backgroundColor: "#f5f7f6",
    data: [{
      type: "doughnut",
      startAngle: 0,
      indexLabelFontSize:0,
      indexLabelPlacement: "inside",
      innerRadius: "70%",
      //innerRadius: 60,
      
      toolTipContent: "<b>{label}:</b> {y} (#percent%)",
      dataPoints: data
    }]
  });
  i.chart.render();

}
i.spinner  = false;

}
nextVpopularPath(i){
if(i.childVideos.length < 1)
{
  return;
}
i.publishedVideo.currentLevel++;
if(i.publishedVideo.currentLevel >= i.publishedVideo.totallevel)
{
  i.nextDisabled = true;
}
i.spinner  = true;
  let nectItem  = i.childVideos[0]
  this.urlService.getTopChoices(nectItem._id).subscribe(
    success =>{
     
      //i.childVideos
      let correctArray:any = []
     for(let j of success.data)
     {
      j.video.viewCount = j.viewCount
      correctArray.push(j.video)
     }
     if(correctArray.length <1)
     {
       i.nextDisabled = true;
       i.spinner  = false;
       this.toastr.warning('No child found!')
       return;
     }
     
     i.childVideos = correctArray;
     i.prevDisabled = false;
      this.plotChilds(i)
       
      
      //console.log('xssd',correctArray)
    })
  }
  preVpopularPath(i)
  {
    i.spinner  = true;
    this.urlService.getTopChoices(i.publishedVideo._id).subscribe(
      success =>{
       
        //i.childVideos
        let correctArray:any = []
       for(let j of success.data)
       {
        j.video.viewCount = j.viewCount
        correctArray.push(j.video)
       }
       
       
       i.childVideos = correctArray;
       i.prevDisabled = true;
       i.nextDisabled = false;
       i.publishedVideo.currentLevel = 2;
       if(i.publishedVideo.currentLevel >= i.publishedVideo.totallevel)
        {
          i.nextDisabled = true;
        }
        this.plotChilds(i)
         
        
        //console.log('xssd',correctArray)
      })

  }
  
  calculatePercentage(childViewcount: any, totalViews: any): any {
    if (!totalViews) return 0;
    let percantage = (childViewcount / totalViews) * 100;
    return Math.round(percantage);
  }



  getMatchedValue()
  {
   
    this.getCommonDatarecentFollowers(this.recentFollowers[0])
    
  }

  getCommonDatarecentFollowers(i)
  {
    
    if(!(!!i)){
      this.getCommonDatarecentFolloweing(this.recentFollowing[0])
      return;
    }
    let item = this.userId+','+i.info._id;
    //let item = this.dashboardObj.userId+','+17;
     this.urlService.getCommonItem(item).subscribe(
      success=>{
       
        this.recentFollowers[this.index].info.content = success.data/this.watchHistory.length;
        if(this.watchHistory.length <1)
        {
          this.recentFollowers[this.index].info.content =success.data/success.data

        }
        this.recentFollowers[this.index].info.isshow = true
        this.index++;
        if(this.index ==this.recentFollowers.length ){
          this.index = 0
          this.getCommonDatarecentFolloweing(this.recentFollowing[0])
        }
        else if(this.index > 4){
          this.index = 0
          this.getCommonDatarecentFolloweing(this.recentFollowing[0])
        }
        else{
          this.getCommonDatarecentFollowers(this.recentFollowers[this.index])
        }
       
      },
      error =>{
        this.recentFollowers[this.index].info.content = 0;
        this.recentFollowers[this.index].info.isshow = true
        this.index++;
        if(this.index ==this.recentFollowers.length ){
          this.index = 0
          this.getCommonDatarecentFolloweing(this.recentFollowing[0])
        }
        else if(this.index > 4){
          this.index = 0
          this.getCommonDatarecentFolloweing(this.recentFollowing[0])
        }
        else{
          this.getCommonDatarecentFollowers(this.recentFollowers[this.index])
        }

      })
          // i.topViewed = success.data;
  }







  getCommonDatarecentFolloweing(i)
  {
    
    if(!(!!i)){
      //this.getCommonDatarecentFolloweing(this.recentFollowing[0])
      return;
    }
    let item = this.userId+','+i.userinfo._id;
    //let item = this.dashboardObj.userId+','+17;
     this.urlService.getCommonItem(item).subscribe(
      success=>{
       
        this.recentFollowing[this.index].userinfo.content = success.data/this.watchHistory.length
        if(this.watchHistory.length <1)
        {
          this.recentFollowing[this.index].userinfo.content =success.data/success.data

        }
        this.recentFollowing[this.index].userinfo.isshow = true
        this.index++;
        if(this.index == this.recentFollowing.length){
            
        }
        else if(this.index > 4){
          
        }
        else{
          this.getCommonDatarecentFolloweing(this.recentFollowing[this.index])
        }
       
      },
      error=>{

        this.recentFollowing[this.index].userinfo.content = 0
        this.recentFollowing[this.index].userinfo.isshow = true
        this.index++;
        if(this.index == this.recentFollowing.length){
            
        }
        else if(this.index > 4){
          
        }
        else{
          this.getCommonDatarecentFolloweing(this.recentFollowing[this.index])
        }
       
      })
          // i.topViewed = success.data;
  }

}
