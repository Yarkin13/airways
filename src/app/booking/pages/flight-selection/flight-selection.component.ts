import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/http.service';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import { deleteFlight, setFlightInfo } from 'src/app/redux/actions/flight.action';
import { selectFlightData, selectFlightNotReady } from 'src/app/redux/selectors/flight.selectors';
import { IBookingFlight, ISetFlightProps } from 'src/app/shared/models/flight-data.model';
import { IFlightRequest } from 'src/app/shared/models/flight-request.model';
import { IFlightResponse } from 'src/app/shared/models/flight-response.model';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent {
  status = 'loading';
  flights!: IFlightResponse[];
  selectReady$ = this.store.select(selectFlightNotReady);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private store: Store
  ) {
    route.queryParams.subscribe(
      ({ fromKey, toKey, fromValue, toValue, forwardDate, backDate, adult, child, infant }) => {
        const flightInfo: ISetFlightProps = {
          from: fromValue,
          to: toValue,
          dateBack: backDate,
          dateTo: forwardDate,
          passengers: [
            { type: 'Adult', count: adult },
            { type: 'Child', count: child },
            { type: 'Infant', count: infant },
          ],
          type: backDate ? 'roundTrip' : 'oneWay',
        };
        this.store.dispatch(setFlightInfo({ flightInfo }));

        this.httpService
          .postFlight({ fromKey, toKey, forwardDate, backDate } as IFlightRequest)
          .subscribe({
            next: (data) => {
              this.flights = data;
              this.status = 'success';
            },
            error: () => {
              this.status = 'error';
            },
          });
      }
    );
  }

  continueClick() {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectFlightData).subscribe((data) => {
      if (data.flightTo) {
        const flightData: IBookingFlight = {
          flightTo: data.flightTo,
          flightBack: data.flightBack,
          passengers: data.passengers,
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
