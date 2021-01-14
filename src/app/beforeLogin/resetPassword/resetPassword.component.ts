import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { CrudService } from 'src/app/crud.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public urlService:CrudService, public router:Router,public toastr: ToastrService) { }
  public resetPasswordObj:any = {email:'', spinner: false}

  ngOnInit() {
    if(!!window.localStorage.getItem('token'))
    {
      this.router.navigate(['dashboard'])
    }
  }
  changeUserLogin(id)
    {
      if ($('#'+id).val() != ""){
          $('#'+id).siblings('.input-field').addClass('video_input_focus');
          $('#'+id).addClass('focusIn');
        }else{
          $('#'+id).siblings('.input-field').removeClass('video_input_focus');
        }
     }

     onSubmit()
     {
        this.resetPasswordObj.spinner = true;
        let obj:any = {email:this.resetPasswordObj.email}
        window.localStorage.removeItem('anonymousToken')
        this.urlService.forgotPassword(obj).subscribe(
          success =>{
            this.resetPasswordObj.spinner = false;
            this.resetPasswordObj.email = '';
            this.toastr.success(success.message);
          },
          error =>{
            this.resetPasswordObj.spinner = false;
          })
     }

}
