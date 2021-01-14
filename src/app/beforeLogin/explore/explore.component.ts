import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../../crud.service';
import * as _ from 'lodash';
import { sequenceEqual } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'explorePage',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExplorePageComponent implements OnInit,OnDestroy {

  public spinners:any = false;

  public todaysTopViewed:any= [];
  public customVideos: Array<any> = [];
  public highlyInteractiveVideos: Array<any> = [];
  public latestVideos:Array<any> = [];
  public popularCategories: Array<any> = [];
  public top4Categories: Array<any> = [];
  public topChoices: Array<any> = [];
  recommendedVideos:any = []
  allNew:any = []
  explore: any = 'two';
  nametext:any = '';
  isAddingNew:any  = false;
  randomVideos:any = []
  pafingationValue:any = 0;
  isFinished:any = false
  ectionspinner:any = false

  constructor(private router: Router,
    private apiService: CrudService,public toastr: ToastrService) { }

    ngOnDestroy(){
      $('body').removeClass('landingPage')
    }

  ngOnInit() {
    this.spinners = true;
    $('body').addClass('landingPage')
    
    if (window.localStorage.getItem('token')) {
      this.categoryWiseData();
    } else {
      if (window.localStorage.getItem('anonymousToken')) {
      } else {
      
      }
      this.getAnonymousUser();
    }
    
   ;
  }

  getAnonymousUser() {
    this.apiService.getAnonymousUser().subscribe(
      success => {
        if (window.localStorage.getItem('anonymousToken')) {
         
        } else {
          window.localStorage.setItem('anonymousToken', success.data.token);
         
        }
        this.categoryWiseData();
      }
      
    );
  }

  exploreType(type:any)
  {
    this.explore = type;
  }
  
  showVideoChoices(videoId: any) {
    //console.log(t)
    // localStorage.setItem('isChoice','true');
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }

  // calculatePercentage(childViewcount: any, totalViews: any): any {
  //   let percantage = (childViewcount / totalViews) * 100;
  //   return Math.round(percantage);
  // }



allCategory()
{
  this.topChoices = [];
  for(let i of this.popularCategories)
  {
    i.isNotVisible = true;
    i.checked = false;
  }
  $('.intial').addClass('active')
}
showCategoryToggle(j)
{
  if(j.checked){
    this.topChoices.push(j.category)
  }
  else{
    for(let i=this.topChoices.length -1; i>-1;i--)
  {
    if(this.topChoices[i] == j.category)
    {
      this.topChoices.splice(i,1)
    }
  }
 
  }

  if(this.topChoices.length == 0)
  {

    $('.intial').addClass('active')
      for(let i of this.popularCategories)
        {
          i.isNotVisible = true;
        }
  }
  else{
    $('.intial').removeClass('active') ;
    for(let i of this.popularCategories)
    {
      i.isNotVisible = false;
    }
    for(let i of this.topChoices)
        {
          for(let k of this.popularCategories)
          {
            if(i == k.category)
            {
              k.isNotVisible = true;
              break;
            }
          }
        }
  }
 
}
blurok(test:any)
{
  if(test.length == 0)
  {
    this.nametext = '';
    this.isAddingNew = false
    return;
  }
  this.addNewKeywords(test);

}
addNewKeywords(test:any)
{
  if(test.length <2)
  {
    this.toastr.info('Please add at least 3 character!');
    return;
  }
  this.spinners = true;
  this.apiService.getsearchVideosByKeyword(test).subscribe(
    success => {
      this.nametext = '';

    this.allNew.push({name:test,videos:success.data,checked: true})
    //this.customVideos.push({name:test,videos:success.data,checked: true})
    this.createCrousel();
  //  ? this.spinners = false;
      //this.customVideos.push
    })
}
focusOnInout()
{
  setTimeout(()=>{
  $('#chch').focus();
})
}
  categoryWiseData() {
    this.spinners = true;
    this.allNew = []; 
    this.popularCategories = [];
    this.topChoices = [];
    this.apiService.getCategorywiseData().subscribe(
      success => {
        // Today's top viewed
        for(let i of success.data)
        {
          i.isNotVisible = true;
          if(i.videos.length > 0)
          {this.popularCategories.push(i)
            
          }

        }
        
        this.popularCategories = this.popularCategories.sort((a:any,b:any)=>{
            if(a.category < b.category)
            {
              return -1;
            }
            return 1;
        })
      //   setTimeout(()=>{
      //   $('.cat-list label').removeClass('active');
      // })
        // Trending
       
       
       // this.recommendedVideos = success.data.recommendedVideos
       
       this.createCrousel();
       
      }, 
      error => {

      });
  }

  getexploreVideos()
  {
    
    this.spinners = true;
    this.isFinished = false;
    this.pafingationValue = 0
    this.customVideos = [];
    this.allNew = []; 
    this.apiService.getexploreVideos().subscribe(
      success => {
        // Today's top viewed
       
        
          this.customVideos.push({name:'Recommended Videos', videos:success.data.recommended,checked: true})
          this.customVideos.push({name:'Latest Videos', videos:success.data.latestPublishedVideos,checked: true})
        this.getRandomVideos()
        
       this.createCrousel();
      })

  }

  getRandomVideos()
  {
    this.pafingationValue++;
    this.ectionspinner = true;
    this.randomVideos = []
      this.apiService.getgetRandomVideos(this.pafingationValue).subscribe(
        success => {
          this.ectionspinner = false;
          if(success.data.length == 0)
          {
            this.isFinished = true;
            return;
          }
          for(let i of success.data)
          {
            this.randomVideos.push(i)
          }
        
        })
          // Today's top viewed
  }

  getTopChoices(item) {
   
    if(!!item.topViewedChoices)
    {
      return;
    }
    item.spinner = true;
    this.apiService.getTopChoices(item._id).subscribe(
      success => {
        // console.log('Top Choices: ', success.data);
        let topChoices = success.data;
        let totalViews = 0;
        for (let c of topChoices) {
          totalViews = c.viewCount + totalViews;
        }

        for (let c of topChoices) 
      {
        if(totalViews == 0){
          c.percentage = 0;  
          c.progress = 0;
        }
        else{
        c.percentage = this.calculatePercentage(c.viewCount, totalViews);
        c.progress = this.calculatePercentage(c.viewCount, totalViews)+'%';
      }
      }
      
           item.topViewedChoices = topChoices;
           item.spinner = false;
          
      
      }, 
      error => {

      });
  }
  calculatePercentage(childViewcount: any, totalViews: any): any {
    let percantage = (childViewcount / totalViews) * 100;
    return Math.round(percantage);
  }


  showCategory(id: any) {
    this.router.navigate(['category'], { queryParams: { category: id } });
  }

  // Show video
  showVideo(videoId: any) {
    //console.log(t)
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }

  // Show user profile
  showUser(userId: any) {
    this.router.navigate(['public-profile'], { queryParams: { user: userId } });
  }

  leftButtonClick()
  {
    
      $('.scroller').animate({
        scrollLeft: "-=200px"
      }, "slow");
   
  }
  rightButtonClick()
  {
      $('.scroller').animate({
        scrollLeft: "+=200px"
      }, "slow");
    
    
  }
  createCrousel()
  {
    setTimeout(() => {
      $('.trending').owlCarousel({
        loop:false,
        margin:15,
        nav:true,
        dots:false,
        responsive:{
          0:{
              items:1
          },
          800:{
            items:1,
            
          },
          1100:{
            items:3,
            
          },
          // 800:{
          //     items:3
          // }
        }
      });
      this.spinners = false;
    }, 1000);

  }

}
