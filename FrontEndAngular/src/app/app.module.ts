import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LargecarouselComponent } from './largecarousel/largecarousel.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { DetailssectionComponent } from './itemdetails/detailssection/detailssection.component';
import { ReviewsectionComponent } from './itemdetails/reviewsection/reviewsection.component';
import { CastsectionComponent } from './itemdetails/castsection/castsection.component';
import { CardcarouselComponent } from './home/cardcarousel/cardcarousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchlistComponent,
    NavbarComponent,
    LargecarouselComponent,
    ItemdetailsComponent,
    DetailssectionComponent,
    ReviewsectionComponent,
    CastsectionComponent,
    CardcarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    YouTubePlayerModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
