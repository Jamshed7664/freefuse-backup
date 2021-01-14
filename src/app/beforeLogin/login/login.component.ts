import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../environments/environment';

declare var $;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public urlService: CrudService, 
    public toastr: ToastrService, 
    public router: Router,
    public activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {

        if (params.token) {
          if(window.localStorage.getItem('token')){
            window.localStorage.removeItem('token')
          }
          window.localStorage.setItem('token', params.token);
          this.router.navigate(['dashboard']);
        }
        else{
          if (!!window.localStorage.getItem('token')) {
            this.router.navigate(['dashboard'])
          }
        } 


  if (window.localStorage.getItem('token')) {
     
  } else {
    if (window.localStorage.getItem('anonymousToken')) {
    } else {
      this.getAnonymousUser();
    }
  }


        
      });  
   }
  public loginObject: any = { email: '', password: '', isFirstFormCompleted: false, spinner: false, profilePic: '', userName: '' };
  public fieldPassTextType: boolean = false;
  deactivated: boolean = false;





  ngOnInit() {
    // if (!!window.localStorage.getItem('token')) {
    //   this.router.navigate(['dashboard'])
    // }
    setTimeout(() => {
      $(document).trigger('click')
    }, 1000)
  }

  loginFirstStep() {
    this.loginObject.spinner = true;

    //Api call here
    let finalObj: any = {
      "email": this.loginObject.email,
    }
    
    this.urlService.loginDetails(finalObj).subscribe(
      success => {
        
        //this.router.navigate(['/otp']);
        // window.localStorage.setItem('email',this.signupObject.email)     
        this.loginObject.userName = success.data.username
        this.loginObject.profilePic = success.data.profilepic
        this.loginObject.spinner = false;
        this.loginObject.isFirstFormCompleted = true;
      },
      error => {
        this.loginObject.spinner = false;
      }
    )
  }

  getAnonymousUser() {
    this.urlService.getAnonymousUser().subscribe(
      success => {
        if (window.localStorage.getItem('anonymousToken')) {
        } else {
          window.localStorage.setItem('anonymousToken', success.data.token);
        }
      }
    );
  }
  
  onSubmit() {
    this.loginObject.spinner = true;
    let finalObj: any = {
      "email": this.loginObject.email,
      "password": this.loginObject.password
    }

    this.urlService.login(finalObj).subscribe(
      success => {
        window.localStorage.setItem('token', success.data.token)
        this.urlService.userDetails().subscribe(
          success => {
            localStorage.removeItem('anonymousToken');
            this.deactivated = success.data.details.isDeactivated;
            if (success.data.details.isOtpVerified) {
              if (success.data.details.isfirstlogin) {
                this.router.navigate(['/complete-profile']);
                this.loginObject.spinner = false;
              }
              else {
                if (success.data.details.isDeactivated) {
                  this.toastr.info('Account deactivated');
                  this.router.navigate(['/login']);
                  this.loginObject.spinner = false;
                } else {
                  this.router.navigate(['/dashboard']);
                  this.loginObject.spinner = false;
                }
                //this.router.navigate(['/dashboard']);
              }
            }
            else {
              window.localStorage.setItem('email', success.data.details.email);
              this.router.navigate(['/otp'])
            }
          },
          error => {
          })
      },
      error => {
        this.loginObject.spinner = false;
        if (error.error.data.message == 'Otp not verified') {
          window.localStorage.setItem('email', this.loginObject.email);
          this.router.navigate(['/otp'])
        }
        //  console.log(error.error.data.message)
      }
    )
  }

  changeUserLogin(id) {
    if ($('#' + id).val() != "") {
      $('#' + id).siblings('.input-field').addClass('video_input_focus');
      $('#' + id).addClass('focusIn');
    } else {
      $('#' + id).siblings('.input-field').removeClass('video_input_focus');
    }
  }

  activateAccount() {
    let obj:any = {
      requestType: "Activate"
    };
    this.urlService.deactivateAccount(obj).subscribe(
      success => {
        this.deactivated =false;
        this.toastr.success('Account Activated');
        this.router.navigate(['login']);
        this.loginObject.spinner = false;
      }, error => {
        this.toastr.error('Error occured during activation');
      }

    );
  }

  togglePasswordTextType() {
    this.fieldPassTextType = !this.fieldPassTextType;
  }

  googleLogin() {
    let url = environment.API_URL+'/auth/google';
    this.router.navigate([]).then(result => {window.location.replace(url)});
  }

  fbLogin() {
    let url = environment.API_URL+'/auth/facebook';
    this.router.navigate([]).then(result => {window.location.replace(url)});
  }
}
