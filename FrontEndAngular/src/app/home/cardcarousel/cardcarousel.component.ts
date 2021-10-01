import { Component, OnInit, Input } from '@angular/core';
import { ScarouselService } from './scarousel.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-cardcarousel',
  templateUrl: './cardcarousel.component.html',
  styleUrls: ['./cardcarousel.component.scss']
})
export class CardcarouselComponent implements OnInit {

  @Input() path_suffix: any = null;
  public item_data: any = null;
  public item_arr: any = null;
  public non_empty: any = null;
  public small_screen: any = false;

  //Variables specific for recommended and similar carousels
  public show_rec: any = null;
  public show_sim: any = null;
  public media_suffix: any = null;

  constructor(private ScarouselService: ScarouselService, public breakpointObserver: BreakpointObserver) { }


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

  check_rec_or_sim(): void{
    const split_suffix = this.path_suffix.split('/');
    if(split_suffix[0] === 'recommended' && this.non_empty){
      this.show_rec = true;
      if(split_suffix[1] === "movie"){
        this.media_suffix = 'Movies';
      }
      else{
        this.media_suffix = "TV Shows";
      }
    }
    if(split_suffix[0] === 'similar' && this.non_empty){
      this.show_sim = true;
      if(split_suffix[1] === "movie"){
        this.media_suffix = 'Movies';
      }
      else{
        this.media_suffix = "TV Shows";
      }
    }
  }

  ngOnInit(): void {

    this.break_points_check();

    if (this.path_suffix == 'current'){
      const val = window.localStorage.getItem("continue");
      let s_contents = null;
      if(val){
        s_contents = JSON.parse(String(val));
        if(s_contents.data.length > 0){
          this.item_data = [];
          for(let i = 0; i < s_contents.data.length; i++){
            const m_keys = s_contents.data[i].split('/');
            let m_item = {
              "media_type" : m_keys[0],
              "id": m_keys[1],
              "title" : s_contents.names[i],
              "poster_path" : s_contents.post_paths[i]
            };
            this.item_data.push(m_item);
          }
          this.item_arr = [];
          var i = 0;
          while (i < this.item_data.length) {
            this.item_arr.push(this.item_data.slice(i, i + 6));
            i += 6;
          }
        }
      }
      if(this.item_data.length > 0){
        this.non_empty = true;
      }
    }
    else{
      
      this.ScarouselService.getItemData(String(this.path_suffix)).subscribe((data: any) => {
        this.item_data = data.data;
        this.item_arr = [];
        var i = 0;
        while (i < this.item_data.length) {
          this.item_arr.push(this.item_data.slice(i, i + 6));
          i += 6;
        }
        if(this.item_data.length > 0){
          this.non_empty = true;
        }
        this.check_rec_or_sim();
      });
      
    }
  }

}
