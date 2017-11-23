import {Pipe, PipeTransform} from '@angular/core';

// Sorting pipe for MakesComponent
// Credits go to the following source:
// https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy#readme
@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {

  static _orderByComparator(a:any, b:any):number{
    if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
      //Isn't a number so lowercase the string to properly compare
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a) < parseFloat(b)) return -1;
      if(parseFloat(a) > parseFloat(b)) return 1;
    }

    return 0;
  }

  transform(input:any, sortString: string): any {

    if(!Array.isArray(input)) {
      return input;
    }
     let desc = sortString.substr(0, 1) == '-';
     var property:string = sortString.substr(0, 1) == '+' || sortString.substr(0, 1) == '-'
       ? sortString.substr(1)
       : sortString;

     return input.sort(function(a:any,b:any) {
        if(a[property] === undefined || b[property] === undefined){
          console.error(`Wrong property "${property}". You probably have a typo
          in sorting string that was passed to this Pipe. Common typo is
          misstyping the name of the property from the model class.`)
          return 0;
        }
        return !desc ? OrderBy._orderByComparator(a[property], b[property])
             : -OrderBy._orderByComparator(a[property], b[property]);
     });
  }
}
