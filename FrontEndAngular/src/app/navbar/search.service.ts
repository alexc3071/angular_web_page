import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //endpoint_root = "http://localhost:3000/";
  endpoint_root = "https://homework8backend-310103.wl.r.appspot.com/"
  
  constructor(private http: HttpClient) { }

  getData(query: string) {
    if(query.length > 0){
      const c_query = encodeURIComponent(query);
      let endpoint_url = this.endpoint_root + "multisearch/"  + c_query;
      return this.http.get<[any, string[]]>(endpoint_url);
    }
    else{
      return [];
    }
  }

}
