import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sideMenu',
  templateUrl: './sideMenu.component.html',
  styleUrls: ['./sideMenu.component.css']
})
export class SideMenuComponent implements OnInit {
  color:any;
  constructor() {
}
data:any;
  ngOnInit() {
   let color=window.localStorage.getItem('color');
   if(color){
     this.color=color;     
   }else{
     this.color='white'
   }
   this.getProfilePic()
}
changeColorTrending(){
  window.localStorage.setItem('color','black')
}
changeColorHome(){
  window.localStorage.setItem('color','white')

}
changeColorExplore(){
  window.localStorage.setItem('color','white')
}
profilePic:any;
getProfilePic(){
  this.profilePic=window.localStorage.getItem('profilePic')
}
}
