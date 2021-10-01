import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';

const routes: Routes = [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'mylist', component: WatchlistComponent},
      {path: 'watch/:media/:id', component: ItemdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
