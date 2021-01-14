import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
declare var owlCarousel:any;
declare var CanvasJS:any;
import{Router,ActivatedRoute} from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import * as _ from 'lodash';
import { isArray } from 'util';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
import { kMaxLength } from 'buffer';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class DashboardComponent implements OnInit, AfterViewInit{

  public finalLoad:any = false
  public spinners:any = {first:false,second:false,third:false,sixth:false}
  public watchHistory:Array<any> = [];
  public top3: Array<any> = [];
  public publishedVideos: Array<any> = [];
  public viewerChoices: Array<any> = [];
  public showIndicators: boolean = true;
  public recentPublished: any;
  public userInfo: any = {};
  public totalMainVideos: any;
  public userID: any;
  public currentuser:any = window.localStorage.getItem('user');

  public followers:Array<any> = [];
  public recentFollowers: Array<any> = [];
  public following:Array<any> = [];
  public recentFollowing: Array<any> = [];
  public topViewedChoices: Array<any> = [];
  public topChoicesLoaded: boolean = false;

  public likedVideos: Array<any> = [];
  public sharedVideos: Array<any> = [];
  public activityList: Array<any> = [];
  public sortedActivityList: Array<any> = [];
  index:any =0;
  public likeCategories: Array<any> = [
    {
      shortcut:0,
      id: '1',
      category: 'Laugh',
      emoji: '../../../assets/images/videoplayer/react-laugh.svg'
    },
    {
      shortcut:1,
      id: '2',
      category: 'Like',
      emoji: '../../../assets/images/videoplayer/react-like.svg'
    },
    {
      shortcut:2,
      id: '3',
      category: 'Dislike',
      emoji: '../../../assets/images/videoplayer/react-dislike.svg'
    },
    {
      shortcut:3,
      id: '4',
      category: 'Question',
      emoji: '../../../assets/images/videoplayer/react-question.svg'
    },
    {
      shortcut:4,
      id: '5',
      category: 'Amazed',
      emoji: '../../../assets/images/videoplayer/react-amazed.svg'
    },
    {
      shortcut:5,
      id: '6',
      category: 'Crying',
      emoji: '../../../assets/images/videoplayer/react-crying.svg'
    },
    {
      shortcut:6,
      id: '7',
      category: 'Angry',
      emoji: '../../../assets/images/videoplayer/react-angry.svg'
    }
  ];

  constructor(public urlService:CrudService, public router:Router) { }
  public dashboardObj:any = {spinner:false, username: '', bio: ''}
  ngAfterViewInit() {
    
    
  }

  ngOnInit() {
    this.currentuser = window.localStorage.getItem('user');
    this.spinners.first = true;
    this.spinners.second = true;
    this.spinners.third = true;
    this.spinners.fourth = true;
    this.spinners.fifth = true;
    this.spinners.sixth = true;
    
       this.urlService.userDetails().subscribe(
        success =>{
          if(success.data.details.category.length < 1)
          {
            this.router.navigate[('complete-profile')]
            return;
          }
          this.dashboardObj = success.data.details;
          this.dashboardObj.username = this.add3Dots(this.dashboardObj.username, 12);
          if(this.dashboardObj.bio.length > 0)
          this.dashboardObj.bio[0] = this.add3Dots(this.dashboardObj.bio[0], 50);
          //this.dashboardObj.spinner = true;
          this.userID = success.data.details._id;
         
          this.totalMainVideos = success.data.totalmainvideos;
          this.spinners.first = false;
          this.urlService.getUserInfo(this.userID).subscribe(
            success=>{

              this.userInfo = success.data.userinfo;
              this.followers = success.data.followersinfo;
              // for (const [key, value] of Object.entries(success.data.followersinfo)) {
              //   this.recentFollowers.push(value)
              // }


              let arr: Array<any> = _.sortBy(this.followers, ['createdAt']);
              arr = arr.reverse();
              
              this.recentFollowers = arr;
              
             
             
              // for (const [key, value] of Object.entries(success.data.followinginfo)) {
              //   this.recentFollowing.push(value)
              // }
              //this.recentFollowing = success.data.followinginfo;
              this.following = success.data.followinginfo;
              let arr2: Array<any> = _.sortBy(this.following, ['createdAt']);; 
              arr2 = arr2.reverse();
             
              this.recentFollowing = arr2;
              
              
              
              // console.log(this.recentFollowing)
              
              this.publishedVideos = success.data.publishedVideo;
              // let temp: Array<any> = this.publishedVideos;
              // let index = 0
              // for(let i of temp)
              // {
              //   if(index < 6)
              //   this.viewerChoices.push(i)
              
              //   index++;
              // }

                 //this.viewerChoices = temp;

             
            
              // this.publishedVideos = this.publishedVideos.reverse();
              // this.getViewerChoices();
              let sortedArr = _.sortBy(this.publishedVideos, ['updatedAt']);
              this.recentPublished = sortedArr[0];

            
              this.getWatchHistory();
              this.getViewerChoices()
              this.spinners.second = false;
            });
        });
    
  }
  getRandowmValue()
  {
   
    return Math.floor((Math.random() * 70) + 30);;
  }
  getViewerChoices()
  {
    //viewerChoices
   
    this.spinners.sixth = true;
    this.urlService.getViewerChoiceHighlight(this.userID).subscribe(
      success =>{
        this.viewerChoices = success.data.reverse();
        for(let i of this.viewerChoices)
        {
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
                    items: 1,
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
  if(!!i.chart)
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
  add3Dots(s: any, limit: number): string {
    // var dots = "...";
    // if(s.length > limit) {
    //   s = s.substring(0,limit) + dots;
    // }
    return s;
  }
  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }
  

  getWatchHistory() {
    this.urlService.getWatchHistoryByUser(this.userID).subscribe(
      success=>{
        this.watchHistory = success.data;
        if(!isArray(this.watchHistory))
        {
          this.watchHistory = [];
          this.getLikedVideos();
          this.spinners.third = false;
          return
        }
        for(let i of this.watchHistory)
        {
          if(i.videoInfo)
          i.updatedAt = i.videoInfo.updatedAt
        }
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
        let temp3: Array<any> = this.splitList(arrnew, 4);
        this.top3 = temp3[0];
        this.getLikedVideos();
          this.spinners.third = false;
      
        
   
       // console.log(this.top3)
      }, 
      error=>{

      });
  }

  // Get shared videos
  getSharedVideos() {
    this.urlService.getUserShares(this.userID).subscribe(
      success => {
        if(!isArray(success.data)){
          this.sharedVideos = []
        }
        else{
        this.sharedVideos = success.data.reverse();
        }
        this.getMatchedValue()
    
      });
  }

  showVideo(videoId: any) {
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }
  
  userProfile(id:any){
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
  }

  // Get liked videos
  getLikedVideos() {
    this.urlService.getLikedVideos(this.userID).subscribe(
      success=>{
        // console.log(success.data);
        // this.likedVideos = success.data;
        if(!isArray(success.data)){
          this.likedVideos = []
        }
        else{
        for (const [key, value] of Object.entries(success.data)) {
          this.likedVideos.push(value)
        }
        
        this.likedVideos = this.likedVideos.reverse();
      }
      this.spinners.fifth = false;
        this.getSharedVideos();
        this.getUserActivity();
       
       
      });
  }

  // Get activity
  getUserActivity() {
    this.urlService.getUserActivity().subscribe(
      success=>{
        //console.log('activity data: ', success.data);
        if (!isArray(success.data)) {
          this.activityList = []
        }
        else {
          for (let i of success.data) {
            this.activityList.push(i);
          }

          for (let a of this.activityList) {
            a.formattedTime = new Date(a.activityTime);
            // console.log('time: ', a.formattedTime);
          }
          this.sortedActivityList = _.sortBy(this.activityList, ['formattedTime']);
          this.sortedActivityList = this.sortedActivityList.reverse();
          for(let i=this.sortedActivityList.length-1; i>0; i--){
            if(!(!!this.sortedActivityList[i].videoInfo))
            {
              this.sortedActivityList.splice(i,1)
            }
          }
          // for (const [key, value] of Object.entries(success.data)) {
          //   this.activityList.push(value);
          // }


        }
        this.spinners.fourth = false;

      //  this.getUserChoices()
      });
  }

  //get user choice

  // getUserChoices()
  // {
  //   for(let i of this.viewerChoices){
  //     this.getViewerChoices(i);
  //     this.getTopViewedChild(i);
  //   }
  //   this.spinners.sixth  =  false;
  //   setTimeout(()=>{
  //     $('.v-choice-carousel').owlCarousel({
  //       loop:false,
  //       margin:15,
  //       nav:true,
  //       dots: false,
  //       responsive:{
  //         0: {
  //           items: 1,
  //         },
  //         600: {
  //           items: 2,
  //         },
  //         1000: {
  //           items: 4,
  //         }
  //       }
  //   })
  //   })
  // }

  // getViewerChoices(i:any) {
    // this.urlService.getChildVideosAll(i._id).subscribe(
    //   success => {
        // i.allChildsData = success.data
        // i.isLoadedTrue = true;
      //   setTimeout(()=>{
      //     $('.childv-choice-carousel'+i._id).owlCarousel({
      //       loop:true,
      //       margin:15,
      //       nav: true,
      //       dots: true,
      //       responsive:{
      //         0: {
      //           items: 1,
      //         },
      //         600: {
      //           items: 1,
      //         },
      //         1000: {
      //           items: 1,
      //         }
      //       }
      //     })
      // })
      // });
  
  
// }

getTopViewedChild(i:any) {
  this.urlService.getTopViewedChild(i._id).subscribe(
    success=>{
      this.topViewedChoices = success.data;
        // i.topViewed = success.data;
        for (let k of this.topViewedChoices) {
          k.percentage = this.calculatePercentage(k.viewCount, i.viewCount);
          // k.progress = this.calculatePercentage(k.viewCount, i.viewCount)+'%';
        }
        // console.log('======', this.topViewedChoices);
        i.topViewed = this.topViewedChoices;
        this.topChoicesLoaded = true;
    }, error=>{

    }
  );
}

calculatePercentage(childViewcount: any, totalViews: any): any {
  if (!totalViews) return 0; 
  let percantage = (childViewcount / totalViews) * 100;
  // console.log(percantage + ' %');
  return Math.round(percantage);
}

  // Split list into a group of n
  splitList(source: Array<any>, chunkSize: any): Array<any>{
    let chunks = _.chunk(source, chunkSize);    
    return chunks;
  }

  getEmoji(cat:any){
    //console.log(cat)
    if(cat == '1')
    return this.likeCategories[0].emoji

    if(cat == '2')
    return this.likeCategories[1].emoji

    if(cat == '3')
    return this.likeCategories[2].emoji

    if(cat == '4')
    return this.likeCategories[3].emoji

    if(cat == '5')
    return this.likeCategories[4].emoji

    if(cat == '6')
    return this.likeCategories[5].emoji

    if(cat == '7')
    return this.likeCategories[6].emoji
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
    let item = this.dashboardObj._id+','+i.info._id;
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
    let item = this.dashboardObj._id+','+i.userinfo._id;
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
