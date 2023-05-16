import { Component, Input, OnInit } from '@angular/core';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';
import { IFlightResponse } from 'src/app/shared/models/flight-response.model';

@Component({
  selector: 'flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent implements OnInit {
  @Input() flight!: IFlightResponse;
  @Input() back!: boolean;
  datesArray!: IFlightInfo[];

  ngOnInit() {
    const flightDate = new Date(this.flight.takeoffDate.slice(0, 10));
    this.datesArray = Array.from({ length: 11 }, (_, k) => {
      const date = new Date(
        new Date(flightDate).setDate(flightDate.getDate() - 5 + k)
      );
      const obj = Object.values(this.flight.otherFlights)
        .find((item) => item.takeoffDate.includes(date.toISOString().slice(0, 10)));
      if (obj) return obj;

      if (this.flight.takeoffDate.includes(date.toISOString().slice(0, 10))) {
        const { otherFlights, ...rest } = this.flight;
        return rest;
      }
      return { takeoffDate: date.toISOString(), price: null };
    });
  }
}
