import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { api_getall, api_create, api_update, api_delete } from './api.routes'
import { Make } from './make.model';
import { IMakeService } from './i.makes.service'


const data_key = "makes";

@Injectable()
export class LocalMakeService implements IMakeService{
  constructor(private http: Http) { }

  getAll(): Promise<Make[]> {
    console.log("LocalMakeService - get all")
    console.log("state of storage >")
    console.log(localStorage)

    return new Promise((resolve) => {
      let asJson = localStorage.getItem(data_key)
      if(asJson == null){
        console.log("no data in storage, returning...")
        resolve([])
        return;
      }
      console.log("data as JSON:")
      console.log(asJson)
      let asObj = JSON.parse(asJson);
      console.log("parsed data:")
      console.log(asObj);


      // const convertedMakes = [];
      // asObj.forEach((item) => {
      //   convertedMakes.push(new Make(item as Make));
      // });

      // console.log("data after conversion:")
      // console.log(convertedMakes)
      // resolve(convertedMakes);
      resolve(asObj)
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
     console.log("service delete")
     console.log("object to delete >")
     console.log(objToDelete)
     return new Promise((resolve, reject) => {
       let asJson = localStorage.getItem(data_key);
       console.log("json> ")
       console.log(asJson)
       if(asJson == null){
         reject("cannot delete something that doesn't exist")
         return;
       }
       let asObj = JSON.parse(asJson);
       console.log("parsed object")
       console.log(asObj)
       const ofFirstWithId = function(el: Make) {
         console.log("iterating for id > " + el.id)
         return el.id == objToDelete.id;
       }
       let targetIdx = asObj.findIndex(ofFirstWithId);

       if(targetIdx === -1){
         reject("no item found to delete")
         return;
       }
       console.log("deleting index -> " + targetIdx)
       asObj.splice(targetIdx, 1);
       let newJson = JSON.stringify(asObj);
       console.log(newJson)
       localStorage.setItem(data_key, newJson);
       resolve(objToDelete);
     });
   }

   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
