import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  constructor(public urlService: CrudService, public router: Router) { }
  public signupObject: any = { email: '', firstname: '', lastname: '', username: '', password: '', cPassowrd: '', isFirstFormCompleted: false, spinner: false }
  public fieldPassTextType: boolean = false;
  public fieldCPassTextType: boolean = false;

  ngOnInit() {
    if (!!window.localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
    }
  }

  changeUserLogin(id) {
    if ($('#' + id).val() != "") {
      $('#' + id).siblings('.input-field').addClass('video_input_focus');
      $('#' + id).addClass('focusIn');
    } else {
      $('#' + id).siblings('.input-field').removeClass('video_input_focus');
    }
  }

  onSubmit() {
    this.signupObject.spinner = true;
    let finalObj: any = {
      "role": "user",
      "firstname": this.signupObject.firstname,
      "lastname": this.signupObject.lastname,
      "username": this.signupObject.username,
      "email": this.signupObject.email,
      "password": this.signupObject.password
    }

    if (window.localStorage.getItem('anonymousToken')) {
      this.urlService.registerAnonymousUser(finalObj).subscribe(
        success => {
          window.localStorage.removeItem('anonymousToken');
          this.router.navigate(['/otp']);
          window.localStorage.setItem('email', this.signupObject.email)
          this.signupObject.spinner = false;
        }, 
        error => {
          if(error){
            this.signupObject.spinner = false;
          }

        });
    } else {
      this.urlService.signup(finalObj).subscribe(
        success => {
          window.localStorage.removeItem('anonymousToken');
          this.router.navigate(['/otp']);
          window.localStorage.setItem('email', this.signupObject.email)
          this.signupObject.spinner = false;
        },
        error => {
          this.signupObject.spinner = false;
        });
    }

    // this.urlService.signup(finalObj).subscribe(
    //   success => {
    //     this.router.navigate(['/otp']);
    //     window.localStorage.setItem('email', this.signupObject.email)
    //     this.signupObject.spinner = false;
    //   },
    //   error => {
    //     this.signupObject.spinner = false;
    //   }
    // )
  }

  togglePasswordTextType() {
    this.fieldPassTextType = !this.fieldPassTextType;
  }

  toggleCPasswordTextType() {
    this.fieldCPassTextType = !this.fieldCPassTextType;
  }
}
