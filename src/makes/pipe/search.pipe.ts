import { Pipe,PipeTransform} from '@angular/core';
import { Make } from '../data/make.model'

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
  transform(items: Make[], criteria: any): any {
    console.log("search filter")
    console.log(items);
    if(items === undefined){
      return false;
    }
    return items.filter(item =>{
       for (let key in item) {
         if((""+item[key]).includes(criteria)) {
            return true;
         }
       }
       return false;
    });
  }
}
