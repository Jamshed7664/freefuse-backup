import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'editProfile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css'],
})
export class EditProfileComponent implements OnInit {

  constructor(public urlService: CrudService, public router: Router, public toastr: ToastrService) { }
  public editProfileObject: any = { 
    email: '', 
    firstname: '', 
    lastname: '', 
    username: '', 
    password: '', 
    cPassowrd: '',
    newPassword: '', 
    spinner: false, 
    profilePic: '', 
    bio: '', 
    categories: [], 
    "show": 'first', 
    imagePath: '', 
    fileData: '', 
    allCategories: [], 
    checkedList: [], 
    showingObj: [],
    privacySettings: {},
    notificationa: {}, 
    updatedAt: '',
    createdAt: '',
    passwordUpdatedAt: '' 
  }
  public fieldPassTextType:any = false;
  public privacySettings: any = {};
  public notifications: any = {};

  public oldPassword: any = '';
  public confirmPassword: any = '';
  public newPassword: any = '';
  public fieldOldPassTextType: boolean = false;
  public fieldNewPassTextType: boolean = false;
  public fieldCNewPassTextType: boolean = false;

  ngOnInit() {


    this.editProfileObject.spinner = true;
    this.urlService.userDetails().subscribe(
      success => {
        this.editProfileObject.email = success.data.details.email;
        this.editProfileObject.firstname = success.data.details.firstname;
        this.editProfileObject.lastname = success.data.details.lastname;
        this.editProfileObject.categories = success.data.details.category;
        this.editProfileObject.profilePic = success.data.details.profilePic;
        this.editProfileObject.privacySettings = success.data.details.privacySettings;
        this.editProfileObject.notifications = success.data.details.notifications;
        if (success.data.details.bio) {
          this.editProfileObject.bio = success.data.details.bio[0];
        }
        this.editProfileObject.username = success.data.details.username;
        this.editProfileObject.updatedAt = success.data.details.updatedAt;
        this.editProfileObject.createdAt = success.data.details.createdAt;
        this.editProfileObject.passwordUpdatedAt = success.data.details.passwordUpdatedAt;
        this.filledItem();
        this.editProfileObject.spinner = false;

        this.urlService.fetchCategories().subscribe(
          success => {
            this.editProfileObject.allCategories = success.data.categories

            for (let i of this.editProfileObject.allCategories) {
              let temp: any = {}
              temp.name = i;
              temp.checked = false;
              if (!!this.editProfileObject.categories) {
                for (let j of this.editProfileObject.categories) {
                  if (j == i) {
                    temp.checked = true;
                  }
                }
                this.editProfileObject.showingObj.push(temp)
                this.editProfileObject.checkedList = this.editProfileObject.categories
              }
              else {

                this.editProfileObject.showingObj.push({ name: i, checked: false })


              }

            }

          },
          error => {
          })
      },

      error => {
        this.editProfileObject.spinner = false;
      }
    )
  }

  filledItem() {
    this.editProfileObject.show = 'first';
    setTimeout(() => {
      this.filledLogin('user_firstName');
      this.filledLogin('user_lastName');
      this.filledLogin('user_userName');
      // this.filledLogin('user_password');
      this.filledLogin('user_bio');

    })
  }

  filledLogin(id) {
    $('#' + id).siblings('.input-field').addClass('video_input_focus');
    $('#' + id).addClass('focusIn');
  }

  changeUserLogin(id) {
    if ($('#' + id).val() != "") {
      $('#' + id).siblings('.input-field').addClass('video_input_focus');
      $('#' + id).addClass('focusIn');
    } else {
      $('#' + id).siblings('.input-field').removeClass('video_input_focus');
    }
  }


  updateProfilePic() {
    this.editProfileObject.spinner = true;
    const formData = new FormData();
    formData.append('file', this.editProfileObject.fileData);

    this.urlService.updateProfilePic(formData).subscribe(
      success => {
        this.toastr.success('Image updated successfully');
        this.editProfileObject.spinner = false;
      }
    )
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.error('Only images are supported!');
      return;
    }

