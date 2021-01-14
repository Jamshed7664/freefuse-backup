import { Component, OnInit, ViewChild } from '@angular/core';
declare var videojs;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public player:any;
  constructor() { }
  url:any="../../../assets/video/demo test.mp4"

  ngOnInit(): void {


   
  }
}