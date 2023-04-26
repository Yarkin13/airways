import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/booked-flights.model';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { selectHeaderCurrency } from './header-data.selectors';

const selectBookingData = createFeatureSelector<Flight>('bookingData');

export const selectBookingFlights = createSelector(
  selectBookingData,
  (state: Flight) => state.flights
);

export const selectBookingPassengers = createSelector(
  selectBookingData,
  selectHeaderCurrency,
  (flight, currency) => flight.passengers.map((passenger) => ({
    ...passenger,
    fare: (+passenger.fare * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString(),
    charge: (+passenger.charge * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString(),
  }))
);
