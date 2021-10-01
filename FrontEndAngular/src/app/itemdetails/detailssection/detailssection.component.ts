import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { faTwitter, faFacebookSquare} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-detailssection',
  templateUrl: './detailssection.component.html',
  styleUrls: ['./detailssection.component.scss']
})
export class DetailssectionComponent implements OnInit {

  @Input() item_data:any = {};
  public title:any=null;
  public tagline:any=null;
  public numbers_line:any=null;
  public genres:any=null;
  public spoken_languages:any=null;
  public video_key:any=null;
  public video_name:any=null;
  public overview:any=null;

  // Watchlist toggle variables
  public button_text:any = null;
  public s_contents:any = null;
  public s_key: any = null;

  // Alert variables
  successMessage = '';
  warningMessage = '';

  // Icon and share variables
  public faTwitter = faTwitter;
  public encoded_title:any = null;
  public twitter_content:any = null;

  public faFacebook = faFacebookSquare;
  public facebook_content:any = null;


  constructor() { }

  private _success = new Subject<string>();
  private _warning = new Subject<string>();

  

  @ViewChild('selfClosingAlert1', {static: false}) selfClosingAlert1!: NgbAlert;
  @ViewChild('selfClosingAlert2', {static: false}) selfClosingAlert2!: NgbAlert;


  public showAddMessage() {
    if (this.selfClosingAlert2) {
      this.selfClosingAlert2.close();
    } 
    this._success.next("Added to watchlist."); 
  }
  public showRemoveMessage() { 
    if (this.selfClosingAlert1) {
      this.selfClosingAlert1.close();
    } 
    this._warning.next("Removed from watchlist."); 
  }

  create_twitter_content(): void{
    let my_str = 'https://twitter.com/intent/tweet?text=Watch%20' + encodeURIComponent(this.title) + " %0D%0A";
    my_str += "&url=https://www.youtube.com/watch?v=" + this.video_key + " %0D%0A";
    my_str += "&hashtags=" +  encodeURIComponent("USC,CSCI571,FightOn");

    this.twitter_content = my_str;
  }

  create_facebook_content(): void{
    let my_str = "https://www.facebook.com/sharer/sharer.php?u=";
    my_str += encodeURIComponent("https://www.youtube.com/watch?v=" + this.video_key);
    this.facebook_content = my_str;
  }

  fill_fields(): void{
    if (this.item_data.title !== undefined){
      this.title = String(this.item_data.title);
    }
    if (this.item_data.tagline !== undefined){
      this.tagline = String(this.item_data.tagline);
    }
    if (this.item_data.genres !== undefined){
      this.genres = String(this.item_data.genres);
    }
    if (this.item_data.spoken_languages !== undefined){
      this.spoken_languages = String(this.item_data.spoken_languages);
    }
    if (this.item_data.video_name !== undefined){
      this.video_name = String(this.item_data.video_name);
    }
    if (this.item_data.video_key !== undefined){
      this.video_key = String(this.item_data.video_key);
    }
    if (this.item_data.overview !== undefined){
      this.overview = String(this.item_data.overview);
    }
    let numbers_content:any[] = [];
    if (this.item_data.year !== undefined){
      numbers_content.push(this.item_data.year + "&nbsp;");
    }
    if (this.item_data.vote_average !== undefined){
      numbers_content.push("&nbsp; &#9733; " + this.item_data.vote_average);
    }
    if (this.item_data.runtime !== undefined){
      numbers_content.push(this.item_data.runtime);
    }
    if(numbers_content.length > 0){
      this.numbers_line = numbers_content.join(' | ');
    }
    this.create_twitter_content();
    this.create_facebook_content();
  }

  get_storagecontents(): void{
    this.s_key = this.item_data.media_type + "/" + this.item_data.id;
    const contents = window.localStorage.getItem('watchlist');
    if(contents !== null && contents !== undefined){
      this.s_contents = JSON.parse(contents);
      if(this.s_contents.data.includes(this.s_key)){
        this.button_text = "Remove from Watchlist";
      }
      else{
        this.button_text = "Add to Watchlist";
      }
    }
    else{
      this.s_contents = {'data': [], 'post_paths': [], 'names': []};
      this.button_text = "Add to Watchlist";
    }
  }

  update_continue(): void{
    this.s_key = this.item_data.media_type + "/" + this.item_data.id;
    const contents = window.localStorage.getItem('continue');
    if(contents !== null && contents !== undefined){
      let p_contents = JSON.parse(contents);
      if(p_contents.data.includes(this.s_key)){
        const w_index = p_contents.data.indexOf(this.s_key);
        p_contents.data.splice(w_index, 1);
        p_contents.post_paths.splice(w_index, 1);
        p_contents.names.splice(w_index, 1);
      }
      else{
        if(p_contents.data.length >= 24){
          p_contents.data.pop();
          p_contents.post_paths.pop();
          p_contents.names.pop();
        }  
      }
      p_contents.data.unshift(this.s_key);    
      p_contents.post_paths.unshift(this.item_data.poster_path);   
      p_contents.names.unshift(this.item_data.title);   
      window.localStorage.setItem('continue', JSON.stringify(p_contents));
    }
    else{
      let p_contents = {'data': [this.s_key], 'post_paths': [this.item_data.poster_path], 'names': [this.item_data.title]};
      window.localStorage.setItem('continue', JSON.stringify(p_contents));
    }
  }

  toggle_watchlist(): void{
    if(this.button_text === "Add to Watchlist"){
      this.button_text = "Remove from Watchlist";
      this.s_contents.data.unshift(this.s_key);    
      this.s_contents.post_paths.unshift(this.item_data.poster_path);   
      this.s_contents.names.unshift(this.item_data.title);     
      this.showAddMessage();
    }
    else{
      this.button_text = "Add to Watchlist";
      const w_index = this.s_contents.data.indexOf(this.s_key);
      this.s_contents.data.splice(w_index, 1);
      this.s_contents.post_paths.splice(w_index, 1);
      this.s_contents.names.splice(w_index, 1);
      this.showRemoveMessage();
    }
    // Update contents of local storage
    window.localStorage.setItem('watchlist', JSON.stringify(this.s_contents));

  }

  ngOnInit(): void {
    this.get_storagecontents();
    this.update_continue();
    this.fill_fields();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag)

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert1) {
        this.selfClosingAlert1.close();
      }
    });

    this._warning.subscribe(message => this.warningMessage = message);
    this._warning.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert2) {
        this.selfClosingAlert2.close();
      }
    });

  }

}
