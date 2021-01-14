import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../../crud.service';
import * as _ from 'lodash';
import { sequenceEqual } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-new-landing-page',
  templateUrl: './new-landing-page.component.html',
  styleUrls: ['./new-landing-page.component.css']
})
export class NewLandingPageComponent implements OnInit,OnDestroy {

  public spinners:any = { first:false, second:false, third:false };

  public todaysTopViewed:any= [];
  public trendingVideos: Array<any> = [];
  public highlyInteractiveVideos: Array<any> = [];
  public latestVideos:Array<any> = [];
  public popularCategories: Array<any> = [];
  public top4Categories: Array<any> = [];
  public topChoices: Array<any> = [];
  recommendedVideos:any = []
  allTemVideos:any = {trendingVideos:[],latestVideos:[],recommendedVideos:[]}

  constructor(private router: Router,
    private apiService: CrudService) { }
    myobj:any=[
      {id:1,name:'Option-1',img:'assets/img/angular.png'},
      {id:1,name:'Option-2',img:'assets/img/angular.png'},
      {id:1,name:'Option-3',img:'assets/img/angular.png'},
    ]
    ngOnDestroy(){
      $('body').removeClass('landingPage')
    }
 width:any;
  ngOnInit() {
    this.spinners.first = true;
    $('body').addClass('landingPage')
    this.spinners.second = true;

    if (window.localStorage.getItem('token')) {
      this.getAllTopVideos();
    } else {
      if (window.localStorage.getItem('anonymousToken')) {
        this.getAllTopVideos();
      } else {
        this.getAnonymousUser();
      }
    }
   this.getCurrentWidth()
     }
     posterImg:boolean;
     getCurrentWidth(){
       let width= window.innerWidth;
       this.width=width
       console.log(width);
       if(width < 991){
         this.posterImg=false;
        
       }else{
         this.posterImg=true;
        
       }
     }
  getAnonymousUser() {
    this.apiService.getAnonymousUser().subscribe(
      success => {
        if (window.localStorage.getItem('anonymousToken')) {
        } else {
          window.localStorage.setItem('anonymousToken', success.data.token);
        }
        this.getAllTopVideos();
      }
    );
  }

  getAllTopVideos() {
    this.apiService.getAllTopVideos().subscribe(
      success => {
        //console.log(success.data);
        this.todaysTopViewed = success.data[0].topVideoList;
        if(!(!!success.data[0].thumbnailadmin))
        {
          this.todaysTopViewed.thumbnailadmin = this.todaysTopViewed.poster
        }
        else
        {
          this.todaysTopViewed.thumbnailadmin = success.data[0].thumbnailadmin
        }
        this.spinners.first = false;
        this.getLandingPageData()

      }, 
      error => {

      });
  }

  getTopChoices(item) {
   if(this.width > 991){ 
    if(!!item.topViewedChoices)
    {
      return;
    }
    item.spinner = true;
    this.apiService.getTopChoices(item.id).subscribe(
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
   }else{
     this.showVideo(item.id)
   }
 
  }

  
  showVideoChoices(videoId: any) {
    //console.log(t)
    localStorage.setItem('isChoice','true');
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }

  calculatePercentage(childViewcount: any, totalViews: any): any {
    let percantage = (childViewcount / totalViews) * 100;
    return Math.round(percantage);
  }

  getLandingPageData() {
    this.apiService.getrecommendedVideos().subscribe(
      success => {
        // Today's top viewed
        
        // Trending
        console.log(success.data)
        this.spinners.second = false;

        if(!!success.data.recommended)
        {
          this.recommendedVideos = success.data.recommended
          
        }
        else
        {
          this.recommendedVideos = success.data
          for(let i of this.recommendedVideos)
          {
            i.user = i.userInfo
          }

        }
        
       
        for(let i of this.recommendedVideos)
        {
          i.id = i._id;
         
        
        }
        setTimeout(() => {
          $('.reocmends').owlCarousel({
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
        }, 500);
        this.getTrendinfData()
      })
     
    }


    getTrendinfData(){

    this.apiService.gettopViewedVideos().subscribe(
        success => {
    let arrTrending: Array<any> = success.data;
    arrTrending = _.sortBy(arrTrending, ['viewCount']);
    arrTrending = arrTrending.reverse();
    this.trendingVideos = _.take(arrTrending, 5);
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
        }, 500);

        this.getHighltInteractive()
        })
     
      }


      getHighltInteractive(){

        this.apiService.gethighlyInteractiveVideos().subscribe(
            success => {

        let arrHighlyInt: Array<any> = success.data;
        arrHighlyInt = _.sortBy(arrHighlyInt, ['totalchild']);
        arrHighlyInt = arrHighlyInt.reverse();
        this.highlyInteractiveVideos = _.take(arrHighlyInt, 6);
           
    
        setTimeout(() => {
          $('.high').owlCarousel({
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
        }, 100);
        this.getlatestVideo()
      })
      
    }


    getlatestVideo()
    {
        // Latest Videos

        this.apiService.getlatestPublishedVideos().subscribe(
          success => {
        this.latestVideos = success.data;
        for(let i of this.latestVideos)
        {
          i.id = i._id
        }
        setTimeout(() => {
          $('.latest').owlCarousel({
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
        }, 100);
          this.getPopCategpries()
      })
    
    }

        // Popular categories

        getPopCategpries(){
          this.apiService.getpopularCategories().subscribe(
            success => {
          
        let arrPopCategories: Array<any> = success.data;
        arrPopCategories = _.sortBy(arrPopCategories, ['totalVideos']);
        arrPopCategories = arrPopCategories.reverse();
        this.popularCategories = arrPopCategories;
        
        for (let cat of this.popularCategories) {
          if (cat.categoryName === 'Music' || cat.categoryName === 'Gaming' || cat.categoryName === 'Entertainment' || cat.categoryName === 'Beauty & Fashion') {
            this.top4Categories.push(cat);
          }
        }
        for (let t of this.top4Categories) {
          if (t.categoryName === 'Music') {
            t.subHeading = 'Move that beat';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Music.png';
          } else if (t.categoryName === 'Gaming') {
            t.subHeading = 'Love your game more';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Gaming.png';
          } else if (t.categoryName === 'Entertainment') {
            t.subHeading = 'Movie time';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Movies.png';
          } else if (t.categoryName === 'Beauty & Fashion') {
            t.subHeading = 'I am what I am';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Fashion.png';
          }
        }
      }, 
      error => {

      });
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

}
