import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { BookingComponent } from './pages/booking/booking.component';

@NgModule({
  declarations: [
    BookingComponent,
    MainComponent,
    FlightSelectionComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
  ],
})
export class BookingModule { }
