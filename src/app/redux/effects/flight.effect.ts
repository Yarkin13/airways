/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { IFlightRequest } from 'src/app/shared/models/flight-request.model';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { changeStatus, searchFlights, searchFlightsSuccess } from '../actions/flight.action';

@Injectable()
export class FlightEffects {
  loadFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchFlights),
      mergeMap(({ flightInfo }) => {
        const request: IFlightRequest = {
          fromKey: flightInfo.fromKey,
          toKey: flightInfo.toKey,
          forwardDate: flightInfo.dateTo,
          backDate: flightInfo.dateBack ? flightInfo.dateBack : undefined,
        };
        return this.httpService.postFlight(request).pipe(
          map((flights) => {
            const newFlights = flights.map((flight) => {
              const flightDate = new Date(flight.takeoffDate.slice(0, 10));
              const datesArray = Array.from({ length: 11 }, (_, k) => {
                const date = new Date(new Date(flightDate).setDate(flightDate.getDate() - 5 + k));
                const obj = Object.values(flight.otherFlights).find((item) => {
                  return item.takeoffDate.includes(date.toISOString().slice(0, 10));
                });
                if (obj) return obj;

                if (flight.takeoffDate.includes(date.toISOString().slice(0, 10))) {
                  const { otherFlights, ...rest } = flight;
                  return rest;
                }
                return { takeoffDate: date.toISOString(), price: null };
              });
              return datesArray;
            });

            const newState = {
              ...flightInfo,
              flights: newFlights,
              flightTo: null,
              flightBack: null,
              status: 'success',
            };
            return searchFlightsSuccess({ newState });
          }),
          catchError(() => of(changeStatus({ status: 'error' })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private httpService: HttpService, private store: Store) {}
}
