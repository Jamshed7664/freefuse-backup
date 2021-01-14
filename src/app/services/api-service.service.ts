import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * API url for staging
   */
  apiURL = environment.API_URL;

  // apiURL = 'https://me8kg4p1a9.execute-api.us-east-1.amazonaws.com/dev/api/v1';
  
  /**
   * Common HTTP headers for all requests
   */
  
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param loginObject //Login object containing email and password of admin
   */
  adminLogin(loginObject: any): Observable<any> {
    let API_URL = `${this.apiURL}/auth/admin`;
    return this.http.post(API_URL, loginObject);
  }

  /**
   * API call for admin logout
   */
  adminLogout(data: any): Observable<any> {
    let API_URL = `${this.apiURL}/auth/adminLogout`;
    return this.http.post(API_URL, data);
  }

  /**
   * API call for getting all registered users
   */
  getAllUsers(): Observable<any> {
    let API_URL = `${this.apiURL}/admin/users`;
    console.log('prod: ', API_URL);
    return this.http.get(API_URL);
  }

  /**
   * API call for getting all interactive videos
   */
  getAllVideos(): Observable<any> {
    let API_URL = `${this.apiURL}/admin/interactiveVideos`;
    return this.http.get(API_URL);
  }

  getTopVideos(): Observable<any> {
    let API_URL = `${this.apiURL}/admin/displayTopVideos`;
    return this.http.get(API_URL);
  }

  selectTopVideos(data: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/topVideos`;
    return this.http.post(API_URL, data);
  }

  getAllUploadedVideos(): Observable<any> {
    let API_URL = `${this.apiURL}/admin/uploadedVideos`;
    return this.http.get(API_URL);
  }

  // Delete user
  deleteUser(data: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/deleteUser`;
    return this.http.post(API_URL, data);
  }

  // Re-enable user
  enableUser(data: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/enableUser`;
    return this.http.post(API_URL, data);
  }

  // Delete video
  deleteVideo(videoId: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/deleteVideo?=` +videoId;
    return this.http.delete(API_URL);
  }

  //chanage password
  changePassword(video: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/changePassword`;
    return this.http.post(API_URL,video);
  }

  
  addThumbnails(video: any): Observable<any> {
    let API_URL = `${this.apiURL}/admin/uploadTopvideoThumb`;
    return this.http.post(API_URL,video);
  }


  
}
