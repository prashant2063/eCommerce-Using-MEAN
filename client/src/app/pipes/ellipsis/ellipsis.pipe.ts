import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    let len = args[0];
    if(value.length<=len)
      return value;
    else 
      return value.slice(0,len-3)+"...";
  }

}
