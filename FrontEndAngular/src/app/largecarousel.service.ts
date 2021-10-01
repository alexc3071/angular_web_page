import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LargecarouselService {

  //endpoint_url = "http://localhost:3000/playingmovies";
  endpoint_url = "https://homework8backend-310103.wl.r.appspot.com/playingmovies"
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.endpoint_url);
  }

}
