import { NgModule } from '@angular/core';
import { Routes, RouterModule, Params } from '@angular/router';
import { LoginComponent } from './beforeLogin/login/login.component';
import { SignupComponent } from './beforeLogin/signup/signup.component';
import { ResetPasswordComponent } from './beforeLogin/resetPassword/resetPassword.component';
import { ForgetPasswordComponent } from './beforeLogin/forgotPassword/forgetPassword.component';
import { OtpComponent } from './beforeLogin/otp/otp.component';
import { ProfileCompletionComponent } from './afterLogin/profileCompletion/profileCompletion.component';
import { DashboardComponent } from './afterLogin/Dashboard/dashboard.component';
import { UploadVideosComponent } from './afterLogin/uploadVideos/uploadVideos.component';
import { AuthGuardService } from './router-gaurd.service';
import { RoleGuardService } from './role-gaurd.service';
import { EditProfileComponent } from './afterLogin/editProfile/editProfile.component';
import { CreateInteractiveVideoComponent } from './afterLogin/createInteractiveVideo/createInteractiveVideo.component';
import { ThatsallComponent } from './afterLogin/thatsall/thatsall.component';
import { PublicVideoComponent } from './afterLogin/public-video/public-video.component';
import { MyVideosComponent } from './afterLogin/my-videos/my-videos.component';
import { PublicProfileComponent } from './afterLogin/public-profile/public-profile.component';
import { MyVideosPublicComponent } from './afterLogin/my-videos-public/my-videos-public.component';
import { SearchResultsComponent } from './afterLogin/search-results/search-results.component';
import { FollowingComponent } from './afterLogin/following/following.component';
import { ExplorePageComponent } from './beforeLogin/explore/explore.component';
import { FollowersComponent } from './afterLogin/followers/followers.component';
// import { LandingPageComponent } from './beforeLogin/landing-page/landing-page.component';
import { NewLandingPageComponent } from './beforeLogin/new-landing-page/new-landing-page.component';
import { UserActivitiyComponent } from './afterLogin/user-activitiy/user-activitiy.component';
import { PublicUserActivitiyComponent } from './afterLogin/public-user-activitiy/public-user-activitiy.component'; 
import { TrendingComponent } from './beforeLogin/trending/trending.component';
import { PrivacyPolicyComponent } from './beforeLogin/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './beforeLogin/terms-conditions/terms-conditions.component';
import { FaqComponent } from './beforeLogin/faq/faq.component';
import { CategoryWiseVideoComponent } from './beforeLogin/categoryWiseVideo/categoryWiseVideo.component';


import { NotificationsComponent } from './afterLogin/notifications/notifications.component';
import { LibraryComponent } from './afterLogin/library/library.component';
import { AboutComponent } from './beforeLogin/about/about.component';

/**
 * Routes
 */
const APP_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: '/landing-page', 
    pathMatch: 'full' 
  },
  {
    path: 'login', 
    component: LoginComponent, 
    data: {
      animation: 'Home'
    } 
  },
  {
    path: 'signup', 
    component: SignupComponent, 
    data: {
      animation: 'Home'
    }
  },
  {
    path: 'forgotPassword', 
    component: ResetPasswordComponent, 
    data: {
      animation: 'Home'
    }
  },
  {
    path: 'resetPassword', 
    component: ForgetPasswordComponent, 
    data: {
      animation: 'Home'
    }
  },
  {
    path: 'otp', 
    component: OtpComponent, 
    canActivate: [RoleGuardService], 
    data: {
      animation: 'Home'
    } 
  },
  // {
  //   path: 'landing-page', 
  //   component: LandingPageComponent, 
  //   data: {animation: 'Home'}
  // },
  {
    path: 'landing-page',
    component: NewLandingPageComponent,
    data: {animation: 'Home'}
  },
  {
    path: 'explore',
    component: ExplorePageComponent,
    data: {animation: 'Home'}
  },
  
  {
    path: 'category', 
    component: CategoryWiseVideoComponent, 
    data: {animation: 'Home'}
  },
  
  {
    path: 'trending', 
    component: TrendingComponent, 
    data: {animation: 'Home'}
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    data: {animation: 'Home'}
  },
  {
    path: 'terms',
    component: TermsConditionsComponent,
    data: {animation: 'Home'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {animation: 'Home'}
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {animation: 'Home'}
  },
  
  // After login
  {
    path: 'thats-all', 
    component: ThatsallComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'complete-profile', 
    component: ProfileCompletionComponent, 
    canActivate: [AuthGuardService],
    data: {animation: 'Home'}
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'} 
  },
  {
    path: 'upload-videos', 
    component: UploadVideosComponent,
    canActivate: [AuthGuardService],
    data: {animation: 'Home'}
  },
  {
    path: 'editProfile', 
    component: EditProfileComponent,
    canActivate: [AuthGuardService],
    data: {animation: 'Home'}
  },
  {
    path: 'create-interactive-video', 
    component:CreateInteractiveVideoComponent,
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'videos', 
    component: PublicVideoComponent, 
    data: {animation: 'Home'}
  },
  {
    path: 'my-videos', 
    component: MyVideosComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'public-profile', 
    component: PublicProfileComponent, 

    data: {animation: 'Home'}
  },
  {
    path: 'my-videos-public', 
    component: MyVideosPublicComponent, 
     
    data: {animation: 'Home'}
  },
  {
    path: 'search-results', 
    component: SearchResultsComponent, 
    data: {animation: 'Home'}
  },
  {
    path: 'following', 
    component: FollowingComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'followers', 
    component: FollowersComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'user-activity', 
    component: UserActivitiyComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'public-user-activity', 
    component: PublicUserActivitiyComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'notifications', 
    component: NotificationsComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  {
    path: 'library', 
    component: LibraryComponent, 
    canActivate: [AuthGuardService], 
    data: {animation: 'Home'}
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
