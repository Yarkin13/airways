import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FareComponent } from './fare/fare.component';
import { OrderComponent } from './order/order.component';
import { bookedFlights, bookedPassengers } from './summary.mock';
import { BookedFlight, Passengers } from './booked-flights.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MaterialModule, FareComponent, OrderComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  public flights: Array<BookedFlight> = bookedFlights;

  public passengers: Array<Passengers> = bookedPassengers;
}
