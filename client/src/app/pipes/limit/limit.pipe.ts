import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    value = parseInt(value as string);
    if(value>100){
      return "100+";
    }
    else if(value>10){
      return "10+";
    }
    else if(value==0){
      return null;
    }
    return value;
  }

}
