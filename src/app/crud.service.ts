import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map, last, tap , mergeMap} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment.prod';


/**
 * Provider for handling the requests (API calls) to the server
 */
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  /**
   * Percentage progress for uploading and transcoding videos
   */
  progressPercentage: any = 0
  
  /**
   * API url 
   */
  apiUrl = environment.API_URL;

  /**
   * Common HTTP headers for all requests
   */
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) { }

  /**
   * User sign up (creating a new user account)
   * @param data {object} request object
   */
  signup(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/register`;
    return this.http.post(API_URL, data);
  }

  /**
   * Regenerate OTP
   * @param data {object} request object 
   */
  regenrateOTP(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/generateotp`;
    return this.http.post(API_URL, data);
  }

  /**
   *Verify OTP 
   * @param data {object} request object
   */
  verifyOTP(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/verifyotp`;
    return this.http.post(API_URL, data);
  }


  /**
   * User login
   * @param data {object} request object
   */
  login(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/auth/local`;
    return this.http.post(API_URL, data);
  }

  /**
   * User logout
   * @param data {object} request object
   */
  logout(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/auth/logout`;
    return this.http.post(API_URL, data);
  }

  /**
   * User logout
   * @param data {object} request object
   */
  loginDetails(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/logindetails`;
    return this.http.post(API_URL, data);
  }

  
    // get category wise videos
  userCategoryWiseVideos(cat:any): Observable<any> {
  
    let API_URL = `${this.apiUrl}/users/getVideosByCategory?category`;
    return this.http.post(API_URL,cat);
  }


