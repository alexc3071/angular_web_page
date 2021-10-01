import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ItemdetailsService } from '../itemdetails.service';
import { faTwitter, faImdb, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-castsection',
  templateUrl: './castsection.component.html',
  styleUrls: ['./castsection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .my-custom-class .tooltip-inner {
      background-color: white;
      color: black;
      border: solid 1px black;
    }
    .my-custom-class .arrow::before {
      border-top-color: white;
      background-color: white;
    }
    `]
})
export class CastsectionComponent implements OnInit {

  //Card variables
  @Input() cast_data:any = {};
  public cast_list:any = null;

  //Modal variables
  public closeResult = '';
  public p_profile_path:any = null;
  public p_data:any = null;

  //Brand Icon variables
  faTwitter = faTwitter;
  faImdb = faImdb;
  faInstagram = faInstagram;

  //Breakpoint variables
  small_screen:any = false;

  constructor(private modalService: NgbModal, private ItemdetailsService: ItemdetailsService,  public breakpointObserver: BreakpointObserver) { }

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
    this.cast_list = this.cast_data.data;
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showModal(id:any, profile_path:any, content:any){
    this.ItemdetailsService.getPersonData(String(id)).subscribe((data: any) =>{
      this.p_data = data;
      this.p_profile_path = profile_path;
      this.open(content);
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
