import { Directive, ElementRef, Input, OnChanges, ɵɵNgOnChangesFeature, Renderer2 } from '@angular/core';
declare var videojs;
declare var $;
@Directive({
  selector: '[videojs]'
})
export class VideoJS {
  
 
  constructor(el: ElementRef, renderer: Renderer2) {
    // videojs((el.id), {html5: {
    // }});
    
   
  
    setTimeout(()=>{
      
    
        for (var key in videojs.players) {
          if(key == (el.nativeElement.getAttribute('id')))
          {
             videojs((el.nativeElement.getAttribute('id'))).dispose();
             break;
          }
         }
        var player = videojs((el.nativeElement.getAttribute('id')), {html5: { }},); 
       
      // When you pass text in options it just creates a control text,
      // which is displayed as tooltip when hovered on 
      // this button viz the span in you div,
    
      var backward = player.controlBar.addChild("button",{},1);
      var forward = player.controlBar.addChild("button",{},2);
      // var reset = player.controlBar.addChild("button");

      // There are many functions available for button component 
      // like below mentioned in this docs 
      // https://docs.videojs.com/button. 
      // You can set attributes and clasess as well.

      // Getting html DOM
        var forwardDom = forward.el();
        var backwardDom = backward.el();
        // Since now you have the html dom element 
        // you can add click events


        // Now I am setting the text as you needed.
        forwardDom.innerHTML = "<img src='../../../assets/images/videoplayer/step-forward.svg'/style='width:17px;filter: invert(100%);'>";
        forwardDom.setAttribute('title','Forward');
        backwardDom.innerHTML =  "<img src='../../../assets/images/videoplayer/step-backward.svg' style='width:17px;filter: invert(100%);'/>";
        backwardDom.setAttribute('title','Backward');
        
        forwardDom.onclick = function(){
          player.currentTime(player.currentTime() + 10);

      } 
      backwardDom.onclick = function(){
        player.currentTime(player.currentTime() - 10);
        ;
      } 

      
    
    
      

    
     })
   
 }
}