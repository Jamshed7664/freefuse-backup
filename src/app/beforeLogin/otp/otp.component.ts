import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(public urlService:CrudService, public router:Router,public toastr: ToastrService) { }
  public otpObj:any = {spinner:false,otp:''};
  ngOnInit() {
    this.otpObj.email = window.localStorage.getItem('email')
  }

  /**
   * Regenerate OTP
   */
  regeneratOTP(){
    window.localStorage.removeItem('anonymousToken')
    this.otpObj.spinner = true;
    // let finaObj:any = {email:this.otpObj.email}
    let finaObj:any = {
      email:this.otpObj.email,
      otp:this.otpObj.otp,
      type: 'null',
      newEmail: 'null'
    }
    this.urlService.regenrateOTP(finaObj).subscribe(
      success =>{
        //this.router.navigate(['/otp']);
       // window.sessionStorage.setItem('email',this.signupObject.email)        
       this.otpObj.spinner = false;
      },
      error=>{
       this.otpObj.spinner = false;
      }
    )
  }

  /**
   * Verify OTP
   */
  verifyOTP()
  {
    this.otpObj.spinner = true;
    window.localStorage.removeItem('anonymousToken')
    let finaObj:any = {
      email:this.otpObj.email,
      otp:this.otpObj.otp,
      type: 'null',
      newEmail: 'null'
    }
    this.urlService.verifyOTP(finaObj).subscribe(
      success =>{
       this.toastr.success(success.message);
       
       window.localStorage.removeItem('email') ;
       if(!!window.localStorage.getItem('token'))
         {
       this.urlService.userDetails().subscribe(
        success =>{
         
            if(success.data.isfirstlogin)
            {
              this.router.navigate(['/complete-profile'])
            }
            else{
              this.router.navigate(['/dashboard'])
            }
          
         
        })
      }
      else{
        this.router.navigate(['/login']);
      }
       
       this.otpObj.spinner = false;
      },
      error=>{
        
       this.otpObj.spinner = false;
      }
    )
  }

  /**
   * Change user login
   * @param {any} id user id
   */
  changeUserLogin(id: any) {
    if ($('#'+id).val() != ""){
        $('#'+id).siblings('.input-field').addClass('video_input_focus');
        $('#'+id).addClass('focusIn');
      }else{
        $('#'+id).siblings('.input-field').removeClass('video_input_focus');
      }
   }

}
