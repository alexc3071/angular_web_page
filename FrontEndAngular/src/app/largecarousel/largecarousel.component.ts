import { Component, ViewChild, OnInit} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { LargecarouselService } from '../largecarousel.service'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-largecarousel',
  templateUrl: './largecarousel.component.html',
  styleUrls: ['./largecarousel.component.scss']
})
export class LargecarouselComponent implements OnInit{
    
  //Movie data varaibles
  images: string[] = [];
  h_links: string[] = [];
  titles: string[]= [];

  //Carousel variables
  paused = false;

  //Breakpoint variables
  small_screen:any = false;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  constructor(private largecarouselService: LargecarouselService, public breakpointObserver: BreakpointObserver) { }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

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


  onSlide(slideEvent: NgbSlideEvent) {
    //Pause on arrows
    if (slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    //Pause on the slide
    if (!slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  showCarousel() {
    this.largecarouselService.getData().subscribe((data: any) => {
      for (var i = 0; i < data.data.length; i++){
        this.images.push(data.data[i].backdrop_path);
        this.titles.push(data.data[i].title);
        this.h_links.push('/watch/' + data.data[i].media_type + "/" + data.data[i].id);
      }


      })

  }

  ngOnInit(){
    this.break_points_check();
    this.showCarousel();
  }

 

}
