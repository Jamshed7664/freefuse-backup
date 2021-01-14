import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  public userId: any;
  public mainID: any;
  public userDetails: any = {};
  public followerList: Array<any> = []
  public currentUser:any;
  public spinner:any = false;
  constructor(public crudService: CrudService,
    public toaster: ToastrService,
    public router: Router,
    public activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {
        this.userId = params.user;
        this.mainID = params.user;
      });
    }

  ngOnInit() {
    this.spinner = true;
    this.currentUser = window.localStorage.getItem('user')
    this.getUserdata();
  }

  // Get user data (processed on the basis of user ID)
  getUserdata() {
    
    this.crudService.getUserInfo(this.userId).subscribe(
      success => {
        this.followerList = success.data.followersinfo;
       this.getMyData()
       
      }
    );
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
        for(let j of this.followerList)
          {
            j.info.iAMFollowing = false;
          }
        for(let i of success.data.followinginfo)
        { 
          for(let j of this.followerList)
          {
            //j.info.iAMFollowing = false;
            if(j.info._id == i.userinfo._id)
            {
              j.info.iAMFollowing = true;
            }
          }
          
          
         
        }
        this.spinner = false;
      })
    
  }

  viewPublicProfile(id: any) {
    this.router.navigate(['/public-profile'], { queryParams: { user: id } });
  }

}
