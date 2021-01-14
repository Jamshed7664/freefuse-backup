import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
// import { setInterval } from 'timers';
import { fadeInOutAnimation } from './../../ngifAnimation';

declare var $;

@Component({
  selector: 'uploadVideos',
  templateUrl: './uploadVideos.component.html',
  styleUrls: ['./uploadVideos.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class UploadVideosComponent implements OnInit, AfterViewInit {

  constructor(public urlService:CrudService, public router:Router,public toastr: ToastrService,public sanitizer:DomSanitizer) { }
  public uploadVideoObject:any = {spinner:false,allVideos:[],selectedVideos:[],format:'',url:'',isUploaded:false,duration:0,name:'',type:'',size:'',preSignedUrl:'',file:'',allUploadedVideo:[],allUrls:[],changeFilterUploadVideo:'recentFirst',changeFilterURL:'recentFirst',uploadPercentage:0, loadingVideo: false}
  public isUploaded:any = false;
  public allVideos:any = [];
  public selectedVideos:any = [];
  public allUploadedVideo:any = [];
  public uploadPercentage:any = 0;
  public spinner:any = false;
  public loadingVideo:any = false;
  public uploadedCount:any = 0;
  public finalCount:any = 0
  isTemplate:any =false;
  isOpen:any  = false;
  public changeFilterUploadVideoVal:any  = 'recentFirst';
 templatetypes:any = [
   {
     id:1,
     name: "Standard Pyramid",
     type: '1:2:4',
     src: '../../../assets/images/standard-pyramid.svg'
   },
   {
    id:2,
    name: "Standard Triangle",
    type: '1:2',
    src: '../../../assets/images/standard-triangle.svg'
  },
  {
    id:3,
    name: "Standard Diamond",
    type: '1:2:4:2:1',
    src: '../../../assets/images/standard-diamond.svg'
  },
  {
    id:4,
    name: "Standard Zipper",
    type: '1:3:2',
    src: '../../../assets/images/standard-zipper.svg'
  },
  {
    id:5,
    name: "Standard 2's",
    type: '1:2:2',
    src: '../../../assets/images/standard-2_s.svg'
  },
  {
    id:6,
    name: "Stoplight",
    type: '1:1:1',
    src: '../../../assets/images/stoplight.svg'
  },
  {
    id:7,
    name: "Stoplight Poll",
    type: '1:1:1:4',
    src: '../../../assets/images/stoplight-poll.svg'
  },{
    id:8,
    name: "Inforgraphic/Custom Workout",
    type: '1:4:3:2:1',
    src: '../../../assets/images/infographic_custom-workout.svg'
  }

 ];


  ngOnInit() {
    this.allVideos = [];
    this.selectedVideos = [];
    this.allUploadedVideo = [];
    this.uploadVideoObject.file = [];
    this.uploadPercentage = 0;
    this.callInitialList()
  }
  

  ngAfterViewInit() {
    
    
    
  }

  templatetypesmethod(i:any)
  {
    this.spinner = true;
    let obj:any = {templateId:i}
    this.urlService.bookmarkTemplateVideos(obj).subscribe(
      success => {
        console.log('xs',success.data)
        this.router.navigate(['create-interactive-video'], { queryParams: { video: success.data } });
        this.spinner = false;

        })
    
  }

  callInitialList() {

    this.spinner = true;
    this.allUploadedVideo = [];
    this.loadingVideo = true;
    this.urlService.getUploadedVideo().subscribe(
      success => {
        this.allVideos = success.data
        for (let i of this.allVideos) {
          if(!!i.originalName)
          {
            i.name = i.originalName
          }          
            this.allUploadedVideo.push(i)
       }
        this.allUploadedVideo =  this.allUploadedVideo.reverse()
          this.loadingVideo =  false;
          this.spinner = false; 
       
        
      },
      error => {
        this.spinner = false;

      })
  }

  cancelCurrentFile(j:any)
  {
    for(let i=this.uploadVideoObject.file.length - 1; i>=0;i--){
      if(this.uploadVideoObject.file[i].id == j.id)
      {
        this.uploadVideoObject.file.splice(i,1)
      }
    }
  }

  onSelectFile(event) {
    this.spinner = true;
    const file = event.target.files;
    let existItem = [];
    
    if (file) {
      //let file = fileInput.target.files[0];
      
      for(let i of file){
        
          i.originalName = i.name.replace(/[{()}]/g, '').replace(/\s/g,'');
          i.originalName = i.originalName.trim();
          
          i.id = Math.random();
          i.uploadPercentage = 0;
         //console.log(event.target)
          this.getDuration(i).then((duration) => {
            // duration in seconds (as float)
            i.duration = duration;
            //var modifiedDate = event.target.files[i].lastModifiedDate;
             
              if (i.type.indexOf('image') > -1) {
                i.format = 'image';
              } else if (i.type.indexOf('video') > -1) {
                i.format = 'video';
              }
              this.uploadVideoObject.file.push(i)

              existItem = existItem.filter(function(item, pos) {
                return existItem.indexOf(item) == pos;
            })
          
              for(let i= this.uploadVideoObject.file.length-1; i>=1;i--){
                for(let j of existItem)
                {
                  if(this.uploadVideoObject.file[i].originalName == j){
                   
                    this.uploadVideoObject.file.splice(i,1);
                    break;
                  }
                }
              }
            
             
          });
    }
  
  }
  setTimeout(()=>{
  this.uploadVideo();
},2000)
  }

   getDuration(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    let videoNode = document.createElement("video");
    let promise = new Promise(function(resolve, reject) {
      videoNode.addEventListener("loadedmetadata", function() {
        resolve(videoNode.duration);
      });
      videoNode.addEventListener("error", function() {
        reject(videoNode.error.message + "(" + videoNode.error.code + ")");
      });
    });
  
    const URL = window.URL;
    videoNode.src = URL.createObjectURL(file);
    videoNode.remove();
    return promise;
  }

  cancelUpload() {
    this.uploadVideoObject.file = [];
    $('video').trigger('pause');
    this.changeFilterUploadVideoVal = 'recentFirst';
    this.loadingVideo =  false;
    }

  uploadVideo() {
    this.toastr.info('Uploading!')
    this.spinner = true;
    // for(let i of this.uploadVideoObject.file)
    // {
  
      this.finalUpload(this.uploadVideoObject.file[0])
    // }
    
  }

  finalUpload(i)
  {

          let obj: any = { name: i.originalName, type: 'application/octet-stream', URL: null, duration: i.duration, thumbnail: '', size: i.size,originalName:i.name.split('.')[0]}

          this.urlService.createpresignedUrl(obj).subscribe(
            success => {
              i.counter = success.data.counter;
              this.uploadVideoObject.preSignedUrl = success.data.details
            // this.uploadVideoObject.selectedVideos = success.data
          
            this.urlService.uploadVideo(this.uploadVideoObject.preSignedUrl,i).subscribe(
              success =>{
                i.uploadPercentage = 0;
                let data: any = {name: i.originalName, counter: i.counter};
                this.toastr.info('Processing Video!') 
                this.transcodingJob(data,i)
                // On success call transcode video API
                // this.toastr.info('Video Processing!')
              },
              error =>{
                //this.uploadVideoObject.spinner = false;
                // let Obj:any = {name: i.originalName}
                // this.urlService.deletePresignedURL(Obj).subscribe(
                //   success =>{
                //     this.spinner = false;
                //     this.toastr.error('Uploading failed, Please try again!')
                //     this.uploadPercentage = 0
                //     this.isUploaded = false;
                //     return promise;
                //   })
              })

            
          
              this.progressPercentage(i)
            },
            error => {
              this.spinner = false;
              

            })
       
  }

progressPercentage(i)
{
  let interval =  setInterval(()=>{
    i.uploadPercentage =  this.urlService.getProgress()
    if( i.uploadPercentage > 99.9)
    {
      clearInterval(interval);
    }
  },1000)
}

  transcodingJob(data,i){
    this.urlService.transcodeVideo(data).subscribe(
      success => {
        i.uploadPercentage = 0;
        i.isOtherone = true;
        let requestObj: any = {
          name: i.originalName,
          type: 'application/octet-stream',
          counter: i.counter,
          transcodeId: success.data.transcodeId
        };
        if (i.uploadPercentage) {
          i.uploadPercentage =   i.uploadPercentage + 10  
        }
        this.checkStatus(requestObj,i);
        
       
      }, error => {
        // let data: any = {name: this.uploadVideoObject.name};
        // this.urlService.deletePresignedURL(data).subscribe(
        //   success => {
        //     this.spinner = false;  
        //     this.isUploaded = false
        //     i.uploadPercentage =0
        //     this.toastr.error('Upload not uploaded, please try again!') 
           
        //   }
        // );
      }
    );
  }

  checkStatus(requestObj,i)
  {
      this.urlService.checkTranscodingStatus(requestObj).subscribe(
        success => {
          //console.log(success.data);
          if (success.data._id != null || success.data._id != undefined) {
            
            this.toastr.info('Completed!');
            
              this.uploadVideoObject.file.shift();
              if(this.uploadVideoObject.file.length < 1){
                this.cancelUpload();
                this.callInitialList();
                
  
              this.spinner = false;
              this.finalCount =0;
              this.uploadedCount = 0;
              i.isOtherone = false;
              }
              else{
              this.uploadVideo();
              this.spinner = false;
              i.isOtherone = false;
              }
            
            
          }
          else{
         setTimeout(()=>{
           if(i.uploadPercentage < 95)
           {
            i.uploadPercentage = i.uploadPercentage + 5;
           }
           else{
            i.uploadPercentage = 98;
           }
           
              this.checkStatus(requestObj,i);
            //  this.toastr.info('Processing in progress!')
          },1000)
        }
        
        },
        error =>{
          this.checkStatus(requestObj,i);
        //   let data: any = {name: i.originalName};
        //   this.urlService.deletePresignedURL(data).subscribe(
        // success => {
        //       this.spinner = false;  
        //       this.isUploaded = false;
        //       i.uploadPercentage =0;
        //       this.toastr.error('Oops something went wrong, please try again!'); 
            
        //    })
        }
      );
    
  }
  // getDuration(e) {
  //   console.log(e)
  //   this.uploadVideoObject.duration = e.target.duration;
  //   //  alert(duration)
  // }

  // uploadURL()
  // {
  //   this.uploadVideoObject.spinner =  true;
  //   for(let i of this.uploadVideoObject.allVideos)
  //   {
  //     if(i.name == this.uploadVideoObject.url.changingThisBreaksApplicationSecurity)
  //     {
  //       this.toastr.warning("URL already Exist!");
  //       return;
  //     }
  //   }

  //   let obj:any = {name:this.uploadVideoObject.url.changingThisBreaksApplicationSecurity,type:"URL",URL:this.uploadVideoObject.url.changingThisBreaksApplicationSecurity,duration:this.uploadVideoObject.duration,thumbnail:'',size:''}
  //   this.urlService.createpresignedUrl(obj).subscribe(
  //     success =>{
  //       this.uploadVideoObject.preSignedUrl = success.data
  //       this.uploadVideoObject.spinner = false;
  //       this.cancelUpload();
  //       this.callInitialList();
  //       },
  //     error =>{
  //       this.uploadVideoObject.spinner = false;
  //     })

  // }

/** Return distinct message for sent, upload progress, & response events */
  public getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  // previewURL() {
  //   var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  //   var match = this.uploadVideoObject.Url.match(regExp);
  //   if (!match) {
  //     this.toastr.error('Invalid URaaaL!');
  //     this.uploadVideoObject.Url = '';
  //     return;
  //   }


  //   if (this.uploadVideoObject.Url.indexOf('https://www.youtube.com') !== -1) {
  //     let tempURL: any = ''
  //     tempURL = this.uploadVideoObject.Url.split('https://www.youtube.com')[1]
  //     // tempURL  = this.uploadVideoObject.Url[1]

  //     if (tempURL.indexOf('v=') !== -1) {
  //       tempURL = tempURL.split('v=')[1];
  //       this.uploadVideoObject.url = tempURL
  //     }
  //     else if (tempURL.indexOf('embed') !== -1) {
  //       tempURL = tempURL.split('embed/')[1];
  //       if (tempURL.indexOf('""') !== -1) {
  //         this.uploadVideoObject.Url = '';
  //         this.toastr.error('Invalid URL!');
  //         return;
  //       }
  //       this.uploadVideoObject.url = tempURL

  //     }
  //     else {
  //       this.toastr.error('Invalid URL!');
  //       this.uploadVideoObject.Url = '';
  //       return;
  //     }

  //     this.uploadVideoObject.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + tempURL);
  //     this.uploadVideoObject.isUploaded = true;
  //   }
  //   else {
  //     this.toastr.error('Only Valid Youtube URL Allowed!');
  //     this.uploadVideoObject.Url = '';
  //   }
  // }

  changeFilterUploadVideo(val) {

    if (val == 'recentFirst') {
      this.allUploadedVideo.sort(function (a, b) {
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return -1
      })
    }

    else if (val == 'size') {
      this.allUploadedVideo.sort(function (a, b) {
        if (a.size > b.size) {
          return -1;
        }
        return 1
      })
    }
    else if (val == 'duration') {
      this.allUploadedVideo.sort(function (a, b) {
        if (a.duration > b.duration) {
          return -1;
        }
        return 1
      })
    }
    else if (val == 'name') {
      this.allUploadedVideo.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        return 1
      })

    }

  }


  // changeFilterURL(val) {

  //   if (val == 'recentFirst') {
  //     this.uploadVideoObject.allUrls.sort(function (a, b) {
  //       if (a.updatedAt > b.updatedAt) {
  //         return 1;
  //       }
  //       return -1
  //     })
  //   }

  //   else {
  //     this.uploadVideoObject.allUrls.sort(function (a, b) {
  //       if (a.size > b.size) {
  //         return -1;
  //       }
  //       return 1
  //     })
  //   }
  // }

  openInteractiveVideo() {
    if (this.allVideos.length < 1) {
      this.toastr.warning("No videos found, Please upload a video/URL!")
    } 
    else { 
      // $('#upload-vid-Modal').modal({ backdrop: 'static', keyboard: false }, 'show');
      this.router.navigate(['/create-interactive-video'])
      window.localStorage.setItem('freeTemp','FreeTemplate')
      // this.router.navigate(['create-interactive-video'], { queryParams: { freeTemp: "FreeTemplate" } });

    }
  }
}
