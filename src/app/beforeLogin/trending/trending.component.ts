import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../../crud.service';
import * as _ from 'lodash';
declare var $: any;
declare var owlCarousel:any;
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit, AfterViewInit,OnDestroy  {

  public spinners:any = {first:false,second:false,third:false}
  public recommendedVideos: Array<any> = [];
  public topViewedVideos: Array<any> = [];
  public todaysTopViewed: Array<any> = [];
  public popularCreators: Array<any> = [];
  public popularCategories: Array<any> = [];
  public top5Categories: Array<any> = [];
  public highlyInteractiveVideos: Array<any> = [];

  public todaysTop_1: any = {};
  public todaysTop_2: any = {};
  public todaysTop_234: Array<any> = [];
  public topViewed_1: any = {};
  public topViewed_234: Array<any> = [];
  public topViewedByCategory: Array<any> = [];

  SlideOptions = { items: 5, dots: false, nav: true };  
  CarouselOptions = { items: 6, dots: true, nav: true };
  
  // Slider with 3 slides
  SlideOptions3 = { items: 2, dots: false, nav: true };  
  CarouselOptions3 = { items: 6, dots: true, nav: true };

  SlideOptions1 = { items: 1, dots: false, nav: true };


  constructor(public apiService: CrudService, 
    public router: Router) { }

  ngOnInit() {
    this.spinners.first = true;
    this.spinners.second = true;
    this.spinners.third = true;
    this.spinners.fourth = true;
    $('body').addClass('treandingPage')

  if (window.localStorage.getItem('token')) {
     
  } else {
    if (window.localStorage.getItem('anonymousToken')) {
    } else {
      this.getAnonymousUser();
    }
  }

  this.getData();
  this.checkwidth()
}
ngOnDestroy(){
  $('body').removeClass('treandingPage')
}


getAnonymousUser() {
  this.apiService.getAnonymousUser().subscribe(
    success => {
      if (window.localStorage.getItem('anonymousToken')) {
      } else {
        window.localStorage.setItem('anonymousToken', success.data.token);
      }
    }
  );
}

showCategory(id: any) {

  this.router.navigate(['category'], { queryParams: { category: id } });

}

checkwidth()
{
  if(window.innerWidth < 992)
  {
    this.SlideOptions = { items: 1, dots: false, nav: true };
  }
}
  getData() {
    this.apiService.getLandingPageData().subscribe(
      success => {
        // Today's top viewed
        let arrTodaysTop: Array<any> = success.data.todaysTopViewed;
        arrTodaysTop = _.sortBy(arrTodaysTop, ['viewCount']);
        arrTodaysTop = arrTodaysTop.reverse();
        this.todaysTopViewed = _.take(arrTodaysTop, 4);
        this.todaysTop_1 = this.todaysTopViewed[0];
        this.todaysTop_2 = this.todaysTopViewed[1];
        this.todaysTop_234 = _.takeRight(this.todaysTopViewed, 3);
        this.spinners.first = false;

        //Popular categories
        let arrPopCategories: Array<any> = success.data.popularCategories;
        this.popularCategories = arrPopCategories;
        for (let cat of this.popularCategories) {
          if (cat.categoryName === 'Music' || cat.categoryName === 'Gaming' || cat.categoryName === 'News' || cat.categoryName === 'Entertainment' || cat.categoryName === 'Beauty & Fashion') {
            this.top5Categories.push(cat);
          }
        }
        for (let t of this.top5Categories) {
          if (t.categoryName === 'Music') {
            t.subHeading = 'Move that beat';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Music.png';
          } else if (t.categoryName === 'Gaming') {
            t.subHeading = 'Love your game more';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Gaming.png';
          } else if (t.categoryName === 'News') {
            t.subHeading = 'Catch up';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page News.png';
          } else if (t.categoryName === 'Entertainment') {
            t.subHeading = 'Movie time';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Movies.png';
          } else if (t.categoryName === 'Beauty & Fashion') {
            t.subHeading = 'I am what I am';
            t.categoryImage = '../../../assets/images/Images for Trending and Landing Page/Landing Page Fashion.png';
          }
        }
        let maxViewedIn: Array<any> = arrPopCategories.map((category)=>category.maxViewedVideo.data);
        for (let i of maxViewedIn) {
          for (let j of i) {
            this.topViewedByCategory.push(i[0]);
            // this.topViewedByCategory.push(i[1]);
            break;
          }
        }
        this.spinners.second = false;
        setTimeout(() => {
          $('.categories').owlCarousel({
            loop:false,
            margin:12,
            nav:true,
            dots:false,
            responsive:{
                0:{
                  items:1
                },
                500:{
                  items:2
                },
                800:{
                  items:3
                },
                992: {
                  items:4
                },
                1200:{
                    items:5
                }
            }
          });
        }, 100);

        // Popular creators
        let arrPopCreators: Array<any> = success.data.popularCreators;
        arrPopCreators = _.sortBy(arrPopCreators, ['updatedAt']);
        arrPopCreators = arrPopCreators.reverse();
        for(let i of arrPopCreators)
        {
          if(!!i.videoInfo)
          this.popularCreators.push(i)  
        }
        this.spinners.fourth = false;
        setTimeout(() => {
          $('.creators').owlCarousel({
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
                stagePadding: 100
              },
              1100:{
                items:2,
                stagePadding: 100
              },
              // 800:{
              //     items:3
              // }
            }
          });
        }, 500);

        // Highly interactive
        let arrHighlyInt: Array<any> = success.data.highlyInteractiveVideos;
        arrHighlyInt = _.sortBy(arrHighlyInt, ['updatedAt']);
        arrHighlyInt = arrHighlyInt.reverse();
        this.highlyInteractiveVideos = _.take(arrHighlyInt, 6);
        this.spinners.third = false;
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
                stagePadding: 100
              },
              1100:{
                items:2,
                stagePadding: 100
              }
            }
          });
        }, 100);

        let c1: Array<any> = [];
        let c2: Array<any> = [];
        let c3: Array<any> = [];

        c1 = this.prepareRankedList(this.popularCategories, 1, c1);
        c2 = this.prepareRankedList(this.popularCategories, 2, c2);
        c3 = this.prepareRankedList(this.popularCategories, 3, c3);
      }
    );
  }

  // Show video
  showVideo(videoId: any) {
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }

  // Show user profile
  showUser(userId: any) {
    this.router.navigate(['public-profile'], { queryParams: { user: userId } });
  }

  prepareRankedList(source: Array<any>, rank: number, rankedList: Array<any>): Array<any> {
    if (rank > 3) {
    } else {
      for (let i of source) {
        rankedList.push(i.maxViewedVideo[rank - 1]);
      }
      return rankedList;
    }
  }



  ngAfterViewInit() {
    $('.interact-slider-start').owlCarousel({
      loop:false,
      margin:15,
      nav:true,
      dots:false,
      responsive:{
          0:{
              items:1
          },
          768:{
            items:2,
            stagePadding: 0
          },
          992:{
            items:1,
            stagePadding: 110
          },
          1500:{
            items:2,
            stagePadding: 110
          },
      }
    });
    
    $('.interact-slider-5').owlCarousel({
      loop:false,
      margin:12,
      nav:true,
      dots:false,
      responsive:{
          0:{
              items:1
          },
          500:{
            items:2
          },
          800:{
              items:3
          },
          1200:{
              items:5
          }
      }
    });

    // One time show 3 slide
    $('.interact-slider-3').owlCarousel({
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
          stagePadding: 100
        },
        1100:{
          items:2,
          stagePadding: 100
        },
        // 800:{
        //     items:3
        // }
      }
    });
  }

}
