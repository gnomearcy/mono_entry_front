import { Pipe,PipeTransform} from '@angular/core';
import { Make } from '../shared/make.model'

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
  transform(items: Make[], criteria: any): any {
    if(items === undefined){
      return false;
    }
    return items.filter(item => {

       for (let key in item) {
         // Don't search id
         if(key === "id"){
           continue;
         }
         if(("" + item[key]).includes(criteria)) {
            return true;
         }
       }
       return false;
    });
  }
}
