import { Component, OnInit, Input } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-reviewsection',
  templateUrl: './reviewsection.component.html',
  styleUrls: ['./reviewsection.component.scss']
})
export class ReviewsectionComponent implements OnInit {

    //Review variables
    @Input() review_data:any = {};
  public small_screen:any = null;

  constructor(public breakpointObserver: BreakpointObserver) { }

  
  break_points_check(): void{
    this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .subscribe(result => {
      if (result.matches) {
        this.small_screen = false;
      } else {
        this.small_screen = true;
      }
    });
  }

  ngOnInit(): void {
    this.break_points_check();
  }

}
