import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFlightBack,
  selectFlightData,
  selectFlightTo,
} from 'src/app/redux/selectors/flight.selectors';
import { IEmptyFlight, IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent implements OnInit {
  @Input() flight!: Array<IFlightInfo | IEmptyFlight>;
  @Input() back!: boolean;

  selectFlight$!: Observable<IFlightInfo | null>;
  flightInfo$ = this.store.select(selectFlightData);

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.back) this.selectFlight$ = this.store.select(selectFlightBack);
    else this.selectFlight$ = this.store.select(selectFlightTo);
  }
}
