import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { MainComponent } from './pages/main/main.component';
import { FlightSelectionComponent } from './pages/flight-selection/flight-selection.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FlightTypeComponent } from './pages/main/flight-type/flight-type.component';
import { DirectionInputComponent } from './pages/main/direction-input/direction-input.component';
import { ReversesButtonComponent } from './pages/main/reverses-button/reverses-button.component';
import { DatesComponent } from './pages/main/dates/dates.component';
import { PassengersComponent } from './pages/main/passengers/passengers.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PassengerInfoComponent } from './pages/booking/passenger-info/passenger-info.component';
import { ContactDetailsComponent } from './pages/booking/contact-details/contact-details.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { FlightComponent } from './pages/flight-selection/flight/flight.component';
import { DatesSliderComponent } from './pages/flight-selection/dates-slider/dates-slider.component';
import { DatesSliderTabComponent } from './pages/flight-selection/dates-slider-tab/dates-slider-tab.component';
import { DatesSliderContentComponent } from './pages/flight-selection/dates-slider-content/dates-slider-content.component';

@NgModule({
  declarations: [
    BookingComponent,
    MainComponent,
    FlightSelectionComponent,
    FlightTypeComponent,
    DirectionInputComponent,
    ReversesButtonComponent,
    DatesComponent,
    PassengersComponent,
    PassengerInfoComponent,
    ContactDetailsComponent,
    LoaderComponent,
    FlightComponent,
    DatesSliderComponent,
    DatesSliderTabComponent,
    DatesSliderContentComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, MaterialModule],
})
export class BookingModule {}
