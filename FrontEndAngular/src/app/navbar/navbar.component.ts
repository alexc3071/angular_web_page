import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  // Filler data
  constructor(private SearchService: SearchService, private router: Router) { }

  ngOnInit(): void {
  }

  public model:any;
    
  page_jump(event:any, input:any): void {
    const new_url = "/watch/" + event.item.media_type + '/' + event.item.id;
    this.router.navigateByUrl(new_url);
    event.preventDefault();
    input.value = '';
    this.isMenuCollapsed = true;
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchText) => this.SearchService.getData(searchText))
    );
  }

  formatter = (x: { name: string }) => x.name;
}
