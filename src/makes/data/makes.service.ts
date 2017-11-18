import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Make } from './make.model';
import { getAll as get_all, create, delete, update } from './api.routes'

@Injectable()
export class MakeService{
  private makeUrl = 'api/makes'

  constructor(private http: Http) { }

  getAll(): Promise<Make[]> {
    console.log(get_all)
    return this.http
      .get(get_all)
      .toPromise()
      .then(response => response.json().data as Make[])
      .catch(this.handleError);
  }

   // Create new Make object on API
   createMake(make: Make): Promise<Make>{
     let headers = new Headers({
       'Content-Type': 'application/json'
     })

     return this.http
        .put(create, JSON.stringify(make), { headers: headers})
        .toPromise()
        .then(() => make)
        .catch(this.handleError);
   }

   // Update existing Make object on API
   updateMake(make: Make): Promise<Make>{
     let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
       .put(update, JSON.stringify(make), { headers: headers})
       .toPromise()
       .then(() => make)
       .catch(this.handleError);
   }

   deleteMake(id: string): Promise<Make>{
     let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${delete}/${id}`
    return this.http
      .delete(url, {headers: headers})
      .toPromise()
      .catch(this.handleError);
   }

   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
