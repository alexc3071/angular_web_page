import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemdetailsService } from './itemdetails.service';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.scss']
})
export class ItemdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ItemdetailsService: ItemdetailsService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 

   }

  //Basic movie details
  public item_details:any = null;
  public cast_details:any = null;
  public review_details:any = null;
  public rec_suffix:any = null;
  public sim_suffix:any = null;
  public media_prefix:any = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('media')!== null && params.get('id') !== null){
        this.ItemdetailsService.getItemData(String(params.get('media')), String(params.get('id'))).subscribe((data: any) =>{
            this.item_details = data;
        });
        this.ItemdetailsService.getCastData(String(params.get('media')), String(params.get('id'))).subscribe((data: any) =>{
            this.cast_details = data;
        });
        this.ItemdetailsService.getReviewData(String(params.get('media')), String(params.get('id'))).subscribe((data: any) =>{
            this.review_details = data;
        });
        this.rec_suffix = "recommended/"  + String(params.get('media'))+ "/" + String(params.get('id'));
        
        this.sim_suffix = "similar/"  + String(params.get('media'))+ "/" + String(params.get('id'));
        if(params.get('media') === 'movie'){
          this.media_prefix = "Movies";
        }
        else{
          this.media_prefix = "TV Shows";
        }

      }
    });

  }

}
