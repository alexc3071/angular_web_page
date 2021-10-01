import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemdetailsService {

  //endpoint_root = "http://localhost:3000/";
  endpoint_root = "https://homework8backend-310103.wl.r.appspot.com/"
  
  constructor(private http: HttpClient) { }

  getItemData(media_type: string, m_id:string) {
    let endpoint_url = this.endpoint_root + "watch/"  + media_type + '/' + m_id;
    return this.http.get(endpoint_url);
  }

  getReviewData(media_type: string, m_id:string) {
    let endpoint_url = this.endpoint_root + "reviews/"  + media_type + '/' + m_id;
    return this.http.get(endpoint_url);
  }

  getCastData(media_type: string, m_id:string) {
    let endpoint_url = this.endpoint_root +"cast/"  + media_type + '/' + m_id;
    return this.http.get(endpoint_url);
  }

  getPersonData(p_id:string) {
    let endpoint_url = this.endpoint_root +"person/" +  p_id;
    return this.http.get(endpoint_url);
  }

}
