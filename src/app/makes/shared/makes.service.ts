import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { api_create, api_update, api_delete, api_make_page } from './api.routes'
import * as API from './api.routes'
import Make from './make.model'
import { IMakeService } from './i.makes.service'
import MakePageDto from './dto/make.page.dto'
import MakeFilterPayload from "./dto/make.filter.payload"

@Injectable()
export class MakeService implements IMakeService{

  constructor(private http: Http) { }

  getPage(pageNumber: number, pageSize: number): Promise<MakePageDto>{
    let headers = new Headers({
      'Content-Type': 'application/json'
    })

    let payload = {
        TargetPage: pageNumber,
        PageSize: pageSize,
        SortAsc: true,
        SortField: 1
    }

    return this.http
      .post(API.api_make_page, payload, { headers: headers })
      .toPromise()
      .then(response => response.json().data as MakePageDto)
      .catch(this.handleError);
  }

  // Simple demo delegation of filter request to API.
  // This implementation does not return paged results.
  // This implementation does not perform sorting.
  // Sorting and / or pagination has to be have to be implemented on API side.
  filter(payload: MakeFilterPayload): Promise<Make[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    })

    return this.http
      .post(API.api_filter, payload, { headers: headers })
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
        .put(API.api_create, JSON.stringify(make), { headers: headers})
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
       .put(API.api_update, JSON.stringify(make), { headers: headers})
       .toPromise()
       .then(() => make)
       .catch(this.handleError);
   }

   deleteMake(id: string): Promise<Make>{
     let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${API.api_delete}/${id}`;
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
