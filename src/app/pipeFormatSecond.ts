import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
  })
  export class MinuteSecondsPipe implements PipeTransform {
  
      transform(value: number): string {
        value = Number(value);
        var h = Math.floor(value / 3600);
        var m = Math.floor(value % 3600 / 60);
        var s = Math.floor(value % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " H : " : " H, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " M :" : " M, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " S :" : " S") : "";
        return hDisplay + mDisplay + sDisplay; 
      }
  
  }