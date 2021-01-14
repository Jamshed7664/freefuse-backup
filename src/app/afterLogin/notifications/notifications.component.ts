import { isArray } from 'util';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public activities: Array<any> = [];
  public notifications: Array<any> = [];
  public spinner:any = false;
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

  constructor(public apiService: CrudService,
    public router: Router) { }

  ngOnInit() {
    // this.getActivity();
    this.spinner = true;
    this.getNotifications();
  }

  //Get user activities
  // getActivity() {
  //   this.apiService.getUserActivity().subscribe(
  //     success => {
  //       this.activities = success.data;
  //     });
  // }

  getNotifications() {

   // let viewType: any = 'viewAll'
    this.apiService.getAllNotifications().subscribe(
      success => {
        if (isArray(success.data)) {
         
          this.notifications = success.data;
          this.spinner = false;
          
        } else {
         
        }
        
        //console.log('this.notifications', this.notifications);
      });
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

  showVideo(videoId: any) {
    this.router.navigate(['videos'], { queryParams: { video: videoId } });
  }
  
  userProfile(id:any){
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
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

}
