import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public is_continue:any = null;

  ngOnInit(): void {
    const val = window.localStorage.getItem("continue");
    if(val){
      let s_contents = JSON.parse(String(val))
      if(s_contents.data.length > 0){
        this.is_continue = true;
      }
    }
  }

}
