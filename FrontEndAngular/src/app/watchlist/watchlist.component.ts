import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  public s_contents: any = null;
  public item_data: any = null;
  public item_arr: any = null;
  public small_screen: any = false;

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


  checkSContents(): boolean {
    return (this.s_contents && this.s_contents.data.length > 0);
  }

  ngOnInit(): void {
    this.break_points_check();
    const val = window.localStorage.getItem("watchlist");
    if (val) {
      this.s_contents = JSON.parse(String(val))
      if (this.checkSContents()) {
        this.item_data = [];
        for (let i = 0; i < this.s_contents.data.length; i++) {
          const m_keys = this.s_contents.data[i].split('/');
          let m_item = {
            "media_type": m_keys[0],
            "id": m_keys[1],
            "title": this.s_contents.names[i],
            "poster_path": this.s_contents.post_paths[i]
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
  }
}
