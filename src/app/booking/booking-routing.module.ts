import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component';
import { MainComponent } from './pages/main/main.component';
import { SummaryComponent } from './pages/summary/summary.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'flights', component: FlightSelectionComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
