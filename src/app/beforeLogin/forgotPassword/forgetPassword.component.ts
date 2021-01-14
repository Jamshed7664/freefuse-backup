import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public loginObject: any = { password: '', cPassowrd: '', spinner: false, intialToken: '' };
  public fieldPassTextType: boolean = false;
  public fieldCPassTextType: boolean = false;

  constructor(public urlService: CrudService, public router: Router, public route: ActivatedRoute, public toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.loginObject.intialToken = params['token'];
      if (!(!!params['token'])) {
        this.router.navigate(['login'])
      }
      else{
        window.localStorage.removeItem('anonymousToken')
      this.loginObject.spinner = true;
      this.urlService.confirmToken(this.loginObject.intialToken).subscribe(
        success => {
          this.loginObject.intialToken = success.data.data.resetToken
          this.loginObject.spinner = false;
        })
      }
    })
  }



  ngOnInit() {
    if (!!window.localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
    }
  }

  /**
   * Change user login
   * @param id {any} user id
   */
  changeUserLogin(id: any) {
    if ($('#' + id).val() != "") {
      $('#' + id).siblings('.input-field').addClass('video_input_focus');
      $('#' + id).addClass('focusIn');
    } else {
      $('#' + id).siblings('.input-field').removeClass('video_input_focus');
    }
  }


  /**
   * Makes a request for reseting the password
   */
  onSubmit() {
    this.loginObject.spinner = true;
    let finalObj: any = {
      "password": this.loginObject.password,
      resetToken: this.loginObject.intialToken
    }
    this.urlService.resetPassword(finalObj).subscribe(
      success => {
        this.toastr.success(success.message);
        this.loginObject.spinner = false;
        this.router.navigate(['/login']);
      })
  }

  /**
   * Show/Hide password for password field
   */
  togglePasswordTextType() {
    this.fieldPassTextType = !this.fieldPassTextType;
  }

  /**
   * Show/Hide password for confirm password field
   */
  toggleCPasswordTextType() {
    this.fieldCPassTextType = !this.fieldCPassTextType;
  }

}
