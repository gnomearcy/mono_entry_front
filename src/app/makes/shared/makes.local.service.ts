import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import Make from './make.model'
import MakePageDto from './dto/make.page.dto'
import { IMakeService } from './i.makes.service'

const data_key = "makes";

@Injectable()
export class LocalMakeService implements IMakeService{
  constructor(private http: Http) { }

  // Pagination
  getPage(pageNumber: number, pageSize: number): Promise<MakePageDto> {

    console.log("local service getpage > params:")
    console.log("page number - " + pageNumber + ", pageSize - " + pageSize)
    return new Promise((resolve) => {
      let asJson = localStorage.getItem(data_key)
      if(asJson == null){
        console.log("nothing in local storage")
        const result = new MakePageDto([], pageNumber, 0, pageSize);
        resolve(result)
        console.log("bad data in storage")
        console.log(result);
        return;
      }

      // Give us an object from JSON. If this yields an exception, reject part
      // of the Promise is automatially called.
      // TODO: test this claim
      var asObj = JSON.parse(asJson);
      var startIndex = (pageNumber - 1) * pageSize;
      const a = Math.ceil(asObj.length / pageSize);
      const b = asObj.length % pageSize == 0 ? 0 : 1;
      const pageCount = Math.ceil(asObj.length / pageSize);

      // TODO clear this
      console.log("asObj.length -> " + asObj.length)
      console.log("asObj.length / pageSize -> " + asObj.length/pageSize)
      console.log("asObj % pageSize -> " + asObj.length % pageSize);
      console.log("a -> " + a)
      console.log("b -> " + b)

      // Check if we will try to read non-existing objects
      if(startIndex > asObj.length){
        const result = new MakePageDto([], pageNumber, pageCount, pageSize);
        resolve(result)
        console.log("non existing!")
        console.log(result);
        return
      }

      console.log("Filtering data for page - " + pageNumber)
      var filtered = [];
      var endIndex = Math.min(asObj.length, pageNumber * pageSize);
      for(var i = startIndex; i < endIndex; i++){
        filtered.push(asObj[i]);
      }

      const result = new MakePageDto(filtered, pageNumber, pageCount, pageSize);
      console.log("data!!!")
      console.log(result);
      resolve(result)
    })
  }

   // Create new Make object on API
   createMake(make: Make): Promise<Make>{
     console.log("creating new object in service")
     return new Promise((resolve) => {
       let makesJson = localStorage.getItem(data_key);
       let makesObj = [];
       if(makesJson == null){
          makesObj = [];
       }
       else{
         // Convert JSON string to an object
         makesObj = JSON.parse(makesJson);
       }
       makesObj.push(make);
       let newMakesJson = JSON.stringify(makesObj);
       localStorage.setItem(data_key, newMakesJson)
       // Return the created object
       console.log("resolving")
       resolve(make);
     })
   }

   // Update existing Make object on API
   updateMake(make: Make): Promise<Make>{
     return new Promise((resolve, reject) => {
       let asJson = localStorage.getItem(data_key);
       let asObj;
       if(asJson == null){
         reject("cannot update something that doesn't exist")
         return;
       }
       else{
         asObj = JSON.parse(asJson);
       }

       let targetID = make.id;
       let target;
       asObj.forEach((item) => {
         if(target == undefined && item.id == targetID){
           target = item;
         }
       })

       let idx = asObj.indexOf(target);
       target.name = make.name;
       target.abbreviation = make.abbreviation
       asObj[idx] = target;
       let newJson = JSON.stringify(asObj);
       localStorage.setItem(data_key, newJson);
       resolve(target);
     })
   }

   deleteMake(objToDelete: Make): Promise<Make>{
     return new Promise((resolve, reject) => {
       let asJson = localStorage.getItem(data_key);
       if(asJson == null){
         reject("cannot delete something that doesn't exist")
         return;
       }
       let asObj = JSON.parse(asJson);
       const ofFirstWithId = function(el: Make) {
         return el.id == objToDelete.id;
       }
       let targetIdx = asObj.findIndex(ofFirstWithId);

       if(targetIdx === -1){
         reject("no item found to delete")
         return;
       }
       asObj.splice(targetIdx, 1);
       let newJson = JSON.stringify(asObj);
       localStorage.setItem(data_key, newJson);
       resolve(objToDelete);
     });
   }

   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
