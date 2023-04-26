import { createReducer, on } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/booked-flights.model';
import { bookedFlights, bookedPassengers } from 'src/app/booking/pages/summary/summary.mock';
import { BookingActions } from '../actions/booking.actions';

export const initialState = {
  flights: bookedFlights,
  passengers: bookedPassengers,
};

export const bookingReducer = createReducer(
  initialState,
  on(
    BookingActions.setFlights,
    (state, { flights }): Flight => ({ ...state, flights }),
  ),
  on(
    BookingActions.setPassengers,
    (state, { passengers }): Flight => ({ ...state, passengers }),
  ),
);
