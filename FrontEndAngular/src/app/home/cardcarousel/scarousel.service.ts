import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScarouselService {

  /**
   *  Available endpoints:
   *  popularmovies, topmovies, trendingmovies, populartv, toptv, trendingtv
   */
  //endpoint_root = "http://localhost:3000/";
  endpoint_root = "https://homework8backend-310103.wl.r.appspot.com/"
  
  constructor(private http: HttpClient) { }

  getItemData(endpoint_suffix: string) {
    let endpoint_url = this.endpoint_root + endpoint_suffix;
    return this.http.get(endpoint_url);
  }
}