    var reader = new FileReader();
    this.editProfileObject.imagePath = files;
    this.editProfileObject.fileData = files[0]
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.editProfileObject.profilePic = reader.result;
    }
    this.updateProfilePic();

  }

  updateDetails() {
    this.editProfileObject.spinner = true;
    let obj: any = {};
    obj.bio = [this.editProfileObject.bio];
    // obj.category": ["Jwplayer","Videojs","videogular"],
    obj.category = this.editProfileObject.categories;
    obj.username = this.editProfileObject.username
    obj.firstname = this.editProfileObject.firstname
    obj.lastname = this.editProfileObject.lastname
    obj.email = this.editProfileObject.email

    this.urlService.updateProfileProfile(obj).subscribe(
      success => {
        this.toastr.success('Updated successfully');
        this.editProfileObject.spinner = false;
      }
    )
  }

  checkChange(e: any, obj: any) {
    if (e.target.checked) {
      this.editProfileObject.checkedList.push(obj.name);
    } else {
      for (var i = this.editProfileObject.allCategories.length; i > -1; i--) {
        if (this.editProfileObject.checkedList[i] == obj.name) {
          this.editProfileObject.checkedList.splice(i, 1);
        }
      }
    }
  }

  //Update privacy settings
  updatePrivacySettings(e: any, obj: any) {
    let flag: any = e.target;
    let finalObj = {
      'scenario': e.target.name,
      'flag': flag.checked
    }
    console.log('final obj: ', finalObj);
    this.urlService.updatePrivacySetting(finalObj).subscribe(success=> {
      this.toastr.success('Settings Updated');
    }, error => {
      this.toastr.error('Error');
    });
  }

  // Update notification settings
  updateNotificationSettings(e: any, obj: any) {
    let flag: any = e.target;
    let finalObj = {
      'scenario': e.target.name,
      'flag': flag.checked
    }
    console.log('final obj: ', finalObj);
    this.urlService.updateNotificationSettings(finalObj).subscribe(success=> {
      this.toastr.success('Settings Updated');
    }, error => {
      this.toastr.error('Error');
    });
  }


  updateCategories() {
    this.editProfileObject.categories = this.editProfileObject.checkedList
    console.log(this.editProfileObject.checkedList, this.editProfileObject.checkedList.length);
    let totalCategories = this.editProfileObject.checkedList.length;
    if (totalCategories < 1) {
      this.toastr.error('Please select at at least one category');
    } else {
      this.updateDetails();
      $("#update-cat-Modal").modal("hide");
    }
    // this.updateDetails();
  }

  updateEmail() {
    console.log(this.editProfileObject.email);
    let oldEmail = this.editProfileObject.email
    let finalObj: any = {
      email: oldEmail,
      type: 'updateEmail',
      newEmail: this.editProfileObject.email
    };
    console.log(finalObj)

    this.urlService.updateProfileProfile(finalObj).subscribe(
      success => {
        this.router.navigate(['/otp']);
        window.localStorage.setItem('email', this.editProfileObject.email)
        this.editProfileObject.spinner = false;
      },
      error => {
        this.editProfileObject.spinner = false;
      }
    )
    $("#edit-email-Modal").modal("hide");
  }

  updatePassword() {
    this.editProfileObject.spinner = true;
    let obj: any = {};
    obj.oldPassword = this.oldPassword;
    obj.newPassword = this.newPassword;
    this.urlService.updatePassword(obj).subscribe(success=>{
      this.toastr.success('Password updates successfully');
      this.editProfileObject.spinner = false;

    }, 
    error=>{
      this.toastr.success('Error while updating password');
      this.editProfileObject.spinner = false;
    });
    $("#edit-password-Modal2").modal("hide");
    //obj.password = this.editProfileObject.password;
    // this.urlService.updateProfilePassword(obj).subscribe(
    //   success => {
    //     this.toastr.success('Password updates successfully');
    //     this.editProfileObject.spinner = false;
    //   }
    // )
  }

  toggleOldPasswordTextType() {
    this.fieldOldPassTextType = !this.fieldOldPassTextType;
  }

  toggleNewPasswordTextType() {
    this.fieldNewPassTextType = !this.fieldNewPassTextType;
  }

  toggleCNewPasswordTextType() {
    this.fieldCNewPassTextType = !this.fieldCNewPassTextType;
  }

  changePassword() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/forgotPassword']);
    
  }

  deactivateAccount () {

    this.editProfileObject.spinner = true;
    let requestObj: any = {
      requestType: "Deactivate"
    };
    $('#deact-acc-Modal').modal('hide');
    this.urlService.deactivateAccount(requestObj).subscribe(
      success => {
        window.localStorage.removeItem('token')
        this.toastr.success('Account Deactivated');
        this.router.navigate(['login']);
        this.editProfileObject.spinner = false;
      }, error => {
        this.toastr.error('Error occured during deactivation');
      }

    );
  }

  deleteAccount() {
   // let deleteAccount: any = confirm('Are you sure you want to delete account?');
    $('#del-acc-Modal').modal('hide');
      this.editProfileObject.spinner = true;
      this.urlService.deleteAccount().subscribe(
        success => {
          this.toastr.success('Account deleted successfully!');
          localStorage.clear();
          this.router.navigate(['login']);
          this.editProfileObject.spinner = false;
        }
      )
    
  }
}
