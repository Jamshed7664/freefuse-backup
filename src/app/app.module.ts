import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SelectDropDownModule } from 'ngx-select-dropdown';
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons'
// import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonModule } from '@ngx-share/button';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {OwlModule} from 'ngx-owl-carousel';
     
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor';

// Angular dependecies
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';


// Before login Components
import { LoginComponent } from './beforeLogin/login/login.component';
import { SignupComponent } from './beforeLogin/signup/signup.component';
import { ResetPasswordComponent } from './beforeLogin/resetPassword/resetPassword.component';
import { WithOutLoginFooterComponent } from './beforeLogin/withOutLoginFooter/withOutLoginFooter.component';
import { ForgetPasswordComponent } from './beforeLogin/forgotPassword/forgetPassword.component';
import { OtpComponent } from './beforeLogin/otp/otp.component';
// import { LandingPageComponent } from './beforeLogin/landing-page/landing-page.component';
import { NewLandingPageComponent } from './beforeLogin/new-landing-page/new-landing-page.component';

import { ExplorePageComponent } from './beforeLogin/explore/explore.component';
import { PrivacyPolicyComponent } from './beforeLogin/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './beforeLogin/terms-conditions/terms-conditions.component';
import { FaqComponent } from './beforeLogin/faq/faq.component'; 
import { CategoryWiseVideoComponent } from './beforeLogin/categoryWiseVideo/categoryWiseVideo.component'; 


// After login Components - router gaurds
import { ProfileCompletionComponent } from './afterLogin/profileCompletion/profileCompletion.component';
import { SideMenuComponent } from './afterLogin/sideMenu/sideMenu.component';
import { HeaderComponent } from './afterLogin/header/header.component';
import { FooterComponent } from './afterLogin/footer/footer.component';
import { DashboardComponent } from './afterLogin/Dashboard/dashboard.component';
import { UploadVideosComponent } from './afterLogin/uploadVideos/uploadVideos.component';
import { EditProfileComponent } from './afterLogin/editProfile/editProfile.component';
import { PublishFooterComponent } from './afterLogin/publishFooter/publishFooter.component';
import { CreateInteractiveVideoComponent } from './afterLogin/createInteractiveVideo/createInteractiveVideo.component';
import { ThatsallComponent } from './afterLogin/thatsall/thatsall.component';
import { PublicVideoComponent } from './afterLogin/public-video/public-video.component';
import { MyVideosComponent } from './afterLogin/my-videos/my-videos.component';
import { PublicProfileComponent } from './afterLogin/public-profile/public-profile.component';
import { MyVideosPublicComponent } from './afterLogin/my-videos-public/my-videos-public.component';
import { SearchResultsComponent } from './afterLogin/search-results/search-results.component';
import { FollowingComponent } from './afterLogin/following/following.component';
import { FollowersComponent } from './afterLogin/followers/followers.component';
import { UserActivitiyComponent } from './afterLogin/user-activitiy/user-activitiy.component';
import { PublicUserActivitiyComponent } from './afterLogin/public-user-activitiy/public-user-activitiy.component'; 
import { TrendingComponent } from './beforeLogin/trending/trending.component';
import { NotificationsComponent } from './afterLogin/notifications/notifications.component';
import { LibraryComponent } from './afterLogin/library/library.component';

// Comman Custom Components
import { SpinnerComponent } from './spinner/spinner.component';
import { SectionSpinnerComponent } from './sectionSpinner/sectionSpinner.component';
import { environment } from '../environments/environment';


// Comman Default
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importing service
// import { CrudService } from './crud.service';
import { RoleGuardService } from './role-gaurd.service';
import { AuthGuardService } from './router-gaurd.service';


// Importing custom Pipes
import {MinuteSecondsPipe} from './pipeFormatSecond';
import {SizePipe} from './pipeSize';
import {SearchPipe} from './pipeSearch';
import { SecondsToMinutePipe } from './seconds-to-minute.pipe'
import { DateAgoPipe } from './date-ago.pipe';

//Custom directive
import {VideoJS} from './videojsDirective';
import {imgName} from './imgDirective';
import {thumnailsDirective} from './thumnailsDirective';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutComponent } from './beforeLogin/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    WithOutLoginFooterComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    OtpComponent,
    ProfileCompletionComponent,
    SpinnerComponent,
    SectionSpinnerComponent,
    SideMenuComponent,
    DashboardComponent,
    UploadVideosComponent,
    CategoryWiseVideoComponent,
    EditProfileComponent,
    PublishFooterComponent,
    MinuteSecondsPipe,
    CreateInteractiveVideoComponent,
    ThatsallComponent,
    PublicVideoComponent,
    MyVideosComponent,
    PublicProfileComponent,
    MyVideosPublicComponent,
    SearchResultsComponent,
    FollowingComponent,
    FollowersComponent,
    // LandingPageComponent,
    NewLandingPageComponent,
    ExplorePageComponent,
    UserActivitiyComponent,
    PublicUserActivitiyComponent,
    TrendingComponent,
    NotificationsComponent,
    LibraryComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    FaqComponent,
    SizePipe,
    SearchPipe,
    VideoJS,
    imgName,
    thumnailsDirective,
    SecondsToMinutePipe,
    DateAgoPipe,
    AboutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // JwSocialButtonsModule,
    // ShareButtonsModule,
    // ShareButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    SelectDropDownModule,
    ToastrModule.forRoot(),
    AutocompleteLibModule,
    CarouselModule,
    OwlModule,
    NgSelectModule,
    MatSelectModule


  ],
  providers: [ RoleGuardService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
