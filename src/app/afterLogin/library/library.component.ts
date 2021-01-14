import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import * as _ from 'lodash';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
declare var $: any;
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  animations: [ fadeInOutAnimation ]
})

export class LibraryComponent implements OnInit {

  public userID: any;
  public userData: any = {};
  public totalVideos: Array<any> = [];
  public allVideos: Array<any> = [];
  public currentVideoObj: any = {};
  public showVideo: boolean = false;
  public spinner:any =  false;
  constructor(public apiService: CrudService) { }

  ngOnInit() {
    this.spinner  = true;
    this.getAllVideos();
  } 

  // Get all videos
  getAllVideos() {
    this.apiService.getUploadedVideo().subscribe(
      success => {
        this.allVideos = success.data;
        this.allVideos = this.allVideos.reverse();
        //this.allVideos = this.splitList(this.totalVideos, 4);
        this.spinner  = false;
      }
    );
  }

  // Split list into a group of n
  splitList(source: Array<any>, chunkSize: any): Array<any>{
    let chunks = _.chunk(source, chunkSize);    
    return chunks;
  }

  showModal(id: any) {
    for (let i of this.allVideos) {
      if (id == i._id) {
        this.currentVideoObj = i;
        break;

      }
    }
    
    $('#preview-Modal').modal('show');
    this.showVideo = true;
    //show video true
  }
  deleteVideo(v:any)
  {
    this.spinner  = true;
   // let Obj:any = {name: i.originalName}
    this.apiService.deletePresignedURL({name:v.name}).subscribe(
      success => {
        this.getAllVideos();
      })
   

  }

  sortVideos(event: any) {
     let property: any = event.target.value;
    if (property === 'recentFirst') {
      this.allVideos.sort(function (a, b) {
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return -1
      });
    } else if (property === 'size') {
      this.allVideos.sort(function (a, b) {
        if (a.size > b.size) {
          return 1;
        }
        return -1;
      });
    } else if (property === 'duration') {
      this.allVideos.sort(function (a, b) {
        if (a.duration > b.duration) {
          return 1;
        }
        return -1;
      });

    } else if (property === 'name') {
      this.allVideos.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        return -1;
      });
    }
  }

 

}
