import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import {
  changeStatus,
  deleteFlight,
  searchFlights,
  setPassengersInfo,
} from 'src/app/redux/actions/flight.action';
import {
  selectFlightData,
  selectFlightNotReady,
  selectFlights,
  selectStatus,
} from 'src/app/redux/selectors/flight.selectors';
import { IBookingFlight, ISetFlightProps } from 'src/app/shared/models/flight-data.model';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent {
  flights$ = this.store.select(selectFlights);
  selectReady$ = this.store.select(selectFlightNotReady);
  selectStatus$ = this.store.select(selectStatus);

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {
    route.queryParams.subscribe((queryParams) => {
      this.store
        .select(selectFlightData)
        .pipe(take(1))
        .subscribe((storeParams) => {
          this.flights$.pipe(take(1)).subscribe((flights) => {
            if (Object.keys(queryParams).length === 0 && flights.length > 0) return;
            if (
              Object.keys(queryParams).length !== 0
              && (queryParams['fromKey'] !== storeParams.fromKey
                || queryParams['toKey'] !== storeParams.toKey
                || queryParams['forwardDate'] !== storeParams.dateTo
                || queryParams['backDate'] !== storeParams.dateBack)
            ) {
              const flightInfo: ISetFlightProps = {
                from: queryParams['fromValue'],
                to: queryParams['toValue'],
                fromKey: queryParams['fromKey'],
                toKey: queryParams['toKey'],
                dateTo: queryParams['forwardDate'],
                dateBack: queryParams['backDate'],
                adult: queryParams['adult'],
                child: queryParams['child'],
                infant: queryParams['infant'],
                type: queryParams['backDate'] ? 'roundTrip' : 'oneWay',
              };
              this.store.dispatch(searchFlights({ flightInfo }));
            } else if (
              Object.keys(queryParams).length !== 0
              && (queryParams['adult'] !== storeParams.adult
                || queryParams['child'] !== storeParams.child
                || queryParams['infant'] !== storeParams.infant)
            ) {
              const passengers = {
                adult: +queryParams['adult'],
                child: +queryParams['child'],
                infant: +queryParams['infant'],
              };
              this.store.dispatch(setPassengersInfo({ passengers }));
            } else if (flights.length === 0) {
              this.store.dispatch(changeStatus({ status: 'notSelect' }));
            }
          });
        });
    });
  }

  continueClick() {
    this.store.select(selectFlightData).forEach((data) => {
      if (data.flightTo) {
        const flightData: IBookingFlight = {
          flightTo: data.flightTo,
          flightBack: data.flightBack,
          adult: data.adult,
          child: data.child,
          infant: data.infant,
        };
        this.store.dispatch(BookingActions.setFlight({ flightData }));
      }
    });
    this.router.navigate(['/booking/booking']);
  }

  backClick() {
    this.store.dispatch(deleteFlight());
    this.router.navigate(['/booking']);
  }
}