/**
   * Gets user specific details after successful login
   */
  userDetails(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/me`;
    return this.http.get(API_URL);
  }

  /**
   * Uploading a user's profile picture
   * @param data {object} request object
   */
  completeProfile(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/profilePic`;
    return this.http.post(API_URL, data);
  }

  /**
   * Fetching all avialable categories
   */
  fetchCategories(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/categories`;
    return this.http.get(API_URL);
  }
  //get top videos
  getAllTopVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/admin/displayTopVideos`;
    return this.http.get(API_URL);
  }
  /**
   * 
   * @param data {object} request object
   */
  forgotPassword(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/forgotPassword`;
    return this.http.post(API_URL, data);
  }

  //confirmToken
  confirmToken(data): Observable<any> {
    let API_URL = `${this.apiUrl}/verify/reset-password?token=` + data;
    return this.http.get(API_URL);
  }

  //resetPassword
  resetPassword(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/ResetPassword`;
    return this.http.post(API_URL, data);
  }


  //profile Pic Update
  updateProfilePic(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updateprofilePic`;
    return this.http.post(API_URL, data);
  }

  //update profile Details
  updateProfileProfile(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updateprofiledetails`;
    return this.http.post(API_URL, data);
  }

  //update profile Details
  updateProfilePassword(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updateprofilepassword`;
    return this.http.post(API_URL, data);
  }

  //Delete Account
  deleteAccount(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deleteuser`;
    return this.http.delete(API_URL);
  }

  // Deactivate Account 
  deactivateAccount(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deactivate`;
    return this.http.post(API_URL, data);
  }

  // Get uploaded videos
  getUploadedVideo(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/videolist`;
    return this.http.get(API_URL);
  }

  //create presignedUrl
  createpresignedUrl(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/createpresignedurl`;
    return this.http.post(API_URL, data);
  }


  //upload video to s3
  uploadVideo(data, file): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/octet-stream');
    //headers.set('Content-Type', 'application/octet-stream');
    let API_URL = data;

    const req = new HttpRequest('PUT', API_URL, file, {
      reportProgress: true,
      headers: headers
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last() 
    );
  }

  public getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      // case HttpEventType.Sent:
      //   return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;

      // case HttpEventType.Response:
      //   return `File "${file.name}" was completely uploaded!`;

      // default:
      // return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
  showProgress(s) {
    this.progressPercentage = s
  }

  getProgress() {
    if (this.progressPercentage == undefined) {
      return 0;
    } else {
      return this.progressPercentage
    }
  }

  //Delete presigned Url
  deletePresignedURL(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deletepresignedurl`
    return this.http.post(API_URL, data);
  }

  //create Interactive Video
  createInteractiveVideo(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/bookmarkvideos`
    return this.http.post(API_URL, data);
  }

  //get Interactive Video
  getInteractiveVideo(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getallmainvideos`
    return this.http.get(API_URL);
  }


  //update Interactive Video
  updateInteractiveVideo(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updatechildvideos`
    return this.http.post(API_URL, data);
  }

  // Get all child videos
  getChildVideosAll(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getbookmarkvideos?mainId=` + data
    return this.http.get(API_URL);
  }

  //deletebook mark video
  deleteBookMarkVideo(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deletebookmarkvideos?videoId=`+data
    return this.http.delete(API_URL);
  }
  

  //deletebook child video
  deleteChildVideo(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deleteChildVideos`
    return this.http.post(API_URL,data);
  }

  // upload thumbnails
  uploadThumbnails(data): Observable<any> {
    let API_URL = `${this.apiUrl}/users/uploadMainvideotumb`
    return this.http.post(API_URL, data);
  }

  // Transcode video
  transcodeVideo(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Access-Control-Allow-Methods', 'POST');
    let API_URL = `${this.apiUrl}/users/transcodevideo`;
    return this.http.post(API_URL, data);
  }

  // Check transcoding status
  checkTranscodingStatus(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/transcodevideostatus`;
    return this.http.post(API_URL, data);
  }

  // Comment and Reply
  commentAndReply(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/commentReply`;
    return this.http.post(API_URL, data);
  }

  // Like and Unlike
  likeAndUnlike(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/likeUnlike`;
    return this.http.post(API_URL, data);
  }

  // Get all comments on a video
  getAllComments(videoId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getallcomments?videoID=` +videoId;
    return this.http.get(API_URL);
  }

  // Get likes info
  getVideoLikesInfo(videoId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getvideolikesinfo?videoID=` +videoId;
    return this.http.get(API_URL, videoId);
  }
 
  // Get comments info
  getCommentInfo(commentId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getcommentinfo?videoID=` +commentId;
    return this.http.get(API_URL, commentId);
  }

  // Get user info
  getUserInfo(userId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getuserinfo?userID=`+userId;
    return this.http.get(API_URL);
  }

  // Follow user 
  followUser(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/followUnfollow`;
    return this.http.post(API_URL, data); 
  }

  // Get video details
  getVideoDetails(videoId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getvideolikesinfo?videoID=`+videoId;
    return this.http.get(API_URL);
  }

  // publish/unpublish video
  publishunpublish(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/publish`;
    return this.http.post(API_URL, data);
  }

  //Update privacy settings
  updatePrivacySetting(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updatePrivacySettings`;
    return this.http.post(API_URL, data);
  }

  // Update notification settings
  updateNotificationSettings(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/updateNotificationsettings`;
    return this.http.post(API_URL, data);
  }

  // Share an interactive video internally
  shareVideo(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/share`;
    return this.http.post(API_URL, data);
  }

  // Get user videos
  getUserVideos(userId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getVideoByUser?userID=` +userId;
    return this.http.get(API_URL, userId);
  }
  
  //Check permissions for public videos
  getVideoPermissions(videoId: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/publicVideoValidation?videoID=` +videoId;
    return this.http.get(API_URL, videoId);
  }

  // Get video views
  saveViewCount(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/viewCount`;
    return this.http.post(API_URL, data);
  }

  //Watch history
  watchHistory(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/watchHistory`;
    return this.http.post(API_URL, data);
  }

  //Get watch history 
  getWatchHistory(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getWatchHistory`;
    return this.http.get(API_URL);
  }

  // Get watch history by user
  getWatchHistoryByUser(userID: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getWatchHistory?userID=` +userID;
    return this.http.get(API_URL, userID);
  }

  // Set watch history
  setWatchHistory(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/setwatchedDuration`;
    return this.http.post(API_URL, data);
  }
  getWatchedHistory(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getwatchedDuration?videoID=`+data;
    return this.http.get(API_URL);
  }
  

  // Get shared videos by user 
  getUserShares(userID?: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getShareInfo?userID=` +userID;
    return this.http.get(API_URL);
  }

  // Get likes videos by user
  getLikedVideos(userID?: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getlikesinfobyuser?userID=` +userID;
    return this.http.get(API_URL);
  }

  // Get user activity 
  getUserActivity(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/activityInfo`;
    return this.http.get(API_URL);
  }

  // Search videos
  searchVideo(word: any, params?: any): Observable<any> {
    
      let API_URL = `${this.apiUrl}/users/searchByvideoName?word=`+word +'&'+params;
      return this.http.get(API_URL);
   
    // let API_URL = `${this.apiUrl}/users/searchByvideoName?word=` +word;
    // return this.http.get(API_URL);
  }

  simpleVideoSearch(term?:any):Observable<any>
  {
    let API_URL = `${this.apiUrl}/users/searchByvideoName?word=` +term;
      return this.http.get(API_URL);
  }


  //chandan
  getvideoInfo(videoID?:any):Observable<any> {
    let API_URL = `${this.apiUrl}/users/getvideoInfo?videoID=` +videoID;
    return this.http.get(API_URL);
  }

  shareInternally(data?:any):Observable<any> {
    let API_URL = `${this.apiUrl}/users/share`;
    return this.http.post(API_URL,data);
  }

  // Google sign in
  googleLogin(): Observable<any> {
    let API_URL = `${this.apiUrl}/auth/google`;
    return this.http.get(API_URL);
  }

  // Facebook sign in 
  facebookLogin(): Observable<any> {
    let API_URL = `${this.apiUrl}/auth/facebook`;
    return this.http.get(API_URL);
  }

  // Get notifications
  getNotifications(type: any): Observable<any> {
    // let queryParams: any = new HttpParams();
    let API_URL = `${this.apiUrl}/users/notification/` +type;
    return this.http.get(API_URL);
  }

   // Get notifications
   getAllNotifications(): Observable<any> {
    // let queryParams: any = new HttpParams();
    let API_URL = `${this.apiUrl}/users/notification/viewAll`;
    return this.http.get(API_URL);
  }


  // Change notification status
  postNotification(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/notification`;
    return this.http.post(API_URL, data);
  }

  // Set contributor
  setContributor(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/setcontributor`;
    return this.http.post(API_URL, data);
  }

  // Get contributors
  getContributors(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getcontributor`;
    return this.http.get(API_URL);
  }

  // Get landing page data 
  getLandingPageData(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getLandingPageData`;
    return this.http.get(API_URL);
  }

  // Get main and child videos
  getParentChildData(userId: any, parentVideoId: any): Observable<any> {
    let PARENT_API_URL = `${this.apiUrl}/users/getuserinfo?userID=` +userId;
    let CHILD_API_URL =  `${this.apiUrl}/users/getbookmarkvideos?mainId=` +parentVideoId;
    let parentResponse = this.getUserInfo(userId);
    let childResponse = this.getChildVideosAll(parentVideoId);
    return forkJoin([parentResponse, childResponse]);
    // return this.http.get('/api/people/1').pipe(mergeMap(character => this.http.get(character.homeworld)));
    // return this.http.get(PARENT_API_URL).pipe(mergeMap(character => this.http.get()));
  }

  // Child watch history
  setChildWatchHistory(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/childWatchHistory`;
    return this.http.post(API_URL, data);
  }

  // Get choice break down
  getChoiceBreakdown(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/choiceBreakdown`;
    return this.http.get(API_URL);
  }

  // Get top viewed child
  getTopViewedChild(videoID: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/topViewedChild?videoID=` +videoID;
    return this.http.get(API_URL);
  }

  // Get bookmarked video for contributor
  getVideoForContributor(videoID: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getBookmarkedVideoForContributor?videoID=` +videoID;
    return this.http.get(API_URL);
  }

  // Update password
  updatePassword(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/password`;
    return this.http.put(API_URL, data);
  }

  yourFirstDecision(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/yourDecision?parentId=` +id;
    return this.http.get(API_URL);
  }

  mostPopularPath(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/mostPopularPath?mainId=` +id;
    return this.http.get(API_URL);
  }

  getAnonymousUser(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/anonymousUser`;
    return this.http.get(API_URL);
  }

  registerAnonymousUser(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/registerAnonymousUser`;
    return this.http.post(API_URL, data);
  }

  getTopChoices(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/topChoices?parentId=` +id;
    return this.http.get(API_URL);
  }
  getViewerChoiceHighlight(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/viewerChoice?userId=`+id;
    return this.http.get(API_URL);
  }

  bookmarkTemplateVideos(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/bookmarkTemplateVideos`;
    return this.http.post(API_URL,id);
  }

  deleteThumbnails(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/deleteMainVideoThumb`;
    return this.http.post(API_URL,id);
  }
  

  //explore page

  getCategorywiseData(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getCategorywiseData`;
    return this.http.get(API_URL);
  }
  getexploreVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/exploreVideos`;
    return this.http.get(API_URL);
  }
  getsearchVideosByKeyword(id:any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/searchVideosByKeyword?keyword=`+id;
    return this.http.get(API_URL);
  }

  getgetRandomVideos(id:any): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getRandomVideos?page=`+id;
    return this.http.get(API_URL);
  }

 

  getrecommendedVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/recommendedVideos`;
    return this.http.get(API_URL);
  }
  gettopViewedVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/topViewedVideos`;
    return this.http.get(API_URL);
  }

  gethighlyInteractiveVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/highlyInteractiveVideos`;
    return this.http.get(API_URL);
  }
  getlatestPublishedVideos(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/latestPublishedVideos`;
    return this.http.get(API_URL);
  }
  getpopularCategories(): Observable<any> {
    let API_URL = `${this.apiUrl}/users/popularCategories`;
    return this.http.get(API_URL);
  }

  getCommonItem(item): Observable<any> {
    let API_URL = `${this.apiUrl}/users/getCommonItem?userIds=`+item;
    return this.http.get(API_URL);
  }


  
}
