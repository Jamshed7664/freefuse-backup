import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'size'
  })
  export class SizePipe implements PipeTransform {
  
      transform(value: any): any {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            let l = 0, n = parseInt(value, 10) || 0;
            while(n >= 1024 && ++l){
                n = n/1024;
            }
            //include a decimal point and a tenths-place digit if presenting 
            //less than ten of KB or greater units
            return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
            
      }
  
  }