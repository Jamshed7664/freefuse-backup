import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import{Router} from '@angular/router';
import { isArray } from 'util';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
declare var $;
@Component({
  selector: 'headerone',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public urlService:CrudService, 
    public router:Router,
    public toastr: ToastrService) {
      document.addEventListener('click', this.offClickHandler.bind(event));
     }

  public headerObj:any = {spinner:false,data:{}};
  public searchText: any = '';
  public results: Array<any> = [];
  public showSpinner: boolean = false;
  public resArray: boolean  = false;
  public resObject: boolean = false;
  public users:any = [];
  public trimmedUser:any = [];
  public isLoggedIN: any =  false;
  public notifications: Array<any> = [];
  public allnotifications: Array<any> = [];
  public notificationsCount: any = 0;
  nonViwed:any = [];
  offClickHandler(event:any) {
   // this.showSpinner = false;
    $('.search-dropdown').hide();

}

clickOut(e:any)
{
  this.showSpinner = false;
  e.stopPropagation();
}
  ngOnInit() {
    $('.search-dropdown').hide();
    if(window.localStorage.getItem('token') == null && window.localStorage.getItem('token') == undefined){
      this.isLoggedIN = false;
      //$('.search-dropdown').hide();
    }
    else{
      this.isLoggedIN = true
    }
    if(this.isLoggedIN){
                this.urlService.userDetails().subscribe(
          success =>{
              this.headerObj.data = success.data.details;  
              window.localStorage.setItem('profilePic',success.data.details.profilePic)
              window.localStorage.setItem('user',success.data.details._id)
          });
        
          
        $('.search-dropdown').hide();
        this.getNotifications();
      }
  }
  closeDropDown()
  {
    this.showSpinner = false;
    $('.search-dropdown').hide();
    this.searchText = '';
  }
  logout()
  {
    this.headerObj.spinner = true;
   
       this.urlService.logout('').subscribe(
         success =>{
          window.localStorage.clear();
          this.router.navigate(['/login']);  
          this.headerObj.spinner = false;
         })
  }

  // Search
  onSearch(e: any) {
    this.urlService.simpleVideoSearch(e.target.value).subscribe(
      success => {
          this.router.navigate(['/search-results'], {queryParams: {search: e.target.value}});
           // $('.search-dropdown').hide();
       
        $('.search-dropdown').hide();
      },
      error => {
      }
    );
  }

  gotoSearch(searc:any)
  {
    $('.search-dropdown').hide();
    this.router.navigate(['/search-results'], {queryParams: {search: searc}});
    
  }
  
  onKeyPress(event: any) {
    this.results = [];
    this.trimmedUser = [];
   
   
    if(this.searchText.length > 1){
      this.showSpinner = true;
    setTimeout(() => {
     
       this.urlService.simpleVideoSearch(event.target.value).subscribe(
        success => {
          if (!_.isEmpty(success.data.searchbyuser)) {
            this.users = success.data.searchbyuser;
            this.trimmedUser = this.users.slice(0, 10);
          }
          if (!_.isEmpty(success.data.searchdata)){
            this.results = success.data.searchdata;
          //  $('.search-dropdown').show();
          }
           $('.search-dropdown').show();
          this.showSpinner = false;
        },);
    }, 1000);
  }
  else
  {
    $('.search-dropdown').hide();
  }
  }

  focusFunction(event: any)
  {
    
    event.stopPropagation();
    setTimeout(()=>{
    if(this.searchText.length > 2){
      $('.search-dropdown').show();
    }
    else
    {
      $('.search-dropdown').hide();
    }
  },300)

  }
  gotoUser(id:any)
  {
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
  }

  

  preventDropDown()
  {
    console.log('sasa')
    $('.search-dropdown').show();
  }

  getNotifications() {
   if(this.isLoggedIN){
     setTimeout(()=>{
        let type: any = 'notViewed'
        
        this.urlService.getAllNotifications().subscribe(
          success => {
            if (isArray(success.data)) {
              this.notifications = success.data
            if(this.notifications.length > 6){
              this.notifications.length = 6;
            }
              this.urlService.getNotifications(type).subscribe(
                success => {
                  if (isArray(success.data)) {
                    this.notificationsCount = success.data;
                  }
                });
            }
          });
        },3000)

       
    }
  }

  viewUserProfile(userId: any) {
    this.router.navigate(['public-profile'], { queryParams: { user: userId } });
  }

  viewVideo(videoId: any) {
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }

  // Split list into a group of n
  splitList(source: Array<any>, chunkSize: any): Array<any>{
    let chunks = _.chunk(source, chunkSize);    
    return chunks;
  }

  viewNotification(id: any) {
    for(let i of this.notifications) {
      if (id == i.notificationId) {
        let requestObj: any = {
          'id': i.notificationId
        }; 
        if (i.notificationType == 'follow') {
          this.router.navigate(['/public-profile'], {queryParams: {user: i.userInfo._id}});
         
        } else if (i.notificationType == 'contributor') {
          this.router.navigate(['/create-interactive-video'], {queryParams: {video: i.videoInfo._id}});
         
        }
        else if (i.notificationType == 'publishVideo') {
          this.router.navigate(['/videos'], {queryParams: {video: i.videoInfo._id}});
        
        } 
        else if (i.notificationType == 'Comment') {
          this.router.navigate(['/videos'], {queryParams: {video: i.videoInfo._id}});
         
        } 
        else if (i.notificationType == 'Like') {
          this.router.navigate(['/videos'], {queryParams: {video: i.videoInfo._id}});
         
        } 
        else {
          
               this.router.navigate(['/videos'], {queryParams: {video: i.videoInfo._id}});
         
        } 
      }
    }
  }

  clearAllNotifications() {
   // this.notificationsCount = 0;
    

   if(isArray(this.notificationsCount)){
    for(let i of this.notificationsCount) {
    
        let requestObj: any = {
          'id': i.notificationId
        };
        this.nonViwed.push(requestObj)
      
      }   
    
     
      this.viewNot() 
    }
  }

  viewNot()
      {
        this.urlService.postNotification(this.nonViwed[0]).subscribe(success => {
          this.nonViwed.shift();
          
          if(this.nonViwed.length >0)
          this.viewNot();

          else
          this.notificationsCount = [];
        });
      }

}
