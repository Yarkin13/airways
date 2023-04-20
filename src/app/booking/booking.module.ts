import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FlightTypeComponent } from './pages/main/flight-type/flight-type.component';
import { DirectionInputComponent } from './pages/main/direction-input/direction-input.component';
import { ReversesButtonComponent } from './pages/main/reverses-button/reverses-button.component';
import { DatesComponent } from './pages/main/dates/dates.component';
import { PassengersComponent } from './pages/main/passengers/passengers.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    BookingComponent,
    MainComponent,
    FlightSelectionComponent,
    SummaryComponent,
    FlightTypeComponent,
    DirectionInputComponent,
    ReversesButtonComponent,
    DatesComponent,
    PassengersComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class BookingModule {}
