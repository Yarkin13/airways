import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import canActivate from '../core/guards/auth.guard';
import { BookingComponent } from './pages/booking/booking.component';
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'flights', component: FlightSelectionComponent },
  { path: 'booking', component: BookingComponent, canActivate: [canActivate] },
  {
    path: 'summary',
    loadComponent: () => import('./pages/summary/summary.component').then((mod) => mod.SummaryComponent),
    canActivate: [canActivate],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
