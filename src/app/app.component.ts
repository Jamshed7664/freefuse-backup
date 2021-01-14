import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';
import { NavigationEnd, Router,Event } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent  implements OnInit
{
  url:any
  subscription
  constructor(router: Router) {
    // this is for change icon color according to routing
    this.subscription = router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){
        console.log('First url',event.url);
          if(event.url=='/explore'){
            window.localStorage.setItem('color','white');
          }else if(event.url=='/landing-page'){
            window.localStorage.setItem('color','white');
          }else if(event.url=='/'){
          window.localStorage.setItem('color','white');
        }else{
            window.localStorage.setItem('color','black');
          }
      }
    });
    // within our constructor we can define our subscription
    // and then decide what to do when this event is triggered.
    // in this case I simply update my route string.
    router.events.subscribe(val => {
      $('.modal').modal('hide');
      window.scrollTo(0, 0);
      
    });
    
  }

  ngOnInit(): void {
   let color= window.localStorage.getItem('color')
   if(!color){
    //  alert()
    window.localStorage.setItem('color','white');
   }
  }

 }
