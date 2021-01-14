import { Directive, ElementRef, Input, OnChanges, ɵɵNgOnChangesFeature, Renderer2 } from '@angular/core';
declare var $;


@Directive({
  selector: '[imgName]'
})
export class imgName {
  
 
  constructor(el: ElementRef, renderer: Renderer2) {

    setTimeout(()=>{ 
      let fName =  el.nativeElement.getAttribute('title');
      fName = fName.split(',');
      let lName = fName[1];
      fName = fName[0];
      el.nativeElement.innerHTML = fName.charAt(0)+lName.charAt(0)
   })
   
 }
}