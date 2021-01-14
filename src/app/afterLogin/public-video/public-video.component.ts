import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../crud.service';
import { ToastrService } from 'ngx-toastr';
// import { DOCUMENT } from '@angular/common';
import { DomSanitizer,Meta,Title } from '@angular/platform-browser';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
import * as _ from 'underscore';
import { environment } from './../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import * as e from 'express';
import { ThrowStmt } from '@angular/compiler';
declare var $;
declare var videojs;


@Component({
  selector: 'app-public-video',
  templateUrl: './public-video.component.html',
  styleUrls: ['./public-video.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class PublicVideoComponent implements OnInit, OnDestroy {
  
  public val:any = 'recent';
  public simiarVideo:any = [];
  public isCollapsed: boolean = true;
  public intervalWatchHistory:any;
  public currentProfilePic:any;
  public currentProfileDetails:any;
  public commentsLoaded:boolean = false;
  public shareVideos: any = [];
  //public currentChoice:any = '';
  public currentMainChoice:any = {};
  public totalCOmments: any = 0;
  public myfollowers: any = [];
  public spinners: any = {};
  public userDetails:any;
  public isCollapsable: boolean = false;
  public dataLength: boolean;
  public videoId;
  public sub;
  public allVideos: Array<any> = [];
  public commentObject: any = {scenerio: '', videoID: '', commentID: '', comment: ''};
  public likeObject: any = {ID: '', type: '', category: '', commentID: '', scenario: ''};
  public interval:any;
  public mainID: any = '';
  public ownerId:any;
  public commentId: any = '';
  public time: any = '';
  public uploaderId: any = '';
  public uploaderDetails: any = {}
  public commentText: any = '';
  public replyText: any = '';
  public publicURL: any = '';
  public mainVideoDetails: any;
  public totalLikes: any = 0;
  public isSameUser:any = false;
  public currentUser:any;
  public currentUserData:any;
  public currentLevel:any = 0;
  public currentUserLikes:any;
  public findorselect:any = '';
  public createChoiceObj: any = { child: [], currentNo: 2, parent: '' }
  public createInteractiveVideoObj: any = { 
    spinner: false, 
    currentObj: {currentPlayingItem:{}}, 
    selectedItem: '', 
    query: '', 
    interactiveVideo: [], 
    finalObj: [], 
    currentPlayingItem: {}, 
    mainVideo: '', 
    child: [], 
    preview: false
  };
  public iAMFollowing: any = false
  public currentUserFollowing:any = []
  public follwersIds: Array<any> = [];
  public followers: Array<any> = [];
  public commentData: Array<any> = [];
  public sortedComments: Array<any> = [];
  public videoDetails: any;
  public userData: Array<any> = [];
  public userReactions: Array<any> = []; 
 
  public likes: Array<any> = [];
  public childVideos: Array<any> = [];
  public likesReaction: Array<any> = [];
  public laughs: Array<any> = [];
  public dislikes: Array<any> = [];
  public questions: Array<any> = [];
  public amazes: Array<any> = [];
  public cries: Array<any> = [];
  public angry: Array<any> = [];
  public player:any;
  public viewCount: any = 0;
  public canFollow: boolean = false;
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
  public myEmoji: any = '';
  public isLoggedIN:any = false
  public isAnonymousUser = false;
  public topViewedChoices: Array<any> = [];
  public totalViews: any = '';
  public firstDecisions: Array<any> = [];
  public mostPopularPath: any = [];
  cjocies:any = false;
isChoices:any = false
  constructor( public router: Router,
    public activRoute: ActivatedRoute, 
    public crudService: CrudService, 
    public toaster: ToastrService,
    public metaTagService: Meta,
    public titleService: Title,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) public dom) {
    
      this.activRoute.queryParams.subscribe(params => {
        this.createInteractiveVideoObj.currentObj.id = params.video;
        this.mainID = params.video;
        window.scrollTo(0, 0);
        ;
        if (window.localStorage.getItem('token') == null && window.localStorage.getItem('token') == undefined) {
          this.isLoggedIN = false;
          //$('.search-dropdown').hide();
        } else {
          this.isLoggedIN = true
        }

        if (window.localStorage.getItem('anonymousToken') == null && window.localStorage.getItem('anonymousToken') == undefined) {
          this.isAnonymousUser = false;
        } else {
          this.isAnonymousUser = true;
        }

        if (window.localStorage.getItem('token')) {
          this.init()
        } else {
          if (window.localStorage.getItem('anonymousToken')) {
            this.init()
          } else {
            this.getAnonymousUser();
          }
        }
      });
  } 

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    //$event.returnValue =true;
    this.saveHistiry();
  }


  getAnonymousUser() {
    this.crudService.getAnonymousUser().subscribe(
      success => {
          window.localStorage.setItem('anonymousToken', success.data.token);
          this.init()
      }
    );
  }
  ngOnInit() {

    if(!!localStorage.getItem('isChoice'))
    {
     $('#cmt-count-btn').removeClass('active');
     $('.nav-link.one').removeClass('active');
   
   
      $('#cmt-breakdown-btn').addClass('active');
      $('.nav-link.two').addClass('active');
      $('#cmt-breakdown-btn').css('opacity','1');
      $('html, body').animate({
        scrollTop: $("#cmt-breakdown-btn").offset().top
    }, 1000);
    
    localStorage.removeItem('isChoice')
  }
  // this.init()
  }

  showCategory(id: any) {

    this.router.navigate(['category'], { queryParams: { category: id } });
  
  }
  
  init()
  {
    this.createInteractiveVideoObj.spinner = true;
    this.createInteractiveVideoObj.preview = false;
    clearInterval(this.interval);
    this.videoDetails = [];
    this.createInteractiveVideoObj.currentObj ={currentPlayingItem:{}};
    
    this.currentMainChoice =  undefined;
    this.spinners.first = true;
    this.spinners.second = true;
    //this.initialFunction();
    this.currentProfilePic = window.localStorage.getItem('profilePic')
    this.currentUser = window.localStorage.getItem('user')
    //this.getPermissions();
    this.getVideoDetails();
   // this.getLoginDetails();
    this.publicURL = environment.currentSharedDomain+'?video='+this.mainID
    this.commentText = '';
    this.replyText = '';
   // this.getAllComments();
  //  this.getChoiceBreakdown();
  
    $('.likes-emoji').hide();
    $('.comment-emoji').hide();
  }
  userProfile(id:any)
  {
    if(this.currentUser == id){
      this.router.navigate(['dashboard']);
      return;
    }
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
   
    
  }
  
  userVideo(id:any)
  {
    if(this.currentUser == id){
      this.router.navigate(['my-videos']);
      return;
    }
    this.router.navigate(['my-videos-public'], { queryParams: { user: this.uploaderId } });
    
  }
  showVideo(id:any)
  {
    this.router.navigate(['videos'], { queryParams: { video: id } });
  }
  getEmoji(cat)
  {
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
  

  //show more
  showMore(comment: string) {
    this.isCollapsed = !this.isCollapsed;
    //this.dataLength = !(comment.length > 30)
  }


   // Get video details 
   getVideoDetails() {
    this.crudService.getvideoInfo(this.mainID).subscribe(
      success => {

        this.videoDetails = success.data.videoinfo;
        this.totalViews = success.data.videoinfo.viewCount;
        this.createInteractiveVideoObj.currentObj.currentPlayingItem = success.data.videoinfo;
     //   console.log(this.videoDetails.user)
     this.mainVideoDetails = success.data.videoinfo
        this.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = 0;
        
        let temp =  parseInt(this.createInteractiveVideoObj.currentObj.currentPlayingItem.publishTime);
            let time = new Date(temp).toUTCString();
            this.createInteractiveVideoObj.currentObj.currentPlayingItem.formattedTime = time;
           // console.log(this.createInteractiveVideoObj.currentObj.currentPlayingItem)
        
        this.uploaderId = success.data.videoinfo.user;
        this.totalLikes = success.data.videoinfo.Likes.length;
        
          if(this.isLoggedIN){
          this.crudService.getWatchedHistory(this.mainID).subscribe(
            success => {
              
              this.currentMainChoice = success.data.data[0];
              //this.currentMainChoice = [];
              if(!this.currentMainChoice)
              {
                 
               
                this.currentMainChoice = {};
                this.currentMainChoice.mainvideoID =  this.mainID
                this.currentMainChoice.mainvideoName = this.videoDetails.name
                this.currentMainChoice.duration = 0;
                this.currentMainChoice.choices = [{0:''}]
                this.currentMainChoice.choices[0].videoID = this.mainID;
                this.currentMainChoice.choices[0].videoName = this.videoDetails.name
                this.currentMainChoice.choices[0].duration = 0
              }
                else{
                  if(this.currentMainChoice.choices[0].videoID){

                  }
                  else{
                    this.currentMainChoice.choices[0].videoID = this.currentMainChoice.mainvideoID;
                    this.currentMainChoice.choices[0].videoName = this.currentMainChoice.mainvideoName
                    this.currentMainChoice.choices[0].duration = this.currentMainChoice.duration
                  }
              }
            // console.log(this.currentMainChoice)
            }
            
          ) 
        }
      
        
        this.crudService.getUserInfo(this.uploaderId).subscribe(
          success => {
            if(success.data.userinfo.privacySettings.showPublicVideo)
            {
              if(this.videoDetails.isPublished)
              {

                if(this.videoDetails.user == this.currentUser)
                {
                  this.isSameUser = true;
                }
              //   this.createInteractiveVideoObj.spinner = false;
              //  this.createInteractiveVideoObj.preview = true;
               this.callChild();
                // this.createInteractiveVideoObj.spinner = false;
                // this.createInteractiveVideoObj.preview = true;
              }
              else
              {
                this.toaster.error('Video not available!');
                window.history.back();
              }
            }
            else{
              this.toaster.error('Video marked private!');
              window.history.back();
            }
            this.uploaderDetails = success.data;
            // this.getAllLikes()
            this.ifUser()
            //console.log(this.uploaderDetails)
          //  this.follwers = success.data.userinfo.followers; 
           // console.log(success.data)
    }, error => {

  
  });
  });

  
  }
   

  getAllLikes()
  {
  
    this.crudService.getVideoLikesInfo(this.mainID).subscribe(
      success => {  
        this.likes = success.data;
        for(let i of this.likes)
        { 
          if(i._id == this.currentUser)
          {
            i.isMe = true
            this.currentUserLikes = i;
           
            for(let j of this.likeCategories)
            {
              if(this.currentUserLikes.category == j.id)
              {
                this.myEmoji = j.emoji;
                break;
              }
              
            }
            break;
          }
         
        } 
        this.parseLike();
        
      //this.ifUser()
      //  console.log(success.data)
      
      },
      error =>{
       //this.ifUser()
      })
    
  }

  ifUser()
  {
    if(this.isLoggedIN)
    {
      this.getMyData()
      this.getAllComments();
      
    }
    else{
      this.getAllLikes();
      this.getAllComments()
    }
  }

  getMyData()
  {

    // to be changed to cureent logged in user
    this.crudService.getUserInfo(this.currentUser).subscribe(
      success => {  
        this.currentUserData = success.data.userinfo
        this.currentUserFollowing = success.data.followinginfo;
       // this.myfollowers = success.data.followersinfo
      for(let i of this.currentUserFollowing)
      {
        if(i.userinfo._id == this.uploaderId)
        {
          this.iAMFollowing = true;
          break;
        }
      }

        for(let i of success.data.followersinfo){
          
          this.myfollowers.push(i.info)
        }
        this.currentProfileDetails = success.data.userinfo
        //console.log(this.myfollowers)
        
        this.getAllLikes();
      })
    
  }


parseLike()
{
  this.likesReaction = [];
  this.laughs = [];
  this.dislikes = [];
  this.questions = [];
  this.amazes = [];
  this.cries = [];
  this.angry = [];
  // console.log(this.currentUserFollowing,this.likes)
  for(let i of this.likes)
  { 
    for(let j of this.currentUserFollowing)
    {
      if(this.isLoggedIN){
        
          if(i._id == j.userinfo._id)
          {
            i.iAmFollowing = true;
          }
         
         
    }
      
  }
 
  if(i.category == '1')
      this.laughs.push(i)

      if(i.category == '2')
      this.likesReaction.push(i)

      if(i.category == '3')
      this.dislikes.push(i)

      if(i.category == '4')
      this.questions.push(i)

      if(i.category == '5')
      this.amazes.push(i)

      if(i.category == '6')
      this.cries.push(i)

      if(i.category == '7')
      this.angry.push(i)
  }

 
}

  getAllComments()
  {
    this.commentData = []
   
          
              this.crudService.getCommentInfo(this.mainID).subscribe(
                success => {
                  this.totalCOmments  = success.data.length;
                  for (const [key, value] of Object.entries(success.data)) {
                   
                    let value1:any = value
                    //console.log(value1);
                    this.commentData.push(value1);
                    //this.commentData.push()
                  }
                 // console.log(this.commentData)
                 if(this.commentData[0] == "No comment found")
                 {
                  this.totalCOmments = 0;
                  this.commentData = [];
                 }
                  this.commentData =  this.commentData.reverse();
                  // console.log('Comments: ', this.commentData);
                  if(this.isLoggedIN){
                        for(let i of this.commentData)
                        { 
                          if(i.likebyuserInfo){
                            for(let j of i.likebyuserInfo)
                            {
                              if(j.profilePic == this.currentProfilePic)
                              {
                                i.likedbyMe = true;
                              }
                            }
                          }
                        }
                }
                  this.commentsLoaded = true;
                  this.spinners.second = false
                
                }, error => {
    
                });
         
  }
 
  startOver() {
    this.createInteractiveVideoObj.preview = false;
    this.createInteractiveVideoObj.spinner = true;
    clearInterval(this.interval);
    setTimeout(() => {
      // clearInterval(this.interval);
      // clearInterval(this.intervalWatchHistory)
      // console.log(this.createInteractiveVideoObj.finalObj[0],this.createInteractiveVideoObj.currentObj.currentPlayingItem)
      this.createInteractiveVideoObj.currentObj.currentPlayingItem = JSON.parse(JSON.stringify(this.createInteractiveVideoObj.finalObj[0]));
      this.createInteractiveVideoObj.preview = true;
      this.createInteractiveVideoObj.spinner = false;

      if (this.isLoggedIN) {
      this.currentMainChoice.duration = 0;
      }

      this.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = 0;
      this.callLoadedFunctionForMobile();
      this.getYourFirstDecision(this.mainID);
      if (this.isLoggedIN) {
      this.currentMainChoice.choices =
      {
        "videoID": this.mainID,
        "videoName": this.videoDetails.name,
        "duration": 0,
        "level": 0
      }

      let Payload = {
        "mainvideoID": this.mainID,
        "mainvideoName": this.videoDetails.name,
        "duration": 0,
        "choices": [
          this.currentMainChoice.choices
          // this.currentMainChoice.choices
        ]
      }

      
        this.crudService.setWatchHistory(Payload).subscribe(
          success => {
            //console.log(success.data);
          });
      }
    })

  }

  copyMessage(inputElement)
  {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
  }

  callChild() {
    this.crudService.getChildVideosAll(this.mainID).subscribe(
      success => {
        let tree = [];
        this.createInteractiveVideoObj.currentObj.currentPlayingItem.parentId = "0";
        tree.push(this.createInteractiveVideoObj.currentObj.currentPlayingItem);
        for (let i of success.data) {
          // i.children = null;
          tree.push(i)
         
        }
        this.childVideos = success.data;
        
        let tree1 = this.createNestedArray(tree);
       
        this.createInteractiveVideoObj.finalObj = JSON.parse(JSON.stringify(tree1))
        
        this.createInteractiveVideoObj.currentObj.currentPlayingItem = tree1[0];
    
        if(this.isLoggedIN){
          for(let i of tree)
            {
              if(i._id == this.currentMainChoice.choices[0].videoID)
              {
               // console.log('asdasd',tree1);
              // if(videoID)
             // console.log(tree1[0])
                this.createInteractiveVideoObj.currentObj.currentPlayingItem = tree1[0];
                this.createInteractiveVideoObj.currentObj.currentPlayingItem.URL = i.URL;
                this.createInteractiveVideoObj.currentObj.currentPlayingItem.poster = i.poster;
                this.createInteractiveVideoObj.currentObj.currentPlayingItem.children = i.children;
                
                //this.createInteractiveVideoObj.currentObj.currentPlayingItem = i;
                break;
              }
            }

          }
           // console.log(this.createInteractiveVideoObj.currentObj.currentPlayingItem)
            this.createInteractiveVideoObj.spinner = false;
            this.createInteractiveVideoObj.preview = true;
            this.callLoadedFunctionForMobile()
          this.similarVideos();
        
        // console.log(this.currentMainChoice)
      
      
      
       
         
      })
  }

  similarVideos()
  {
    let text = this.createInteractiveVideoObj.currentObj.currentPlayingItem.Title

    text = text.slice(0, 3);
    if(text.length < 1)
    {
      this.cjocies = true;
        this.spinners.second = false;
        
        this.getMostPopularPath();
        return;
    }
    this.crudService.simpleVideoSearch(text).subscribe(
      success => {
       // success.data.splice(0, 1);
        this.simiarVideo =  success.data.searchdata;
        for(let i=this.simiarVideo.length -1;i>-1;i--){
          
          if(this.mainID == this.simiarVideo[i].videoInfo._id)
          {
            
            this.simiarVideo.splice(i,1)
          }
        }
        this.cjocies = true;
        this.spinners.second = false;
        
        this.getMostPopularPath();
      
      })
  }
  selectToShare(id:any)
  {
    if(this.shareVideos.includes(id))
    {
      const index = this.shareVideos.indexOf(id);
      if (index > -1) {
        this.shareVideos.splice(index, 1);
      }
    }
    else{
      this.shareVideos.push(id)
    }
   
   
  }
  shareTousers(id:any){
    $('#'+id).prop('disabled', true);
   let obj={ 
     "sharedWith":this.shareVideos,
    "videoID":this.mainID
    }

    this.crudService.shareInternally(obj).subscribe(
      success => {
        this.toaster.success('Video Shared!')
        this.shareVideos = [];
        for(let i of this.myfollowers)
        {
          i.selected = false;
        }
        $('#'+id).prop('disabled', false);
      }
    )
       

  }

  showEmojis() {
    $('.likes-emoji').toggle();
  }

  showCommentEmojis(id:any) {
    $('#'+id).toggle();
    // $('.comment-emoji').toggle();
  }

  openReactModal() {
    $('#react-Modal').modal('show')
  }

  // Like a video
  likeVideo(data) {
    this.likeObject.ID = this.mainID;
    this.likeObject.type = 'video';
    this.likeObject.category = data.id;
    this.likeObject.commentID = 'null';
    this.likeObject.scenario = 'like';
    this.likeObject.profilePic = this.currentUserData.profilePic
    this.likeObject.firstname = this.currentUserData.firstname
    this.likeObject.lastname = this.currentUserData.lastname
    this.likeObject.userName = this.currentUserData.username
    this.likeObject.isMe = true;
    this.myEmoji = data.emoji;
    this.totalLikes++;
    this.showEmojis();
    this.likes.push(this.likeObject)
    this.parseLike();
    this.crudService.likeAndUnlike(this.likeObject).subscribe(
      success => {
      });
  }

  updatelikeVideo(data)
  {
    this.likeObject.ID = this.mainID;
    this.likeObject.type = 'video';
    this.likeObject.category = data.id;
    this.likeObject.commentID = 'null';
    this.likeObject.scenario = 'like';
    this.myEmoji = data.emoji;
   // this.totalLikes++;
    this.showEmojis();
    for(let i of this.likes)
        { 
          if(i._id == this.currentUser)
          {
            i.category = this.likeObject.category; 
            break;
          }
         
        } 
       
    this.parseLike();
    this.crudService.likeAndUnlike(this.likeObject).subscribe(
      success => {
      });
  }

   // Unlike a video
   unlikeVideo() {
    this.likeObject.ID = this.mainID;
    this.likeObject.type = 'video';
    //this.likeObject.category = id;
    this.likeObject.commentID = 'null';
    this.likeObject.scenario = 'unlike';
    this.myEmoji = '';
    this.totalLikes--;
    this.crudService.likeAndUnlike(this.likeObject).subscribe(
      success => {
      });
  } 

  // Like a comment 
  likeComment(event:any, commentId: any) {
    this.likeObject.ID = this.mainID;
    this.likeObject.type = 'comment';
    this.likeObject.scenario = 'like';
    this.likeObject.commentID = commentId;
    this.likeObject.category = event.target.id;
    this.showCommentEmojis(commentId);
    for(let i of this.commentData) {
      if(i._id == commentId) {
        if(!i.likebyuserInfo) {
          i.likebyuserInfo = [];
          i.likebyuserInfo.push({_id:this.currentUser,profilePic:this.currentProfilePic})
          i.likedbyMe = true;
          break;
        }
        else {
          if(i.likebyuserInfo.length == 0) {
            i.likebyuserInfo.push({_id:this.currentUser,profilePic:this.currentProfilePic});
            i.likedbyMe = true;
            break;
          }
          for(let j of i.likebyuserInfo) {
            if(j.profilePic == this.currentProfilePic){
              i.likebyuserInfo.push({_id:this.currentUser,profilePic:this.currentProfilePic});
              i.likedbyMe = true;
              break;
            }
               
               
          }
              
        }
      }
    }
    this.crudService.likeAndUnlike(this.likeObject).subscribe(
      success => {
        
      },
      error => {
      }
    );
  }


  unlikeComment(commentId: any) {
    this.likeObject.ID = this.mainID;
    this.likeObject.type = 'comment';
    this.likeObject.category = '';
    this.likeObject.commentID = commentId;
    this.likeObject.scenario = 'unlike';
    this.showCommentEmojis(commentId);
        for(let i of this.commentData)
        {
          if(i._id == commentId)
          {
              for(let j=i.likebyuserInfo.length-1; j>-1;j--){
                if(i.likebyuserInfo[j]._id == this.currentUser){
                  i.likedbyMe = false;
                  i.likebyuserInfo.splice(j,1);
                  break;
                 }
               
              }
            }
            
          }
    this.crudService.likeAndUnlike(this.likeObject).subscribe(
      success => {
        
      },
      error => {
      }
    );
  }

 
  changeFilter(val:any)
  {
    if (val == 'recent') {
      this.commentData.sort(function (a, b) {
        if (a.createdAT > b.createdAT) {
          return -1;
        }
        return 1
      })
    }
    else{
      this.commentData.sort(function (a, b) {
        var newA = [];
        var newB = [];
        if(!a.likebyuserInfo)
        newA = []
        else
        newA =a.likebyuserInfo

        if(!b.likebyuserInfo)
        newB = []
        else
        newB =b.likebyuserInfo

        if (newA.length > newB.length) {
          return -1;
        }
        return 1
      })
    }

  }
 
// getReactionImga(id)
// {
//   for(let i of this.likeCategories)
//   {
//   if(id == i.id)
//   {
//     return i.emoji;
//   }
// }
// }

  // getlikes()
  // {
  //   let userObj={}
  //   this.crudService.getUserInfo(i.userID).subscribe(
  //     success=>{
  //       userObj.userId = i.userID;
  //       userObj.username = success.data.userinfo.username;
  //       userObj.profilePic = success.data.userinfo.profilePic;
  //       this.userReactions.push(userObj);
  //       setTimeout(() => {
  //         this.getMyEmoji();
  //         this.laughs = this.filterReactions(this.userReactions, this.laughs, '1');
  //         this.likes = this.filterReactions(this.userReactions, this.likes, '2');
  //         this.dislikes = this.filterReactions(this.userReactions, this.dislikes, '3');
  //         this.questions = this.filterReactions(this.userReactions, this.questions, '4');
  //         this.amazes = this.filterReactions(this.userReactions, this.amazes, '5');
  //         this.cries = this.filterReactions(this.userReactions, this.cries, '6');
  //         this.angry = this.filterReactions(this.userReactions, this.angry, '7');
  //       }); 
  //     }, error=>{

  //     });
  // }

  // getLoginDetails() {
  //   this.crudService.userDetails().subscribe(
  //     success=>{
  //       console.log('Login ID', success.data.details._id);
  //     });
  // }

  getMyEmoji() {
    for (let r of this.userReactions){
      if (r.userId == this.uploaderId) {
        this.myEmoji = r.emoji;
      }
    }
  }

  popupfacebook() {
    let url = 'http://www.facebook.com/sharer.php?u='+ this.publicURL;
    let newwindow = window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
    if (window.focus) {
      newwindow.focus()
    } 
  }

  popuptweet(){
    let url = 'https://twitter.com/intent/tweet?text='+ this.publicURL;
    let newwindow=window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
    if (window.focus) {
      newwindow.focus()
    }
  }

  popuplinkedin(){
    
    let url ='https://www.linkedin.com/sharing/share-offsite/?url='+ this.publicURL;
    let newwindow=window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
    if (window.focus) {
      newwindow.focus()
    }
  }

  //Filter user reactions
  filterReactions(sourceList: Array<any>, targetList: Array<any>, category: string): Array<any> {
    targetList = sourceList.filter(source=> source.category == category);
    return targetList;
  }

  // Follow 
  followUser(id: any) {
    let obj: any = {
      'type': 'follow',
      'followToUserID': id
    };
    
    this.crudService.followUser(obj).subscribe(success => {
      //this.getAllLikes();
      if(id == this.uploaderId){
        this.uploaderDetails.userinfo.followers.push({_id:id})
        this.iAMFollowing = true;
      }
    
        this.getMyData();

      
    }, error => {
      //
    });
  }
  
  unfollowUser(id: any)
  {
    let obj: any = {
      'type': 'unfollow',
      'followToUserID': id
    };
    this.crudService.followUser(obj).subscribe(success => {
      //this.getAllLikes();
      if(id == this.uploaderId)
      {
        this.iAMFollowing = false;
        this.uploaderDetails.userinfo.followers.pop();
      }
      
      //  console.log('ass')

        this.getMyData();
      
    }, error => {
      //
    });
  }

  // Open reply modal
  openReplyModal(id: any) {
    this.commentId = id;
    // console.log('Comment Data: ', this.commentData);
    // for(let i of this.commentData) {
    //   if (i.commentInfo.replierinfo.length > 0) {
    //   }
    //   if (i.commentInfo.replydata.length > 0) {
    //   }
    // }
    $('#reply-Modal').modal('show');
  }

  // Open share modal
  openShareModal() {
    $('#share-Modal').modal('show');
  }



    

  // Post a comment
  comment() {
    if(this.commentText.length < 1){
      this.toaster.warning('Please Type Comment!')
      return;
    }
    this.commentObject.scenerio = 'comment';
    this.commentObject.videoID = this.mainID;
    this.commentObject.commentID = 'null';
    this.commentObject.comment = this.commentText;
    this.crudService.commentAndReply(this.commentObject).subscribe(
      success => {
        this.commentText = '';
        success.data.data.profilePic = this.currentProfilePic
        success.data.data.createdAT = success.data.data.createdAt
        success.data.data.userName = this.currentProfileDetails.username
        this.commentData.unshift(success.data.data);
        this.totalCOmments++;
        //console.log(success)
      }, 
      error => {
      });
  }

  // Reply on a comment
  reply() {
    this.commentObject.scenerio = 'reply';
    this.commentObject.videoID = this.mainID;
    this.commentObject.commentID = this.commentId;
    this.commentObject.comment = this.replyText;
    this.crudService.commentAndReply(this.commentObject).subscribe(
      success => {
        this.replyText = '';
        let datatemp:any = {userInfo:{},replyInfo:{}}
        
        datatemp.userInfo.profilePic = this.currentProfilePic
        datatemp.createdAT = success.data.data.createdAt
        datatemp.userInfo.userName = this.currentProfileDetails.username
        datatemp.replyInfo.comment = success.data.data.comment
        datatemp.replyInfo.updatedAt = success.data.data.updatedAt
        datatemp.replyInfo._id = success.data.data._id
        for(let i of this.commentData)
        {
          if(i._id == success.data.data.replyOnCommentID)
          {
            if(i.reply)
            i.reply.push(datatemp)
            else
            {
              i.reply = [];
              i.reply.push(datatemp)
            }
          }
        }
        $("#reply-Modal").modal("hide");
       // console.log(success)
        //this.getAllComments();
      }, 
      error => {
       });
     
  }

  closeReactons()
  {
    $('#react-Modal').modal('hide');
  }
  
  loadNextOption(e: any) {
    clearInterval(this.interval);
    //clearInterval(this.intervalWatchHistory)
    //this.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = 0;
    this.createInteractiveVideoObj.preview = false;

    this.getYourFirstDecision(e._id);
    setTimeout(() => {

      //clearInterval(this.interval);
      //clearInterval(this.intervalWatchHistory)
      //this.toaster.info('Choice Selected');
      //this.createInteractiveVideoObj.currentObj.currentPlayingItem = e;
      this.createInteractiveVideoObj.currentObj.currentPlayingItem.URL = e.URL;
      this.createInteractiveVideoObj.currentObj.currentPlayingItem.poster = e.poster;
      this.createInteractiveVideoObj.currentObj.currentPlayingItem.children = e.children;
      this.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = 0;



      if (this.isLoggedIN) {
        this.currentMainChoice.choices.duration = 0;
        // this.currentLevel++; load
        this.currentMainChoice.choices =
        {
          "videoID": e._id,
          "videoName": e.name,
          "duration": 0,
          "level": 0
        }


        let Payload = {
          "mainvideoID": this.mainID,
          "mainvideoName": this.videoDetails.name,
          "duration": 0,
          "choices": [
            this.currentMainChoice.choices
            // this.currentMainChoice.choices
          ]
        }

        this.currentMainChoice.duration = 0;
        //check child and marker

        this.crudService.setWatchHistory(Payload).subscribe(
          success => {
            // console.log(success.data);
          });
        
        let requestObj = {
          videoID: e._id
        };
        this.crudService.setChildWatchHistory(requestObj).subscribe(success=>{
        });

        this.crudService.yourFirstDecision(this.mainID).subscribe(success=>{
          this.firstDecisions = success.data;
        });
      }
      this.createInteractiveVideoObj.preview = true;
      this.callLoadedFunctionForMobile()
    })


    // console.log(this.currentMainChoice.choices)

    // this.createInteractiveVideoObj.currentPlayingItem = e;
  }

  
  callLoadedFunctionForMobile()
  {
    this.createInteractiveVideoObj.preview = true;
    this.createInteractiveVideoObj.spinner = false;
    setTimeout(()=>{

     // console.log(videojs.players)
     
    
    
      //videojs((document.getElementById('previewVideoMobile'))).dispose();
      // for (var key in videojs.players) {
      //      videojs((document.getElementById('previewVideoMobile'))).dispose();
         
      //  }
    var dom = document.getElementById('previewVideoMobile');
    let that = this
  this.player = videojs(dom, {}, function(){
        this.on('loadedmetadata', function(e){
          var backward = that.player.controlBar.addChild("button",{},1);
          var forward = that.player.controlBar.addChild("button",{},2);
          var reset = that.player.controlBar.addChild("button");
    
            var forwardDom = forward.el();
            var backwardDom = backward.el();
            var resetDom = reset.el();
            forwardDom.innerHTML = "<img src='../../../assets/images/videoplayer/step-forward.svg'/style='width:17px;filter: invert(100%);'>";
            forwardDom.setAttribute('title','Forward');
            backwardDom.innerHTML =  "<img src='../../../assets/images/videoplayer/step-backward.svg' style='width:17px;filter: invert(100%);'/>";
            backwardDom.setAttribute('title','Backward');

            resetDom.innerHTML =  '<svg class="bi bi-arrow-clockwise" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
            '<path fill-rule="evenodd" d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z" clip-rule="evenodd"/>'+
           ' <path fill-rule="evenodd" d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'+
          '</svg>';
            resetDom.setAttribute('title','Start Over');
            resetDom.setAttribute('ids','Start Over');


            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              /* your code here */
              $('.vjs-tech').parent().addClass('isMobile')
              var fullSxcreen = that.player.controlBar.addChild("button");
              var fullSxcreenDom = fullSxcreen.el();
              fullSxcreenDom.innerHTML =  '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
              '<path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>'+
            '</svg>';

            fullSxcreenDom.onclick = function(){
              $('.vjs-tech').parent().toggleClass('fullscreen')
              $('html,body').toggleClass('onMobilrPlayer')
            
    
          } 
          fullSxcreenDom.ontouchend = function() {
            $('.vjs-tech').parent().toggleClass('fullscreen')
            $('html,body').toggleClass('onMobilrPlayer')
          }

            }


            
            forwardDom.onclick = function(){
              that.player.currentTime(that.player.currentTime() + 10);
    
          } 
          forwardDom.ontouchend = function() {
            that.player.currentTime(that.player.currentTime() + 10);
          }
          backwardDom.onclick = function(){
            this.player.currentTime(this.player.currentTime() - 10);
            ;
          } 
          backwardDom.ontouchend = function() {
            this.player.currentTime(this.player.currentTime() - 10);
            ;
          }
          resetDom.onclick = function(){
           // alert('s')
           that.startOver()
          } 
          resetDom.ontouchend = function() {
            that.startOver()
          }
          
            if(that.currentMainChoice)
          this.currentTime(that.currentMainChoice.duration)

          let plotNumber:any = 0;
          that.interval = setInterval(() => {
            that.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = this.currentTime();
            if (that.viewCount < 1) {
              that.viewCount++;
              let obj = {
                'videoID': that.mainID
              }
              // call view count API
              that.crudService.saveViewCount(obj).subscribe(success=>{
                // watch history
                if(that.isLoggedIN){
              that.crudService.watchHistory(obj).subscribe(success=>{
                
                if(that.currentMainChoice.choices[0])
            that.currentMainChoice.choices = that.currentMainChoice.choices[0] 
        
           // console.log(that.currentMainChoice.choices)
        
            that.currentMainChoice.choices.duration = this.currentTime()
            let Payload = {
              "mainvideoID":that.mainID, 
              "mainvideoName":that.videoDetails.name,
              "duration":this.currentTime(),
              "choices":[
                that.currentMainChoice.choices
                // that.currentMainChoice.choices
              ]
            }
            that.crudService.setWatchHistory(Payload).subscribe(
              success=>{
                //console.log(success.data);
              });
               
              }, error=>{
        
              });
            }
              }, error=>{
        
              });
            }

            that.createInteractiveVideoObj.currentObj.currentPlayingItem.mintue = Math.floor( that.createInteractiveVideoObj.currentObj.currentPlayingItem.time / 60);
            that.createInteractiveVideoObj.currentObj.currentPlayingItem.seconds =  (that.createInteractiveVideoObj.currentObj.currentPlayingItem.time - that.createInteractiveVideoObj.currentObj.currentPlayingItem.mintue * 60);
           
              if(that.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime > that.createInteractiveVideoObj.currentObj.currentPlayingItem.time)
              {
                if(plotNumber == 0){
                      that.addOptions();
                      clearInterval(this.interval)
                }
                plotNumber++;
              }
              else{
                plotNumber = 0;
                that.removeoptions()
                clearInterval(this.interval)
              }

            
            
          }, 500)
        
         
        
            
              let currentTime = 0;
              setTimeout(()=>{
                let hasChilren: any = false;
                //this.createInteractiveVideoObj.currentObj.currentPlayingItem.time
                // if(this.mainVideoDetails.totalchild > 0)
                // hasChilren = true;
            
                // else
                // hasChilren = false;
            
                if (that.createInteractiveVideoObj.currentObj.currentPlayingItem.children == null || that.createInteractiveVideoObj.currentObj.currentPlayingItem.children == undefined) {
                  hasChilren = false;
                }
                else {
                  if (that.createInteractiveVideoObj.currentObj.currentPlayingItem.children.length > 0) {
                    hasChilren = true
                  }
                  else {
                    hasChilren = false
                  }
                }
                
                that.createInteractiveVideoObj.currentObj.currentPlayingItem.currentTime = currentTime
                that.placeMarker(hasChilren, that.createInteractiveVideoObj.currentObj.currentPlayingItem.time, 'previewVideoMobile', this.duration())
            
               // 
              })
            



        });
    });



  
  
})

}




addOptions()
{
      let that = this
      let length = 0;
      for(let i of this.createInteractiveVideoObj.currentObj.currentPlayingItem.children){
        if(!!i.name){
        length++
        }
        
      }
      // = this.player.controlBar.addChild("div",{});
      
      var width:any = 100/length
      width = Math.round(width)
      let index = 0;
        for(let i of this.createInteractiveVideoObj.currentObj.currentPlayingItem.children){
          if(!!i.name){
          index++
        let backward = this.player.controlBar.addChild("button",{});
        //  console.log(i)
          let backwardDom = backward.el();
          backwardDom.innerHTML =  i.name;
          backwardDom.setAttribute('title',i.name);
          backwardDom.setAttribute('customChoices','yes');
          backwardDom.setAttribute('id',i._id);
          backwardDom.setAttribute('custom-width',width);
          backwardDom.setAttribute('custom-distance','distance'+index);
          $('.vjs-control-bar').addClass('added_choices')
          
         
        backwardDom.onclick = function(e){
          that.loadNextOption(i);
         
        } 
        backwardDom.ontouchend = function() {
          that.loadNextOption(i);
        }
      }
      }
      
}
removeoptions()
{
  $('.vjs-control.vjs-button[customchoices="yes"]').remove();
  $('.vjs-control-bar').removeClass('added_choices')

}

  // getChoiceBreakdown() {
  //   this.crudService.getChoiceBreakdown().subscribe(success=>{
  //     // console.log(success);
  //   }, error=>{

  //   });
  // }

  getTopViewedChild() {
    this.crudService.getTopViewedChild(this.mainID).subscribe(
      success=>{
        setTimeout(() => {
          let totalViews:any = 0
          this.topViewedChoices = success.data;
          for (let i of this.topViewedChoices) {
            totalViews = totalViews + i.viewCount
          }
          for (let i of this.topViewedChoices) {
           if(totalViews  ==0){
            i.percentage = 0;
            i.progress = '0%';
          
           } 
           else{
            i.percentage = this.calculatePercentage(i.viewCount, totalViews);
            i.progress = this.calculatePercentage(i.viewCount, totalViews)+'%';
          
           }
           }
          //console.log('======', this.topViewedChoices);  
        }, 1000);
        this.cjocies = false;
      }, error=>{

      }
    );
  }

  getMostPopularPath() {
    this.cjocies = true;
    this.crudService.mostPopularPath(this.mainID).subscribe(success=>{
     if(this.isArray(success.data))
     {
      this.mostPopularPath = success.data;
      //this.mostPopularPath = this.mostPopularPath[0]
     }
     else{
      this.mostPopularPath.push(success.data) 
     }
      this.getYourFirstDecision(this.mainID);
      this.getTopViewedChild();
     
    });
  }
  isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};

  getYourFirstDecision(id:any) {
    this.crudService.yourFirstDecision(id).subscribe(
      success=>{
        this.firstDecisions = success.data;
        
      });
  }

  calculatePercentage(childViewcount: any, totalViews: any): any {
    let percantage = (childViewcount / totalViews) * 100;
    return Math.round(percantage);
  }

  placeMarker(haveChildren, markerTime, id, duration) {
    if (!haveChildren) {
      $('.marker').remove();
    } else {

      let width = $('#' + id).width();
      let precentageOfMarker = (markerTime / duration) * 100;
      $('.marker').remove();
      $('#' + id+' .vjs-progress-holder.vjs-slider.vjs-slider-horizontal').append('<div class="marker" style="left:' + precentageOfMarker + '%"></div>')
    }
  }

  createNestedArray(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i]._id] = i; // initialize the map
      list[i].children = []; // initialize the children

    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        if(list[map[node.parentId]])
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  ngOnDestroy()
  {
    if(this.isLoggedIN){
      this.saveHistiry();
    }
    //clearInterval(this.intervalWatchHistory)
    
  }

  saveHistiry()
  {
    clearInterval(this.interval)
    if(this.currentMainChoice.choices[0])
      this.currentMainChoice.choices = this.currentMainChoice.choices[0] 

     // console.log(this.currentMainChoice.choices)

    //  this.currentMainChoice.choices.duration = e.target.currentTime
      let Payload = {
        "mainvideoID":this.mainID, 
        "mainvideoName":this.videoDetails.name,
        "duration":this.currentMainChoice.choices.duration,
        "choices":[
          this.currentMainChoice.choices
          // this.currentMainChoice.choices
        ]
      }
      this.crudService.setWatchHistory(Payload).subscribe(
        success=>{
          //console.log(success.data);
        });
  }
}
