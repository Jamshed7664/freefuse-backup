import { Component, OnInit } from '@angular/core';
import { CrudService} from '../../crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { isArray } from 'util';

@Component({
  selector: 'app-public-user-activitiy',
  templateUrl: './public-user-activitiy.component.html',
  styleUrls: ['./public-user-activitiy.component.css']
})
export class PublicUserActivitiyComponent implements OnInit {
  public userId: any;
  public watchHistory: Array<any> = [];
  public likedVideos: Array<any> = [];
  public spinner:any = false;
  public sharedVideos: Array<any> = [];

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

  constructor(
    public apiService: CrudService,
    public router:Router,
    public activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params.user;
    });
   }

  ngOnInit() {
    this.spinner = true;
    this.getWatchHistory();
    
  }

  // Getting watch history
  getWatchHistory() {
    this.apiService.getWatchHistoryByUser(this.userId).subscribe(
      success => {
        if(!isArray(success.data))
        {
          this.watchHistory = [];
          this.getLikedVideos();
          this.getSharedVideos();
          return;
        }
        let history: Array<any> = success.data;
        let sortedHistory = _.sortBy(history, ['createdAt']);
        
        sortedHistory = sortedHistory.reverse();
        let arrnew:any = []
        for(let i of sortedHistory)
        {
          if(i.videoInfo != null && i.videoInfo != undefined)
          {
            arrnew.push(i)
          }
        }
      //  arrnew = arrnew.reverse();
        this.watchHistory = _.take(arrnew, 20)
        // let temp3: Array<any> = this.splitList(arr, 3);
        // this.top3 = temp3[0];
        this.getLikedVideos();
         this.getSharedVideos();
      }
    );
  }

  // Get shared videos
  getSharedVideos() {
    this.apiService.getUserShares(this.userId).subscribe(
      success => {
        if(!isArray(success.data))
        {
          this.sharedVideos = []
        }
        else
        this.sharedVideos = success.data.reverse();

        
      
      });
  }

  // Get liked videos
  getLikedVideos() {
    this.apiService.getLikedVideos(this.userId).subscribe(
      success => {
        this.spinner = false;
        if(!isArray(success.data))
        {
          this.likedVideos = [];
          return;
        }
        
        for (const [key, value] of Object.entries(success.data)) {
          this.likedVideos = success.data 
        }
        this.likedVideos = this.likedVideos.reverse();
        //this.spinner = false;
      });
  }



  // Navigate to public videos
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
