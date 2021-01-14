import { Directive, ElementRef, Input, OnChanges, ɵɵNgOnChangesFeature, Renderer2 } from '@angular/core';
declare var $;


@Directive({
  selector: '[thumnailsDirective]'
})
export class thumnailsDirective {
  
 
  constructor(el: ElementRef, renderer: Renderer2) {

    setTimeout(()=>{ 
      let imgsrc =  el.nativeElement.getAttribute('src');
     if(!imgsrc.match(/.(jpg|jpeg|png|gif)$/i))
     {
        el.nativeElement.setAttribute('src','assets/images/noimage.jpg');
    }
   })
   
 }
}