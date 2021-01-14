import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public userId: any;
  public mainID: any;
  public userDetails: any = {};
  public followingList: Array<any> = [];
  public currentUser:any;
  public spinner:any = false;
  constructor(public crudService: CrudService,
    public router: Router,
    public activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {
        this.userId = params.user;
        this.mainID = params.user;
      });
    }

  ngOnInit() {
    // this.getUserDetails();
    this.spinner = true;
    this.currentUser = window.localStorage.getItem('user')
    this.getUserdata();
  }

  // Get user data
  getUserdata() {
    this.crudService.getUserInfo(this.userId).subscribe(success=>{
    //  let followingIds = success.data.userinfo.following;
      console.log(success.data.followinginfo)
      this.followingList = success.data.followinginfo
      // for(let f of followingIds) {
      //   this.crudService.getUserInfo(f.followto).subscribe(
      //     success => {
      //       let obj = success.data;
      //       obj.followingId = f.followto;
      //       this.followingList.push(obj);
            
      //     });
      // }

      this.getMyData()
    });
  }

  viewPublicProfile(id: any) {
    this.router.navigate(['/public-profile'], { queryParams: { user: id } });
  }


  // Follow back
  followBack(id: any) {
    let obj: any = {};
    obj.type = 'follow';
    obj.followToUserID = id;
    this.crudService.followUser(obj).subscribe(
      success => {
        this.getMyData();
       // this.toaster.success('Subscription Added');
      });
  } 

  // unFollow back
  unfollowBack(id: any) {
    let obj: any = {};
    obj.type = 'unfollow';
    obj.followToUserID = id;
    this.crudService.followUser(obj).subscribe(
      success => {
        this.getMyData();
        //this.toaster.success('Subscription Added');
      });
  } 


  getMyData()
  {
    // to be changed to cureent logged in user
    this.crudService.getUserInfo(this.currentUser).subscribe(
      success => {  
       
     //  console.log(success.data.followinginfo)
        //console.log(this.myfollowers)
        for(let j of this.followingList)
          {
            j.userinfo.iAMFollowing = false;
          }
        for(let i of success.data.followinginfo)
        { 
          for(let j of this.followingList)
          {
            //j.info.iAMFollowing = false;
            if(j.userinfo._id == i.userinfo._id)
            {
              j.userinfo.iAMFollowing = true;
            }
          }
          
          
         
        }
        this.spinner = false;
      })
    
  }

}
